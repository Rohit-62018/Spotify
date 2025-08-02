const mongoose = require("mongoose")
const initData = require("./data") 
const {Trend, Artist, Chart} = require('../models/songModle');


async function main() {
   await mongoose.connect("mongodb://127.0.0.1:27017/Spotify")
}

main().then(()=>console.log("connected mongoose"))
      .catch((e)=>console.log(e))
  

const initDB = async()=>{
    await Trend.deleteMany({});
    await Artist.deleteMany({});
    await Chart.deleteMany({});
    await Trend.insertMany(initData.musicData);
    await Artist.insertMany(initData.artistData);
    await Chart.insertMany(initData.chartsData);
    console.log("data was initilized");
}

initDB();