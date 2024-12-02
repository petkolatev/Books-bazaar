import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

  login(email: string, password: string) {

    return this.http.post<UserForAuth>('/api/login', { email, password })
    .pipe(tap((user) => this.user$$.next(user)))

  }

  register(username: string, email: string, password: string, rePassword: string) {

    return this.http
      .post<UserForAuth>(`/api/register`, { username, email, password, rePassword })
      .pipe(tap((user) => this.user$$.next(user)))

  }

  logout() {
    return this.http.get('/api/logout', {})
      .pipe(tap((user) => this.user$$.next(null)))
  }

}
