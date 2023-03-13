/* eslint import/no-webpack-loader-syntax: off */

import React from "react";
//@ts-ignore
import mapboxgl from "!mapbox-gl";
import ReactDOM from "react-dom/client";
import { MapsApp } from "./MapsApp";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGRhdmlkcGIiLCJhIjoiY2xmNW13bHBmMWRnYzQ0bGNoa3FwNGtoNCJ9.7JdfnFR3upbyTWdzlhO-7A";

if (!navigator.geolocation) {
  alert("Tu navegador no tiene opción de Geolocation");
  throw new Error("Tu navegador no tiene opción de Geolocation");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
