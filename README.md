
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

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :memo: Documentation


### bloggify:init

#### Params
- **Object** `config`:
 - `uri` (String): The database url.
 - `models` (Object): An object containing the Mongoose models.
 - `models_dir` (String): The relative path to a directory containing models stored in files.

The model objects can be accessed by requiring the module or accessing the `Bloggify.models` object.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`bloggify.org`](https://github.com/Bloggify/newww#readme) (by Bloggify)—The Bloggify.org website source code.

## :scroll: License

[MIT][license] © [Bloggify][website]

[license]: http://showalicense.com/?fullname=Bloggify%20%3Csupport%40bloggify.org%3E%20(https%3A%2F%2Fbloggify.org)&year=2016#license-mit
[website]: https://bloggify.org
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
