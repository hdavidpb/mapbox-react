import { useRef, ChangeEvent, useContext } from "react";
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const debaunceRef = useRef<NodeJS.Timeout>();
  const { searchPlacesByTerm } = useContext(PlacesContext);

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debaunceRef.current) {
      clearTimeout(debaunceRef.current);
    }

    debaunceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 450);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={onQueryChange}
      />
      <SearchResults />
    </div>
  );
};
