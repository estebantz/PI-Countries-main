import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountryByLoc,
  filterAbc,
  filterPop,
  searchByName,
  postActivity,
  searchByActivity,
} from "../actions";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import Card from "./Card";
import "./Home.css";
import Form from "./Form";

export default function Home() {
  // states para formulario:
  const [addingActivity, setAddingActivity] = useState(false);
  const [dataActivity, setDataActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    console.log(dataActivity);
  }, [dataActivity]);

  // guardar datos formiulario
  const saveData = (e) => {
    setDataActivity({ ...dataActivity, [e.target.name]: e.target.value });
  };
  const addDeleteCountryId = (id) => {
    if (dataActivity.countries.includes(id)) {
      setDataActivity({
        ...dataActivity,
        countries: dataActivity.countries.filter((id_) => id_ !== id),
      });
    } else {
      const dataActivity_ = JSON.parse(JSON.stringify(dataActivity));
      dataActivity_.countries.push(id);
      setDataActivity(dataActivity_);
    }
  };

  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const [page, setPage] = useState(1);
  const countriesPerPage = 10;
  const indexOfLastCountry = page * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  // console.log(currentCountries);

  const handlerFilterRegion = (e) => {
    setPage(1);
    dispatch(filterCountryByLoc(e.target.value));
  };
  const handlerFilterAbc = (e) => {
    setPage(1);
    dispatch(filterAbc(e.target.value));
  };
  const handlerFilterPop = (e) => {
    setPage(1);
    dispatch(filterPop(e.target.value));
  };
  const handlerFilterName = (e) => {
    setPage(1);
    dispatch(searchByName(e.target.value));
  };
  const handlerFilterActivity = (e) => {
    setPage(1);
    dispatch(searchByActivity(e.target.value));
  };

  const saveActivity = () => {
    if (validateForm(dataActivity)) {
      alert(validateForm(dataActivity));
    } else {
      dispatch(postActivity(dataActivity));
      setAddingActivity(false);
      setDataActivity({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
      });
    }
  };

  const validateForm = (dataActivity) => {
    let error = null;
    if (dataActivity.name === "") {
      error = "Debe ingresar el nombre de la actividad";
    } else if (dataActivity.difficulty === "") {
      error = "Debe ingresar la dificultad de la actividad";
    } else if (dataActivity.duration === "") {
      error = "Debe ingresar la duracion de la actividad";
    } else if (dataActivity.season === "") {
      error = "Debe ingresar la temporada de la actividad";
    } else if (dataActivity.countries.length < 1) {
      error = "Debe ingresar al menos un pais";
    }
    return error;
  };

  return (
    <div>
      <Link to="/countries"></Link>

      <div className="navHome">Country Tourist Activities App</div>

      <form className="textCenter">
        <input
          onChange={handlerFilterName}
          type="text"
          placeholder="Search country..."
          className="textCenter"
        />
      </form>

      <div className="textCenter borderSel">
        <select onChange={handlerFilterRegion} className="magin">
          <option value="All">-Continente-</option>
          {regions.map((region, pos) => (
            <option key={pos} value={region}>
              {region}
            </option>
          ))}
        </select>

        {/* actividad turistica */}

        <input
          onChange={handlerFilterActivity}
          type="text"
          placeholder="Search activity..."
          className="textCenter"
        />

        <select onChange={handlerFilterAbc} className="magin">
          <option value="">Orden Alfabetico</option>
          <option value="asc">Ascendente</option>
          <option value="des">Descendente</option>
        </select>
        <select onChange={handlerFilterPop} className="magin">
          <option value="">Orden por poblacion</option>
          <option value="pobasc">Ascendente por poblacion</option>
          <option value="pobdes">Descendente por poblacion</option>
        </select>

        {addingActivity ? (
          <button
            onClick={() => setAddingActivity(false)}
            className="activityCancel"
          >
            Cancel
          </button>
        ) : null}
        <button
          onClick={
            addingActivity
              ? () => saveActivity()
              : () => setAddingActivity(true)
          }
          className="activity"
        >
          {addingActivity ? "Save activity" : "Add activity +"}
        </button>
      </div>

      {addingActivity ? <Form saveData={saveData}></Form> : null}

      <Paginado
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        setPage={setPage}
        page={page}
      ></Paginado>
      <div className="containerCards">
        {currentCountries?.map((country, pos) => {
          return addingActivity ? (
            <div
              onClick={() => addDeleteCountryId(country.id)}
              className="containerCards"
            >
              <Card
                country={country}
                addedCountries={dataActivity.countries}
                key={country.id}
              />
            </div>
          ) : (
            <Link
              className="textDecorationNone"
              key={pos}
              to={"/country/" + country.id}
            >
              <div className="containerCards">
                <Card country={country} key={country.id} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
