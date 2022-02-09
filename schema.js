const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Country {
    country: String!
    year: String!
    areaInSqKm: Int!
    totalPopulation: Int!
  }
  input CountryUpdateInput {
    areaInSqKm: Int
    totalPopulation: Int
  }

  input CountryCreateInput {
    country: String!
    year: String!
    areaInSqKm: Int
    totalPopulation: Int
  }
  type Query {
    getAllCountryDetails: [Country]
    getCountryDetailsById(id: ID!): Country
    getCountryDetailsByYear(year: String!): [Country]
    getCountryDetailsByName(country: String!): [Country]
  }

  type Mutation {
    updateCountryDetails(id: ID!, countryDetails: CountryUpdateInput!): Country
    deleteCountryDetails(id: ID!): Country
    createCountryDetails(countryDetails: CountryCreateInput): Country
  }
`;
module.exports = typeDefs;
