import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './types/book';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Book[]>(`/api/books`)
  }

  getOneBook(id: string) {

    return this.http.get<Book>(`/api/books/${id}`)
  }
  createBook(title: string, author: string, genre: string, year: string, description: string, image: string, owner: string) {
    const payload = { title, author, genre, year, description, image, owner }

    return this.http.post<Book>(`/api/books`, payload)
  }

  like(id: string, user: string) {
    return this.http.put<Book>(`/api/books/${id}`, { id, user })
  }
  remove(id: string) {
    return this.http.delete<Book>(`/api/books/${id}`)
  }

}
