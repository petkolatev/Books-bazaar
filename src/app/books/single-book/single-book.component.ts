import { Component, OnInit } from '@angular/core'
import { Book, EditBook } from '../../types/book'
import { ApiService } from '../../api.service'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../user/user.service'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-single-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './single-book.component.html',
  styleUrl: './single-book.component.css'
})
export class SingleBookComponent implements OnInit {
  book: Book | undefined = undefined
  isOwner: boolean = true
  isLiked: boolean = true
  isInEditMode: boolean = false
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  get isLoggedIn(): boolean {
    return this.userService.isLogged
  }

  bookDetails: EditBook = {
    title: '',
    author: '',
    genre: '',
    year: '',
    description: '',
    image: '',
  }
  form = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    genre: new FormControl(''),
    year: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
  })

  ngOnInit(): void {
    const id = this.route.snapshot.params['bookId']
    const user = this.userService.user?._id
    this.apiService.getOneBook(id).subscribe((book) => {
      this.book = book
      const isOwner = JSON.stringify(user) === JSON.stringify(this.book.owner)
      this.isOwner = isOwner
      const isLiked = this.book.likes.includes(user!)
      this.isLiked = isLiked

      const { title, author, genre, year, description, image } = this.book
      this.bookDetails = { title, author, genre, year, description, image }
      this.form.setValue({ title, author, genre, year, description, image })

    })

  }

  like() {
    const userId = this.userService.user?._id
    const bookId = this.route.snapshot.params['bookId']
    if (this.book)
      this.apiService.like(bookId, this.book, userId!).subscribe((book) => {
        this.book = book
        this.apiService.getOneBook(bookId).subscribe((book) => {
          this.book = book
          const isLiked = this.book.likes.includes(userId!)
          this.isLiked = isLiked
        })
      })
  }
  remove() {
    const id = this.route.snapshot.params['bookId']
    this.apiService.remove(id).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  }

  toggleEditBook() {
    this.isInEditMode = !this.isInEditMode
  }

  saveBook() {
    if (this.form.invalid) {
      return
    }
    const bookId = this.route.snapshot.params['bookId']
    this.bookDetails = this.form.value as EditBook
    const { title, author, genre, year, description, image } = this.bookDetails
    this.apiService.editBook(title, author, genre, year, description, image,bookId).subscribe((book) => {
      this.book = book
      this.toggleEditBook()
    })
  }

}
