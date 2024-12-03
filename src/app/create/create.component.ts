import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';
import { LoginComponent } from '../user/login/login.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {


  constructor(private apiService: ApiService, private userService: UserService) { }

  createBook(form: NgForm) {
    if (form.invalid) {
      return
    }
    const { title, author, genre, year, description, image } = form.value
    
      this.apiService.createBook(title, author, genre, year, description, image).subscribe(() => {

      })

  }



}
