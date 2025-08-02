const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playListSchema = new Schema({
  name: String,
  album: String,
  url: String,
  image: String,
});

module.exports = mongoose.model("PlayList", playListSchema);