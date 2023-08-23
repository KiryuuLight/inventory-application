const mongoose = require('mongoose');

const { Schema } = mongoose;

const gameSchema = new Schema({
  name: String,
  platform: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
  publisher: { type: Schema.Types.ObjectId, ref: 'Publisher' },
  quantity: Number,
  price: Number,
  description: String,
});

gameSchema.virtual('urlPath').get(function () {
  return `/inventory/game/${this._id}`;
});

module.exports = mongoose.model('Game', gameSchema);
