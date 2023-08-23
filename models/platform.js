const { parseISO, format } = require('date-fns');
const { enUS } = require('date-fns/locale');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const platformSchema = new Schema({
  name: String,
  releaseYear: Date,
  generation: String,
});

platformSchema.virtual('urlPath').get(function () {
  return `/inventory/platform/${this._id}`;
});

platformSchema.virtual('inputYearFormatted').get(function () {
  return format(
    parseISO(this.releaseYear.toISOString()),
    "d 'of' MMMM 'of' yyyy",
    { locale: enUS }
  );
});

platformSchema.virtual('releaseYearFormat').get(function () {
  return format(parseISO(this.releaseYear.toISOString()), 'yyyy-MM-dd');
});

module.exports = mongoose.model('Platform', platformSchema);
