# bloggify-mongoose [![Version](https://img.shields.io/npm/v/bloggify-mongoose.svg)](https://www.npmjs.com/package/bloggify-mongoose) [![Downloads](https://img.shields.io/npm/dt/bloggify-mongoose.svg)](https://www.npmjs.com/package/bloggify-mongoose)

> Mustache renderer for Bloggify.

## Installation

```sh
$ npm i --save bloggify-mongoose
```

## Example

```js
// Configuration example
module.exports = {
    db: "mongodb://localhost/people"
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

## Documentation

### `init(config, bloggify, ready)`

#### Params
- **Object** `config`: The configuration object.
 - `db` (String): The database url.
 - `models` (Object): An object containing the Mongoose models.
- **Bloggify** `bloggify`: The `Bloggify` instance.
- **Function** `ready`: The ready handler.

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[MIT][license] © [Bloggify][website]

[license]: http://showalicense.com/?fullname=Bloggify&year=2016#license-mit
[website]: 
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md