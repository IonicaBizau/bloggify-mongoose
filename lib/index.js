"use strict";

const mongoose = require("mongoose")
    , iterateObject = require("iterate-object")
    ;

exports.init = function (config, bloggify, ready) {
    exports.db = config.db;
    let models = exports.models = {};
    mongoose.connect(config.db, ready);
    iterateObject(config.models, (c, n) => {
        models[n] = mongoose.model(n, c);
    });
};
