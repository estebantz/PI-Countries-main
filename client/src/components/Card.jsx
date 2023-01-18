import React, { useEffect } from "react";

const Card = ({ country, addedCountries }) => {
  return (
    <div
      className={
        addedCountries?.includes(country.id)
          ? "addedCardCountry"
          : "cardCountry"
      }
    >
      <h3>{country.name}</h3>
      <h5>Continent: {country.region}</h5>
      <img src={country.flags} alt={`flag-${country.name}`} />
    </div>
  );
};
export default Card;
