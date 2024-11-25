import { Injectable } from '@angular/core';
import { Task } from './types/task';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getTasks() {
    const { apiUrl } = environment
    return this.http.get<Task[]>(`${apiUrl}/tasks`)
  }
}
