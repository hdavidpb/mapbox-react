import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token:
      "pk.eyJ1IjoiaGRhdmlkcGIiLCJhIjoiY2xmNW13bHBmMWRnYzQ0bGNoa3FwNGtoNCJ9.7JdfnFR3upbyTWdzlhO-7A",
  },
});

export default searchApi;
