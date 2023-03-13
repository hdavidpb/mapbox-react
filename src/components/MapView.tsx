/* eslint import/no-webpack-loader-syntax: off */
import { useContext, useLayoutEffect, useRef, useEffect } from "react";
//@ts-ignore
import mapboxgl from "!mapbox-gl";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (mapDiv.current && userLocation) {
      const map = new mapboxgl.Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/light-v10", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
      setMap(map);
    }
  }, [mapDiv, userLocation]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mapDiv}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {userLocation?.join(",")}
    </div>
  );
};
