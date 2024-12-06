import { UserForAuth } from "./user";

export interface Book {
    _id: string,
    title: string;
    author: string;
    genre: string;
    year: string;
    description: string;
    image:string
    owner:UserForAuth
    likes:string[]
}