import { Component, OnInit } from '@angular/core';
import { Book } from '../../types/book';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-single-book',
  standalone: true,
  imports: [],
  templateUrl: './single-book.component.html',
  styleUrl: './single-book.component.css'
})
export class SingleBookComponent implements OnInit {

  book = {} as Book
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
      this.book = book
      const isOwner = JSON.stringify(user) === JSON.stringify(this.book.owner) ? true : false
      this.isOwner = isOwner
      const isLiked = this.book.likes.includes(user!) ? true : false
      this.isLiked = isLiked

    })

  }

  like() {
    const userId = this.userService.user?._id
    const bookId = this.route.snapshot.params['bookId']
    this.apiService.like(bookId, this.book, userId!).subscribe((book) => {
      this.book = book
      this.apiService.getOneBook(bookId).subscribe((book) => {
        this.book = book
        const isLiked = this.book.likes.includes(userId!) ? true : false
        this.isLiked = isLiked
      })
    })

  }
  remove() {
    const id = this.route.snapshot.params['bookId']
    this.apiService.remove(id).subscribe(() => {

    })
  }
}
