## Documentation

You can see below the API reference of this module.

### Plugin Configuration

 - `db` (String): The database url.
 - `models` (Object): An object containing the Mongoose models.
 - `models_dir` (String): The relative path to a directory containing models stored in files.

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

