import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }
  getData(key:string){
   return localStorage.getItem(key)
  }
}
