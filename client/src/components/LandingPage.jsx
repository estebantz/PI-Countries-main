import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="textCenter marginTop">
      <h1>Welcome to Countries App</h1>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
