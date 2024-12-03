import { Component, OnInit } from '@angular/core';
import { Book } from '../types/book';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-single-book',
  standalone: true,
  imports: [],
  templateUrl: './single-book.component.html',
  styleUrl: './single-book.component.css'
})
export class SingleBookComponent implements OnInit {

  books = {} as Book

  constructor(private apiService: ApiService, private route: ActivatedRoute, private userService: UserService) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged
  }
  get isOwner(): boolean {
    return this.userService.isOwner
  }

  ngOnInit(): void {
    
    const id = this.route.snapshot.params['bookId']
    
    this.apiService.getOneBook(id).subscribe((book) => {
      this.books = book
      
      console.log(book);

    })
  }
}
