const mongoose = require("mongoose");
const validator = require("validator");

const CountryDetailSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Country name is required"],
    validate: [validator.isAlpha, "Country name must only contain characters"],
  },
  year: {
    type: String,
    required: [true, "Year is required"],
  },
  areaInSqKm: {
    type: Number,
    required: true,
  },
  totalPopulation: {
    type: Number,
    required: true,
  },
});

const CountryDetail = mongoose.model("countryDetails", CountryDetailSchema);

module.exports = CountryDetail;
