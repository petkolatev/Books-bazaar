import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Book } from './types/book'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBooks(url?: string) {
    return this.http.get<Book[]>(`/api/book${url ?? ''}`)
  }

  getOneBook(id: string) {

    return this.http.get<Book>(`/api/book/${id}`)
  }
  
  createBook(title: string, author: string, genre: string, year: string, description: string, image: string, owner: string) {
    const payload = { title, author, genre, year, description, image, owner }

    return this.http.post<Book>(`/api/book`, payload)
  }

  like(bookId: string, book: Book, userId: string) {
    return this.http.put<Book>(`/api/book/${bookId}`, { likes: [...book.likes, userId] })
  }

  remove(id: string) {
    return this.http.delete<Book>(`/api/book/${id}`)
  }

}
