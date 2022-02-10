const countryDetail = require("./../models/CountryDetail.model");

const mutationResolvers = {
  updateCountryDetails: async (parent, args, context, info) => {
    const { id } = args;
    const { areaInSqKm = undefined, totalPopulation = undefined } =
      args.countryDetails;

    const countryDetails = await countryDetail.findByIdAndUpdate(
      id,
      {
        areaInSqKm,
        totalPopulation,
      },
      { new: true, runValidators: true }
    );
    if (!countryDetails) {
      return new Error(`Country details doesn't exist with the ID provided`);
    }
    return countryDetails;
  },
  deleteCountryDetails: async (parent, args, context, info) => {
    const { id } = args;
    const countryDetails = await countryDetail.findByIdAndDelete(id);
    if (!countryDetails) {
      return new Error(`Country details doesn't exist with the ID provided`);
    }
    return countryDetails;
  },
  createCountryDetails: async (parent, args, context, info) => {
    const {
      country,
      year,
      areaInSqKm = undefined,
      totalPopulation = undefined,
    } = args.countryDetails;
    const countryDetailExists = await countryDetail.find({
      country,
      year,
    });
    if (countryDetailExists && countryDetailExists.length > 0) {
      return new Error("Country details already exist");
    }
    const newCountryDetails = await countryDetail.create({
      country,
      year,
      areaInSqKm,
      totalPopulation,
    });

    return newCountryDetails;
  },
};

module.exports = mutationResolvers;
