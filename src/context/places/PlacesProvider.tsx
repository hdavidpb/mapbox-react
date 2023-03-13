import { useReducer, useEffect } from "react";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";
export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

export const PlacesProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: "setPlaces", payload: [] });
      return [];
    } // Todo: Limpiar state
    if (!state.userLocation) throw new Error("No hay ubicación del usuario");
    dispatch({ type: "setLoadingPlaces" });
    const res = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });

    dispatch({ type: "setPlaces", payload: res.data.features });
    return res.data.features;
  };

  useEffect(() => {
    getUserLocation().then((resp) =>
      dispatch({ type: "setUserLocation", payload: resp })
    );
    return () => {};
  }, []);

  return (
    <PlacesContext.Provider
      value={{
        ...state,

        //Methods
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
