
# bloggify-mongoose

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/bloggify-mongoose.svg)](https://www.npmjs.com/package/bloggify-mongoose) [![Downloads](https://img.shields.io/npm/dt/bloggify-mongoose.svg)](https://www.npmjs.com/package/bloggify-mongoose) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Mustache renderer for Bloggify.

## :cloud: Installation

```sh
$ npm i --save bloggify-mongoose
```


## :clipboard: Example



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

## :memo: Documentation


### Plugin Configuration

 - `db` (String): The database url.
 - `models` (Object): An object containing the Mongoose models.
 - `models_dir` (String): The relative path to a directory containing models stored in files.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:


## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
