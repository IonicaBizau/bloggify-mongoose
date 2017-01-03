"use strict";

const mongoose = require("mongoose")
    , iterateObject = require("iterate-object")
    ;

mongoose.Promise = global.Promise;

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
exports.init = function (config, bloggify, ready) {
    exports.db = config.db;
    let models = exports.models = bloggify.models;
    mongoose.connect(config.db, ready);
    mongoose.connection.on("error", err => bloggify.log(err));
    iterateObject(config.models, (c, n) => {
        models[n] = mongoose.model(n, c);
    });
};
