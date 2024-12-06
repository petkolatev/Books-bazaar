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
  isOwner: boolean = true
  isLiked: boolean = true
  constructor(private apiService: ApiService, private route: ActivatedRoute, private userService: UserService) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params['bookId']
    const user = localStorage.getItem('user')
    this.apiService.getOneBook(id).subscribe((book) => {
      this.books = book
      const isOwner = JSON.stringify(user) === JSON.stringify(this.books.owner) ? true : false
      this.isOwner = isOwner
      const isLiked = this.books.likes.includes(user!) ? true : false
      this.isLiked = isLiked

    })

  }

  like() {
    const user = localStorage.getItem('user')
    const id = this.route.snapshot.params['bookId']
    this.apiService.like(id, user!).subscribe((book) => {
      this.books = book
      this.apiService.getOneBook(id).subscribe((book) => {
        this.books = book
        const isLiked = this.books.likes.includes(user!) ? true : false
        this.isLiked = isLiked
      })
    })

  }
  remove() {
    const id = this.route.snapshot.params['bookId']
    this.apiService.remove(id).subscribe(()=>{
      
    })
  }
}
