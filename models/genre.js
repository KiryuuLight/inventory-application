const mongoose = require('mongoose');

const { Schema } = mongoose;

const genreSchema = new Schema({
  name: String,
  description: String,
});

genreSchema.virtual('urlPath').get(function () {
  return `/inventory/genre/${this._id}`;
});

module.exports = mongoose.model('Genre', genreSchema);
