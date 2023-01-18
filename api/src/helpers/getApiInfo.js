const axios = require("axios");

const getApiInfo = async () => {
  const callApi = await axios.get("https://restcountries.com/v3/all");
  const apiInfo = await callApi.data.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      flags: country.flags[1],
      region: country.region,
      capital: country.capital || "Sin Capital",
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });
  return apiInfo;
};

module.exports = {
  getApiInfo,
};
