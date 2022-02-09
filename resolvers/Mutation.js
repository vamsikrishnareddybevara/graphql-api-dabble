const countryDetail = require("./../models/CountryDetail.model");

const mutationResolvers = {
  updateCountryDetails: async (parent, args, context, info) => {
    const { id } = args;
    const { areaInSqKm = undefined, totalPopulation = undefined } =
      args.countryDetails;

    const details = await countryDetail.findByIdAndUpdate(
      id,
      {
        areaInSqKm,
        totalPopulation,
      },
      { new: true, runValidators: true }
    );

    return details;
  },
  deleteCountryDetails: async (parent, args, context, info) => {
    const { id } = args;

    const details = await countryDetail.findByIdAndDelete(id);
    console.log({ details });
    return details;
  },
  createCountryDetails: async (parent, args, context, info) => {
    console.log({ args });
    const { country, year, areaInSqKm, totalPopulation } = args.countryDetails;
    const countryDetailExists = await countryDetail.find({
      country,
      year,
    });

    if (countryDetailExists) {
      return new Error("Country details already exist");
    }
    const details = await countryDetail.create({
      country,
      year,
      areaInSqKm,
      totalPopulation,
    });

    return details;
  },
};

module.exports = mutationResolvers;
