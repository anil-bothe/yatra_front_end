import axios from "axios";
import { Spot, spotSchemaType, SpotResponse } from "../schema/spot";

interface SpotService {
  // all database spot
  getSpotList(params: object): Promise<SpotResponse>;

  addSpot(spot: spotSchemaType): Promise<Spot>;
  getCurrentSpot(): Promise<Spot>;
  updateSpot(spot: spotSchemaType): Promise<Spot>;
  retrieveSpot(id: number): Promise<Spot>;
  deleteSpot(id: number): Promise<Spot>;
}

class SpotAPI implements SpotService {
  ENDPOINT = process.env.REACT_APP_ENDPOINT;

  getSpotList(params: object): Promise<SpotResponse> {
    return axios
      .get(`${this.ENDPOINT}/spot/list/`, {params: params})
      .then((res) => res.data as Promise<SpotResponse>);
  }
  addSpot(spot: spotSchemaType): Promise<Spot> {
    return axios
      .post(`${this.ENDPOINT}/spot/list/`, spot)
      .then((res) => res.data.data as Promise<Spot>);
  }
  getCurrentSpot(): Promise<Spot> {
    return axios.get(`${this.ENDPOINT}/spot/current/`).then(res => res.data.data as Promise<Spot>)
  }
  updateSpot(spot: spotSchemaType): Promise<Spot> {
    return axios
      .put(`${this.ENDPOINT}/spot/${spot.id}/`, spot)
      .then((res) => res.data as Promise<Spot>);
  }
  retrieveSpot(id: number): Promise<Spot> {
    return axios
      .get(`${this.ENDPOINT}/spot/${id}/`)
      .then((res) => res.data as Promise<Spot>);
  }
  deleteSpot(id: number): Promise<Spot> {
    return axios
      .delete(`${this.ENDPOINT}/spot/${id}/`)
      .then((res) => res.data as Promise<Spot>);
  }
}

function getSpotAPI() {
  return new SpotAPI();
}

export default getSpotAPI;
