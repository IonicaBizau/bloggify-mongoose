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
 *
 * The model objects can be accessed by requiring the module or accessing the `Bloggify.models` object.
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

        /**
         * model.addHook
         * Add `pre/post` hooks to the model operations.
         *
         * Example:
         *
         * ```js
         * const EMAIL_BLACKLIST = ["foo@bar.com"];
         *
         * // Do something before saving
         * Bloggify.models.User.addHook("pre", "save", function (next) {
         *   if (EMAIL_BLACKLIST.includes(this.email)) {
         *      return next(new Error("This email is blacklisted."));
         *   }
         *   next();
         * });
         *
         * // Do something after saving a document
         * Bloggify.models.User.addHook("post", "save", function (next) {
         *   console.log("User was saved: ", this);
         *   next();
         * });
         * ```
         *
         * @name model.addHook
         * @function
         * @param {String} type The Mongoose hook type (`pre` or `post`).
         * @param {String} event The Mongoose event name. Valid events are:
         *
         *     - `init`
         *     - `validate`
         *     - `save`
         *     - `remove`
         *
         *   Find more information about this in the [Mongoose documentation](http://mongoosejs.com/docs/middleware.html).
         *
         * @param {Function} fn The callback function called with the Model
         * instance as context and with a `next` handler.
         */
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
