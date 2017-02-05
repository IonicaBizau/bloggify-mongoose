"use strict";

const mongoose = require("mongoose")
    , iterateObject = require("iterate-object")
    , setOrGet = require("set-or-get")
    , oneByOne = require("one-by-one")
    ;

mongoose.Promise = global.Promise;

const BloggifyMongoose = exports;
/**
 * init
 *
 * @name init
 * @function
 * @param {Object} config The configuration object.
 *
 *  - `db` (String): The database url.
 *  - `models` (Object): An object containing the Mongoose models.
 *
 * @param {Bloggify} bloggify The `Bloggify` instance.
 * @param {Function} ready The ready handler.
 */
BloggifyMongoose.init = function (config, bloggify, ready) {
    BloggifyMongoose.db = config.db;
    let models = BloggifyMongoose.models = bloggify.models;
    mongoose.connect(config.db, ready);
    mongoose.connection.on("error", err => bloggify.log(err));
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
