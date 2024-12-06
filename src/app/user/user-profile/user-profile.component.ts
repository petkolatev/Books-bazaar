import { Component, OnInit } from '@angular/core';
import { profileDetails } from '../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  profileDetails: profileDetails = {
    username: '',
    email: '',
  }

  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
  })
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const { username, email } = this.userService.user!
    this.profileDetails = { username, email }
    this.form.setValue({ username, email })
  }
}
