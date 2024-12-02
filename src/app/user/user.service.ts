import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private user$$ = new BehaviorSubject<UserForAuth | null>(null)
  private user$ = this.user$$.asObservable()

  USER_KEY = '[user]'
  user: UserForAuth | null = null

  get isLogged(): boolean {
    return !!this.user
  }
  get isOwner(): boolean {
    const owner = true
    return owner
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user
    })
  }

  login() {


  }
  
  register(username: string, email: string, password: string, rePassword: string) {
    
    return this.http
      .post<UserForAuth>(`/api/register`, { username, email, password, rePassword })
      .pipe(tap((user) => this.user$$.next(user)))

  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.USER_KEY)
  }

}
