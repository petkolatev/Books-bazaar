
export interface Book {
    _id: string,
    title: string;
    author: string;
    genre: string;
    year: string;
    description: string;
    image:string
    owner:string
    likes:string[]
}

export interface EditBook{
    title: string,
    author: string,
    genre: string,
    year: string,
    description: string,
    image: string,
}