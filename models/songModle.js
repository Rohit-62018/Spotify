const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const trendingSchema = new Schema({
    image:String,
    itemName:String,
    singer:String
  })

const artistSchema = new Schema({
   image:String,
    itemName:String
})

const chartsSchema = new Schema({
   image:String,
   itemName:String,
   singer:String
})

module.exports.Trend = mongoose.model("Trend",trendingSchema);
module.exports.Artist = mongoose.model("Artist",artistSchema);
module.exports.Chart =  mongoose.model("Chart",chartsSchema);
