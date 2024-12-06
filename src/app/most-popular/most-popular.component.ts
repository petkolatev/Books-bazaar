import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SlicePipe } from '@angular/common';
import { Book } from '../types/book';

@Component({
  selector: 'app-most-popular',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.css'
})
export class MostPopularComponent implements OnInit {
  books: Book[] = []

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.getBooks().subscribe((books) => {
      books = books.sort((a, b) => b.likes.length - a.likes.length).slice(0, 3)
      this.books = books
    })
  }
}
