import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { ApiService } from '../../api.service';
import { UserService } from '../user.service';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-user-likes-page',
  standalone: true,
  imports: [RouterLink,SlicePipe],
  templateUrl: './user-likes-page.component.html',
  styleUrl: './user-likes-page.component.css'
})
export class UserLikesPageComponent implements OnInit {

  books: Book[] = []
  isLoadingBooks:boolean = true

  constructor(private apiService:ApiService,private userService:UserService){}
  ngOnInit(): void {
    const userId = this.userService.user?._id
    this.apiService.getBooks().subscribe((books) => {
      books = books.filter((books) => books.likes.includes(this.userService.user!._id))
      this.books = books
    })
    this.isLoadingBooks = false
  }
}
