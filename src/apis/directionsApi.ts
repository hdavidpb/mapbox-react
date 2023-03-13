import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: false,
    language: "es",
    access_token:
      "pk.eyJ1IjoiaGRhdmlkcGIiLCJhIjoiY2xmNW13bHBmMWRnYzQ0bGNoa3FwNGtoNCJ9.7JdfnFR3upbyTWdzlhO-7A",
  },
});

export default directionsApi;
