const mongoose = require("mongoose");
const validator = require("validator");

const CountryDetailSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Country name is required"],
    minlength: [4, "Invalid country name"],
    validate: [validator.isAlpha, "Country name must only contain characters"],
  },
  year: {
    type: String,
    required: [true, "Year is required"],
    validate: [validator.isNumeric, "Year should only be a numberic string"],
  },
  areaInSqKm: {
    type: Number,
  },
  totalPopulation: {
    type: Number,
  },
});

const CountryDetail = mongoose.model("countryDetails", CountryDetailSchema);

module.exports = CountryDetail;
