import { Component } from '@angular/core'
import { ApiService } from '../../api.service'
import { FormsModule, NgForm } from '@angular/forms'
import { UserService } from '../../user/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  constructor(private apiService: ApiService, private userService: UserService, private router: Router) { }

  createBook(form: NgForm) {
    if (form.invalid) {
      return
    }
    const { title, author, genre, year, description, image } = form.value
    const owner = this.userService.user?._id
    this.apiService.createBook(title, author, genre, year, description, image, owner!).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  }
}
