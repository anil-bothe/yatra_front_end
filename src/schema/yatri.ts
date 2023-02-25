import { z } from "zod";

export interface YatriResponse {
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
export interface Yatri {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  mobile: string;
  attendance?: {id: number, is_present: boolean}
}

export const yatriSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  mobile: z.number().min(1)
});

export type yatriSchemaType = z.infer<typeof yatriSchema>;
