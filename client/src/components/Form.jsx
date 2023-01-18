import React, { useState } from "react";

const difficulty = ["1", "2", "3", "4", "5"];
const seasons = ["summer", "fall", "winter", "spring"];

export default function Form({ saveData }) {
  return (
    <>
      <h1 className="textCenter subTitle"> Create your Activity</h1>
      <div className="textCenter borderSel containerForm">
        {/* <div className="textCenter"> */}
        {/* <form> */}
        <div className="inputs">
          <label>Name</label>
          <input
            className="itemsForm"
            type="text"
            name="name"
            onChange={saveData}
          />
        </div>

        <div className="inputs">
          <label>Difficulty</label>
          <select className="itemsForm" name="difficulty" onChange={saveData}>
            <option value="">-</option>
            {difficulty.map((number) => (
              <option value={number}>{number}</option>
            ))}
          </select>
        </div>

        <div className="inputs">
          <label>Duration</label>
          <input
            className="itemsForm"
            type="text"
            name="duration"
            onChange={saveData}
          />
        </div>

        <div className="inputs">
          <label>Season</label>
          <select className="itemsForm" name="season" onChange={saveData}>
            <option value="">-</option>
            {seasons.map((season) => (
              <option value={season}>{season}</option>
            ))}
          </select>
        </div>
        {/* </form> */}
      </div>
    </>
  );
}
