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
      username: new FormControl('', Validators.required,),
      email: new FormControl('', Validators.required),
      passGroup: new FormGroup({
        password: new FormControl('',Validators.required,),
        rePassword: new FormControl('', Validators.required)
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
    console.log(this.form.value);
    this.userService.register(username!, email!, password!, rePassword!).subscribe(()=>{
      console.log('its register');
      
      this.router.navigate(['/catalog'])
    })


  }
}
