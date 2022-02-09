const countryDetail = require("./../models/CountryDetail.model");
const AppError = require("./../errorHandling/appError");
const queryResolvers = {
  getCountryDetailsById: async (parent, args, context, info) => {
    const { id } = args;
    const countryDetails = await countryDetail.findById(id);
    console.log("get details by id", id);
    if (!countryDetails) {
      return new AppError("No country found with that ID", 404);
      //   return new Error(`Country Doesn't exist`);
    }
    return countryDetails;
  },

  getAllCountryDetails: async () => {
    const alllCountryDetails = await countryDetail.find();

    return alllCountryDetails;
  },
  getCountryDetailsByName: async (parent, args, context, info) => {
    const { country } = args;
    const contryDetailsByName = await countryDetail.find({ country });

    return contryDetailsByName;
  },
  getCountryDetailsByYear: async (parent, args, context, info) => {
    const { year } = args;
    const details = await countryDetail.find({ year });

    return details;
  },
};

module.exports = queryResolvers;
