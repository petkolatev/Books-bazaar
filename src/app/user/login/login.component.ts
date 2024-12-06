import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginInProgress = false

  constructor(private userService: UserService, private router: Router) { }

  login(form: NgForm) {
    if (form.invalid) {
      console.error('Invalid form');
      return
    }
    this.loginInProgress = true
    const { email, password } = form.value
  
    this.userService.login(email, password).subscribe((data) => {
      this.userService.user = data.user
      this.loginInProgress = false
      this.router.navigate(['/catalog'])
    })
  };
}
