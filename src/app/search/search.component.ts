import { Component, OnInit } from '@angular/core';
import { Book } from '../types/book';
import { ApiService } from '../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule,SlicePipe,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResults: Book[] = []

  constructor(private apiService: ApiService) { }

  search(form: NgForm) {
    const { searchText } = form.value
    if (searchText.length > 2) {
      const url =`?title=${searchText}`
      this.apiService.getBooks(url).subscribe((book) => {
        this.searchResults = book
      })

    }else{
     const disabled = true
    }


  }

  searchProduct() {

  }


}
