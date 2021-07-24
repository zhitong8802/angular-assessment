import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Car } from '../model/car.model';
import { CarService } from '../service/car.service';

@Injectable({ providedIn: 'root' })
export class CarResolverService implements Resolve<Car[]> {
  constructor(
    private carService: CarService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const carList = this.carService.carList;

    if (carList.length === 0) {
      return this.carService.getCarList();
    } else {
      return carList;
    }
  }
}
