import React, { useEffect } from "react";

export default function Paginado({
  countriesPerPage,
  allCountries,
  setPage,
  page,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="textCenter">
      <ul>
        {pageNumbers.map((number, pos) => (
          <button
            key={pos}
            className={page === number ? "page currentPage" : "page"}
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}
      </ul>
    </nav>
  );
}
