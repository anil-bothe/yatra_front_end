import {z} from 'zod'


export interface User {
    id: number;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    address: string;
    email: string;
    mobile: string;
    gender: string;
    profile_image: string;
}


export const LoginSchema = z.object( {
    username: z.string().min(3),
    password: z.string().min(4)
})


export type LoginSchemaType = z.infer<typeof LoginSchema>;
