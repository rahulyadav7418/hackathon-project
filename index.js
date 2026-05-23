const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Offer = require("./models/offer");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/offerBookingDB');
}

// app.get("/create", async(req, res) => {
//      let newOffer = new Offer({
//          title: "Afternoon Gym Trial",
//          description: "Special gym offer",
//          originalPrice: 499,
//          offerPrice: 99,
//          capacity: 20
//         });
//         await newOffer.save();
//         res.send("Offer Saved");
// });


app.get("/offers", async(req, res) => {
    let offers = [];
    res.render("offers.ejs", { offers });
})

app.post("/offers", async(req, res) => {
    let newOffer = new Offer(req.body);
    await newOffer.save();
    res.redirect("/offers");
});

app.delete("/offers/:id", async(req, res) => {
    let { id } = req.params;

    await Offer.findByIdAndDelete(id);
    res.redirect("/offers");
});

app.get("/offers/:id/edit", async(req, res) => {
    let { id } = req.params;
    let offer = await Offer.findById(id);
    res.render("edit.ejs", { offer });
});

app.put("/offers/:id", async(req, res) => {
    let { id } = req.params;
    
    await Offer.findByIdAndUpdate(id, req.body);
    res.redirect("/offers");
});

app.get("/", (req, res) => {
    res.send("Server working");
});

app.listen(8080, () => {
    console.log("Server is listioning on port 8080");
});