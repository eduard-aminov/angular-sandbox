import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  private store: BehaviorSubject<any> = new BehaviorSubject({
    name: 1,
    age: 23
  });
  public store$: Observable<any> = this.store.asObservable();

  set(value: number): void {
    this.store.next(value);
  }
}
