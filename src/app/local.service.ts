import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }
  saveData(user:{}) {

  }

  getData(key: string) {
    return localStorage.getItem(key)
  }
}
