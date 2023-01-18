const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const callApi = await axios.get("https://restcountries.com/v3/all");
  const apiInfo = await callApi.data.map((country) => {
    return {
      id: country.cca3,
      name: country.name.common,
      flag: country.flags[1],
      region: country.region,
      capital: country.capital,
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    };
  });
  // console.log(apiInfo);
  return apiInfo;
};

const getDbData = async () => {
  return await Country.findAll({
    include: Activity,
  });
};

const getAllInfo = async () => {
  const apiData = await getApiInfo();
  const dbData = await getDbData();

  const dataAll = apiData.concat(dbData);

  return dataAll;
};

router.get("/countries", async (req, res) => {
  const { name } = req.query;
  try {
    const allInfo = await getDbData();
    if (name) {
      const onlyCountry = await allInfo.filter((e) => {
        return e.name.toString().toLowerCase().includes(name.toLowerCase());
      });
      onlyCountry.length
        ? res.status(200).send(onlyCountry)
        : res.status(404).send("El pais no existe");
    } else {
      res.status(200).send(allInfo);
    }
  } catch (error) {
    res.status(404).send("No se encontro el pais");
  }
});

router.get("/countries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allCountries = await getDbData();
    if (id) {
      let countryId = await allCountries.filter(
        (e) => e.id.toLowerCase() === id.toLocaleLowerCase()
      );
      countryId.length
        ? res.status(200).json(countryId)
        : res.status(404).json("No se encontro el pais");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/activities", async (req, res) => {
  console.log(req.body);
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    // console.log(name, difficulty, duration, season, countries);
    if (name && difficulty && duration && season && countries) {
      const activity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });

      countries.forEach(async (id) => {
        const country = await Country.findOne({
          where: { id: { [Op.iLike]: `%${id}%` } },
        });
        await country.addActivity(activity);
      });

      return res.send(activity);
    } else {
      return res.status(404).json("Missing data");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
