
# bloggify-mongoose

 [![Version](https://img.shields.io/npm/v/bloggify-mongoose.svg)](https://www.npmjs.com/package/bloggify-mongoose) [![Downloads](https://img.shields.io/npm/dt/bloggify-mongoose.svg)](https://www.npmjs.com/package/bloggify-mongoose)

> Support for Mongoose models in Bloggify.

## :cloud: Installation

```sh
$ npm i --save bloggify-mongoose
```


## :clipboard: Example



```js
// Configuration example
module.exports = {
    db: "mongodb://localhost/people"
  , models_dir: "path/to/models"
    /*
        Comment.js:
            module.exports = {
                body: String,
                ...
            };
     */
  , models: {
        User: {
            name: {
                first: {
                    type: String
                  , required: true
                  , match: [/.*\S+.*/, "Invalid name."]
                }
              , last: {
                    type: String
                  , required: true
                  , match: [/.*\S+.*/, "Invalid name."]
                }
            }
          , email: {
                type: String
              , index: true
              , required: true
              , match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address."]
            }
        }
    }
};
```

## :memo: Documentation


### Plugin Configuration

 - `db` (String): The database url.
 - `models` (Object): An object containing the Mongoose models.
 - `models_dir` (String): The relative path to a directory containing models stored in files.

The model objects can be accessed by requiring the module or accessing the `Bloggify.models` object.

### `model.addHook(type, event, fn)`Add `pre/post` hooks to the model operations.

Example:

```js
const EMAIL_BLACKLIST = ["foo@bar.com"];

// Do something before saving
Bloggify.models.User.addHook("pre", "save", function (next) {
  if (EMAIL_BLACKLIST.includes(this.email)) {
     return next(new Error("This email is blacklisted."));
  }
  next();
});

// Do something after saving a document
Bloggify.models.User.addHook("post", "save", function (next) {
  console.log("User was saved: ", this);
  next();
});
```
#### Params
- **String** `type`: The Mongoose hook type (`pre` or `post`).
- **String** `event`: The Mongoose event name. Valid events are:
    - `init`
    - `validate`
    - `save`
    - `remove`

  Find more information about this in the [Mongoose documentation](http://mongoosejs.com/docs/middleware.html).
- **Function** `fn`: The callback function called with the Model instance as context and with a `next` handler.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].



## :scroll: License

[MIT][license] © [Bloggify][website]

[license]: http://showalicense.com/?fullname=Bloggify%20%3Csupport%40bloggify.org%3E%20(https%3A%2F%2Fbloggify.org)&year=2016#license-mit
[website]: https://bloggify.org
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
