const mongoose = require("mongoose")
const initData = require("./data") 
const {Trend, Artist, Chart} = require('../models/songModle');


async function main() {
   await mongoose.connect("mongodb+srv://rohitkumargiddi:e2uvLca7cElU2WHv@cluster0.fjlwgtf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

main().then(()=>console.log("connected mongoose"))
      .catch((e)=>console.log(e))
  

const initDB = async()=>{
    await Trend.insertMany(initData.musicData);
    await Artist.insertMany(initData.artistData);
    await Chart.insertMany(initData.chartsData);
    console.log("data was initilized");
}

initDB();