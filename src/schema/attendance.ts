import { Spot } from "./spot";
import { Yatri } from "./yatri";

export interface Attendance {
    id: number;
    created_at: string;
    updated_at: string;
    yatri: Yatri;
    spot: Spot;
    is_present: boolean;
}

export interface AttendanceResponse {
    code: number;
    message: string[];
    data: Yatri[];
    paginator: {
      current_page: number;
      limit: number;
      total_count: number;
      total_pages: number;
    };
  }
  