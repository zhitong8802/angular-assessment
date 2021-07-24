import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Car } from '../model/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  carList: Car[] = [];
  carListChanged = new BehaviorSubject<Car[]>(null);

  constructor(private http: HttpClient) {}

  getCarList() {
    return this.http
      .get<Car[]>(
        'https://angular-test-34c80-default-rtdb.firebaseio.com/cars.json'
      )
      .pipe(
        tap((cars) => {
          this.carList = cars;
          this.carListChanged.next(cars);
        })
      );
  }
}
