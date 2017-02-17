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
