import { Component, inject, OnInit } from '@angular/core';
import { profileDetails } from '../../types/user';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Book } from '../../types/book';
import { ApiService } from '../../api.service';
import { LoginComponent } from '../login/login.component';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, SlicePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  books: Book[] = []
  profileDetails: profileDetails = {
    username: '',
    email: '',
  }

  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
  })
  constructor(private userService: UserService, private apiService: ApiService) { }


  ngOnInit(): void {
    const { username, email } = this.userService.user!
    this.profileDetails = { username, email }
    this.form.setValue({ username, email })
    this.apiService.getBooks().subscribe((books) => {
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
    this.userService.updateProfile(userId!, username!, email!).subscribe(()=>{
      
    })
  }

}
