import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  constructor(private apiService: ApiService) { }

  createBook(form: NgForm) {
    if (form.invalid) {
      return
    }
    const { title, author, genre, year, description, image } = form.value

    this.apiService.createBook(title, author, genre, year, description, image).subscribe((data)=>{
      console.log(data);
      
    })

  }

}
