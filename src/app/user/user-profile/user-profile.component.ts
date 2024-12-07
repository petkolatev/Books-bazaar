import { Component, OnInit } from '@angular/core'
import { profileDetails } from '../../types/user'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserService } from '../user.service'
import { Book } from '../../types/book'
import { ApiService } from '../../api.service'
import { SlicePipe } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, SlicePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  books: Book[] = []
  isLoadingBooks = false
  isLoadingProfile = false
  profileDetails: profileDetails = {
    username: '',
    email: '',
  }

  form = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(5)]),
    email: new FormControl('',[Validators.required,Validators.email]),
  })
  constructor(private userService: UserService, private apiService: ApiService,private router:Router) { }


  ngOnInit(): void {
    const { username, email } = this.userService.user!
    this.profileDetails = { username, email }
    this.form.setValue({ username, email })
    this.isLoadingBooks = true
    this.apiService.getBooks().subscribe((books) => {
      this.isLoadingBooks = false
      books = books.filter((books) => books.owner === this.userService.user?._id)
      this.books = books
    })
  }

  updateProfile() {
    if (this.form.invalid) {
      return
    }
    const userId = this.userService.user?._id
    const { username, email } = this.form.value
    this.isLoadingProfile = true
    this.userService.updateProfile(userId!, username!, email!).subscribe((data)=>{
      this.isLoadingProfile = false
      this.profileDetails = data
      this.userService.user = data
    })
  }

}
