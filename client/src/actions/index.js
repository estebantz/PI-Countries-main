import axios from "axios";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const FLITER_BY_LOC = "FLITER_BY_LOC";
export const FILTER_ABC = "FILTER_ABC";
export const FILTER_POP = "FILTER_POP";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const COUNTRY_ACTIVITY = "COUNTRY_ACTIVITY";
export const SEARCH_BY_ACTIVITY = "SEARCH_BY_ACTIVITY";

export const getCountries = () => {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/countries")
      .then((r) => dispatch({ type: GET_ALL_COUNTRIES, payload: r.data }));
  };
};

export function filterCountryByLoc(payload) {
  return {
    type: FLITER_BY_LOC,
    payload,
  };
}

export function filterAbc(payload) {
  return {
    type: FILTER_ABC,
    payload,
  };
}

export function filterPop(payload) {
  return {
    type: FILTER_POP,
    payload,
  };
}

export function searchByName(payload) {
  return {
    type: SEARCH_BY_NAME,
    payload,
  };
}
export function searchByActivity(payload) {
  return {
    type: SEARCH_BY_ACTIVITY,
    payload,
  };
}

export function postActivity(data) {
  return function (dispatch) {
    return axios.post("http://localhost:3001/activities", data).then((r) => {
      if (r.status === 200) {
        alert("Actividad creada exitosamente");
      } else {
        alert("Ocurrio algun error al crear la actividad");
      }
    });
  };
}
