import { createContext } from "react";
import { Feature } from "../../interfaces/places";
import { PlacesState } from "./PlacesProvider";

export interface PlacesContextProps extends PlacesState {
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlacesContextProps>(
  {} as PlacesContextProps
);
