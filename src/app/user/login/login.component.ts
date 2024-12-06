import { Component, inject, input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailDirective } from '../../directives/email.directive';
import { emailValidator } from '../../utils/email.validator';
import { ErrorMsgService } from '../../core/error-msg/error-msg.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginInProgress = false
  error = inject(ErrorMsgService)

  constructor(private userService: UserService, private router: Router) { }
  form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })

  isFiledTextMissing(controlName: string) {
    return (
      (this.form.get(controlName)?.touched &&
        (this.form.get(controlName)?.errors?.['required']))
    )
  }


  get isNotMinLength() {
    return (
      (this.form.get('username')?.touched &&
        (this.form.get('username')?.errors?.['minlength']))
    )
  }
  get isEmailNotValid() {
    return (
      (this.form.get('email')?.touched &&
        (this.form.get('email')?.errors?.['emailValidator']))
    )
  }
  login() {

    if (this.form.invalid) {
      return
    }
    this.loginInProgress = true
    const { email,password } =this.form.value

    this.userService.login(email!, password!).subscribe((data) => {
      this.userService.user = data.user
      this.loginInProgress = false
      this.router.navigate(['/catalog'])
    })
  }
  
}
