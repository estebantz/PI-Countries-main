import {
  GET_ALL_COUNTRIES,
  FLITER_BY_LOC,
  FILTER_ABC,
  FILTER_POP,
  SEARCH_BY_NAME,
  COUNTRY_ACTIVITY,
  SEARCH_BY_ACTIVITY,
} from "../actions";

const initialState = {
  allCountries: [],
  countries: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };

    case FLITER_BY_LOC:
      const regionFiltered =
        action.payload === "All"
          ? state.allCountries
          : state.allCountries.filter(
              (country) => country.region === action.payload
            );
      return {
        ...state,
        countries: regionFiltered,
      };

    case FILTER_ABC:
      const arrNames = state.countries.map((c) => `${c.name}***${c.id}`);
      arrNames.sort();
      let filterNames = [];
      arrNames.forEach((countryString) => {
        const item = state.countries.find(
          (country) => country.id === countryString.split("***")[1]
        );
        filterNames.push(item);
      });

      return {
        ...state,
        countries:
          action.payload !== ""
            ? action.payload === "asc"
              ? filterNames
              : filterNames.reverse()
            : state.allCountries,
      };
    case FILTER_POP:
      const arrPop = state.countries.map((c) => `${c.population}***${c.id}`);
      arrPop.sort();
      let filterPop = [];
      arrPop.forEach((countryString) => {
        const item = state.countries.find(
          (country) => country.id === countryString.split("***")[1]
        );
        filterPop.push(item);
      });
      return {
        ...state,
        countries:
          action.payload !== ""
            ? action.payload === "pobasc"
              ? filterPop
              : filterPop.reverse()
            : state.allCountries,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        countries: state.allCountries.filter((country) =>
          country.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case SEARCH_BY_ACTIVITY:
      return {
        ...state,
        countries: state.allCountries.filter((country) => {
          let includes = false;
          // HAGO UN FOR EACH DE LAS ACTIVIDADES DE CADA PAIS Y BUSCO LA COINCIDENCIA
          country.activities.forEach((act) => {
            // console.log(act);
            if (act.name.toLowerCase().includes(action.payload.toLowerCase())) {
              includes = true;
            }
          });
          return includes;
        }),
      };

    case COUNTRY_ACTIVITY:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
