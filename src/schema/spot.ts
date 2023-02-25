import { z } from "zod";

export interface SpotResponse {
  code: number;
  message: string[];
  data: Spot[];
  paginator: {
    current_page: number;
    limit: number;
    total_count: number;
    total_pages: number;
  };
}

export interface Spot {
  id: number;
  name: string;
  description: string;
  is_current: boolean;
  created_at: string;
  updated_at: string;
  total_attendance?: number;
}

export const spotSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  description: z.string().min(1),
  is_current: z.boolean(),
});

export type spotSchemaType = z.infer<typeof spotSchema>;
