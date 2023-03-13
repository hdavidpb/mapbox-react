import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { Feature } from "../interfaces/places";
import { LoadingPlaces } from "./";
export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const [activeId, setActiveId] = useState<string>("");

  const handleFlyUp = (place: Feature) => {
    map?.flyTo({
      zoom: 14,
      center: place.center,
    });

    setActiveId(place.id);
  };

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }
  const getRoute = (place: Feature) => {
    if (!userLocation) return;

    getRouteBetweenPoints(userLocation, place.center);
  };
  return (
    <ul className={`list-group ${places.length === 0 ? "" : "mt-3"}`}>
      {places.map((place) => (
        <li
          onClick={() => handleFlyUp(place)}
          key={place.id}
          className={`${
            activeId === place.id ? "active" : ""
          } pointer list-group-item list-group-item-action`}
        >
          <h6>{place.text}</h6>
          <p style={{ fontSize: "12px" }}>{place.place_name}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              getRoute(place);
            }}
            className={`btn ${
              activeId === place.id
                ? "btn-outline-light"
                : "btn-outline-primary"
            } btn-sm`}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
