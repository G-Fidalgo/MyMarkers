const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const markerSchema = new Schema({
  creator: {type:Schema.Types.ObjectId, ref: 'User'},
  lng: Number,
  lat: Number,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [{type:Schema.Types.ObjectId, ref: 'Comment'}],
  tags: Array,
  reactions: Array,
  picPath: String,
});

const Marker = mongoose.model('Marker', markerSchema);
module.exports = Marker;
