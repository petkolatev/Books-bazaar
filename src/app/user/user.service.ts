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

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user
    })
  }

  login(email: string, password: string) {

    return this.http.post<any>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)))

  }

  register(username: string, email: string, password: string, rePassword: string) {

    return this.http
      .post<UserForAuth>(`/api/register`, { username, email, password, rePassword })
      .pipe(tap((user) => this.user$$.next(user)))

  }

  logout() {
    localStorage.clear()
    return this.http.get('/api/logout', {})
      .pipe(tap((user) => this.user$$.next(null)))
  }
  getProfile() {
    return this.http.get<UserForAuth>('/api/profile')
      .pipe(tap((user) => this.user$$.next(user)))
  }
  updateProfile(userid: string, username: string, email: string) {
    const userData = { username, email }
    return this.http.put<UserForAuth>(`/api/profile/${userid}`, { ...userData })
  }


}
