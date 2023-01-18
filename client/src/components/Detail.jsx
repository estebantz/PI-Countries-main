import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  //   const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  console.log(country?.activities);

  useEffect(() => {
    fetch(`http://localhost:3001/countries/${id}`)
      .then((response) => response.json())
      .then((dbCountry) => {
        setCountry(dbCountry[0]);
      })
      .catch((err) => {
        window.alert("Error", err);
      });
  }, [id]);

  return (
    <>
      {country ? (
        <>
          <div>
            <div className="containerDet">
              <h1 className="textT">{country.name}</h1>
              <img src={country.flags} alt={`flag-${country.name}`} />
              <h2 className="textC">Country Code: {country.id}</h2>
              <h2 className="textC">
                Capital: {country.capital.replace("{", "").replace("}", "")}
              </h2>
              <h2 className="textC">Subregion: {country.subregion}</h2>
              <h2 className="textC">Area: {country.area} m2 </h2>
              <h2 className="textC">Population: {country.population}</h2>
              {country.activities.length > 0 ? (
                <>
                  <h2 className="textC">Actividades:</h2>
                  <div className="containerActivities">
                    {country.activities.map((act, pos) => (
                      <div className="containerActivity">
                        <p>
                          <strong>Actividad:</strong> {act.name}
                        </p>
                        <p>
                          <strong>Dificultad:</strong> {act.difficulty}
                        </p>
                        <p>
                          <strong>Duracion:</strong> {act.duration}
                        </p>
                        <p>
                          <strong>Temporada:</strong> {act.season}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <div className="dibBott">
              <button className="buttonHome">
                <Link className="textDecorationNone" to={"/home"}>
                  Back to Home
                </Link>
              </button>
            </div>
          </div>
        </>
      ) : (
        <h3>Error al cargar el pais...</h3>
      )}
    </>
  );
}
