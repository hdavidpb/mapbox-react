/* eslint import/no-webpack-loader-syntax: off */

import { useReducer, useContext, useEffect } from "react";
//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "../../context";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";
export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);
  useEffect(() => {
    if (places.length !== 0) {
      state.markers.forEach((marker) => marker.remove());
      const newMarkers: Marker[] = [];

      for (const place of places) {
        const [lng, lat] = place.center;
        const popup = new Popup().setHTML(`<h6>
      ${place.text}
      </h6>
      <p>    ${place.place_name}</p>
      `);

        const newMarker = new Marker()
          .setPopup(popup)
          .setLngLat([lng, lat])
          .addTo(state.map!);

        newMarkers.push(newMarker);
      }
      dispatch({ type: "setMarkers", payload: newMarkers });
    }

    // Todo: limpiar polyline
  }, [places]);

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup();
    myLocationPopup.setHTML(`<h4>Aquí estoy</h4>
    <p>En algún lugar del mundo</p>`);

    new Marker()
      .setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(myLocationPopup);

    dispatch({ type: "setMap", payload: map });
  };

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates } = geometry;
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    const minutes = Math.floor(duration / 60);

    console.log({ kms, minutes });

    const bounds = new LngLatBounds(start, start);
    for (const coord of coordinates) {
      const newCord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCord);
    }

    state.map?.fitBounds(bounds, { padding: 200 });

    //Polyline

    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates,
            },
          },
        ],
      },
    };
    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourceData);
    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "green",
        "line-width": 3,
      },
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,
        //Methods

        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
