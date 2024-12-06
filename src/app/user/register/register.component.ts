import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      passGroup: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(5)]),
        rePassword: new FormControl('', [Validators.required, Validators.minLength(5)])
      })
    }
  );
  constructor(private userService: UserService, private router: Router) { }

  get passGroup() {
    return this.form.get('passGroup')
  }

  register() {
    if (this.form.invalid) {
      return
    }
    const { username, email, passGroup: { password, rePassword } = {} } = this.form.value
    
    this.userService.register(username!, email!, password!, rePassword!).subscribe(() => {

      this.router.navigate(['/catalog'])
    })


  }
}
