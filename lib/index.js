"use strict";

const mongoose = require("mongoose")
    , iterateObject = require("iterate-object")
    , setOrGet = require("set-or-get")
    , oneByOne = require("one-by-one")
    , requireDir = require("require-dir")
    , ul = require("ul")
    , path = require("path")
    ;

mongoose.Promise = global.Promise;

const BloggifyMongoose = exports;

/**
 * @name bloggify:init
 * @param {Object} config
 *
 *  - `db` (String): The database url.
 *  - `models` (Object): An object containing the Mongoose models.
 *  - `models_dir` (String): The relative path to a directory containing models stored in files.
 */
BloggifyMongoose.init = (config, bloggify, ready) => {
    BloggifyMongoose.db = config.db;

    let models = BloggifyMongoose.models = bloggify.models;

    if (config.db) {
        mongoose.connect(config.db, ready);
        mongoose.connection.on("error", err => bloggify.log(err));
    } else {
        return ready(new Error("Please provide a MongoDB URI in the `db` field of the config."));
    }

    if (config.models_dir) {
        config.models_dir = path.join(bloggify.paths.root, config.models_dir);
        config.models = ul.merge(config.models, requireDir(config.models_dir));
    }

    iterateObject(config.models, (c, n) => {
        const schema = mongoose.Schema(c);
        const events = ["init", "validate", "save", "remove"];
        const hooks = {
            pre: {},
            post: {}
        };

        events.forEach(cEv => {
            hooks.pre[cEv] = [];
            hooks.post[cEv] = [];
            schema.pre(cEv, function (next) {
                oneByOne.call(this, hooks.pre[cEv], err => {
                    next(err);
                });
            });
            schema.post(cEv, doc => {
                oneByOne.call(doc, hooks.post[cEv]);
            });
        });

        const cModel = models[n] = mongoose.model(n, schema);
        cModel.__bloggifyHooks = hooks;

        cModel.addHook = (type, event, fn) => {
            const typeHooks = hooks[type];
            if (!typeHooks) {
                throw new Error(`Invalid type hook type: '${type}'`);
            }
            const arr = typeHooks[event];
            arr.push(fn);
        };
    });
};
