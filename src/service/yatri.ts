import axios from "axios";
import { Yatri, YatriResponse, yatriSchemaType } from "../schema/yatri";

interface YatriService {
  // all database yatri
  getYatriList(params: object): Promise<YatriResponse>;

  addYatri(yatri: yatriSchemaType): Promise<Yatri>;
  updateYatri(yatri: yatriSchemaType): Promise<Yatri>;
  retrieveYatri(id: number): Promise<Yatri>;
  deleteYatri(id: number): Promise<Yatri>;
}

class YatriAPI implements YatriService {
  ENDPOINT = process.env.REACT_APP_ENDPOINT;

  getYatriList(params: object): Promise<YatriResponse> {
    return axios
      .get(`${this.ENDPOINT}/yatri/list/`, {params: params})
      .then((res) => res.data as Promise<YatriResponse>);
  }
  addYatri(yatri: yatriSchemaType): Promise<Yatri> {
    return axios
      .post(`${this.ENDPOINT}/yatri/list/`, yatri)
      .then((res) => res.data as Promise<Yatri>);
  }
  updateYatri(yatri: yatriSchemaType): Promise<Yatri> {
    return axios
      .put(`${this.ENDPOINT}/yatri/${yatri.id}/`, yatri)
      .then((res) => res.data as Promise<Yatri>);
  }
  retrieveYatri(id: number): Promise<Yatri> {
    return axios
      .get(`${this.ENDPOINT}/yatri/${id}/`)
      .then((res) => res.data as Promise<Yatri>);
  }
  deleteYatri(id: number): Promise<Yatri> {
    return axios
      .delete(`${this.ENDPOINT}/yatri/${id}/`)
      .then((res) => res.data as Promise<Yatri>);
  }
}

function getYatriAPI() {
  return new YatriAPI();
}

export default getYatriAPI;
