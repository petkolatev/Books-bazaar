import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService {
  private apiErorror$$ = new BehaviorSubject(null)
  public apiError$ = this.apiErorror$$.asObservable()

  constructor() { }
  setErrors(err: any): void {
    this.apiErorror$$.next(err.error)
  }
}
