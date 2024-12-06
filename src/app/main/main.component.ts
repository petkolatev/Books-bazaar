import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { MostPopularComponent } from '../most-popular/most-popular.component';
import { CatalogComponent } from '../books/catalog/catalog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MostPopularComponent, CatalogComponent, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  get isLoggedIn(): boolean {

    return this.userService.isLogged
  }
  constructor(private userService: UserService) { }
}
