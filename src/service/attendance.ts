import axios from "axios";
import { AttendanceResponse } from "../schema/attendance";

interface AttendanceService {
  getAttendanceBySpotId(
    id: number,
    params: object
  ): Promise<AttendanceResponse>;

  putAttendance(spotId: number, yatriId: number, isPresent: boolean): Promise<void>
}

class AttendanceAPI implements AttendanceService {
  ENDPOINT = process.env.REACT_APP_ENDPOINT;

  getAttendanceBySpotId(
    id: number,
    params: object
  ): Promise<AttendanceResponse> {
    return axios
      .get(`${this.ENDPOINT}/attendance/list/${id}/`, { params: params })
      .then((res) => res.data as Promise<AttendanceResponse>);
  }
  putAttendance(spotId: number, yatriId: number, isPresent: boolean): Promise<void> {
    return axios.post(`${this.ENDPOINT}/attendance/put/`, {spot_id: spotId, yatri_id: yatriId, is_present: isPresent})
  }
}

function getAttendanceAPI() {
  return new AttendanceAPI();
}

export default getAttendanceAPI;
