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
