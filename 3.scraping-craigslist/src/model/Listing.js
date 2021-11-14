const { Schema, model } = require("mongoose");

const listingSchema = new Schema({
  description: String,
  compensation: String,
  title: String,
  url: String,
  datePosted: Date,
  hood: String,
});

const Listing = model("Listing", listingSchema);

module.exports = Listing;
