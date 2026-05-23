const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
    title: String,
    description: String,
    originalPrice: Number,
    offerPrice: Number,
    capacity: Number
});

const Offer = mongoose.model("offer", offerSchema);
module.exports = Offer;