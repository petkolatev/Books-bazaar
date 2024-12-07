import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './core/header/header.component'
import { FooterComponent } from './core/footer/footer.component'
import { UserService } from './user/user.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'books-bazar'

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadLocalUserIfAny()
  }
}