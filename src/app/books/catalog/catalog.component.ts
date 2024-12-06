import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Book } from '../../types/book';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, SlicePipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  books: Book[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe((books) => {
      this.books = books

    })
  }
}
