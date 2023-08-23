const mongoose = require('mongoose');

const { Schema } = mongoose;

const { format, parseISO } = require('date-fns');

const publisherSchema = new Schema({
  name: String,
  country: String,
  foundingYear: Date,
  website: String,
});

publisherSchema.virtual('urlPath').get(function () {
  return `/inventory/publisher/${this._id}`;
});

publisherSchema.virtual('foundingYearFormat').get(function () {
  return format(parseISO(this.foundingYear.toISOString()), 'yyyy-MM-dd');
});

module.exports = mongoose.model('Publisher', publisherSchema);
