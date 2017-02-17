
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
          , address: {
                street: {
                    type: String
                  , required: true
                }
              , zip: {
                    type: String
                  , match: [/\d{5}-?(\d{4})?/, "Invalid ZIP code."]
                  , required: true
                }
              , phone: {
                    type: String
                  , match: [/\d{3}[\-]?\d{3}[\-]?\d{4}/, "Invalid phone number format."]
                  , required: true
                }
            }
          , birth: {
                type: Date
              , required: true
            }
          , gender: {
                type: String
              , match: [/m|f/, "Invalid gender."]
              , required: true
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



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].



## :scroll: License

[MIT][license] © [Bloggify][website]

[license]: http://showalicense.com/?fullname=Bloggify%20%3Csupport%40bloggify.org%3E%20(https%3A%2F%2Fbloggify.org)&year=2016#license-mit
[website]: https://bloggify.org
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
