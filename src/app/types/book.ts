import { User } from "./user";

export interface Book {
    _id: string,
    title: string;
    author: string;
    genre: string;
    year: string;
    description: string;
    image:string
    owner:User
    likes:User[]
}