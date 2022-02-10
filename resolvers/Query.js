const countryDetail = require("./../models/CountryDetail.model");
const queryResolvers = {
  getCountryDetailsById: async (parent, args, context, info) => {
    const { id } = args;
    const countryDetails = await countryDetail.findById(id);
    if (!countryDetails) {
      return new Error(`Country Doesn't exist`);
    }
    return countryDetails;
  },

  getAllCountryDetails: async () => {
    const allCountryDetails = await countryDetail.find();
    return allCountryDetails;
  },

  getCountryDetailsByName: async (parent, args, context, info) => {
    const { country } = args;
    const contryDetailsByName = await countryDetail.find({ country });

    return contryDetailsByName;
  },

  getCountryDetailsByYear: async (parent, args, context, info) => {
    const { year } = args;
    const contryDetailsByYear = await countryDetail.find({ year });

    return contryDetailsByYear;
  },
};

module.exports = queryResolvers;
