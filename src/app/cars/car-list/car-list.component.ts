import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/model/car.model';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit, OnDestroy {
  private carListSub: Subscription;

  carList: Car[];

  headElements = ['Name', 'Description', 'Image', 'Price Range(RM)'];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.carService.getCarList().subscribe();
    this.carListSub = this.carService.carListChanged.subscribe((carList) => {
      this.carList = carList;
    });
  }

  ngOnDestroy() {
    this.carListSub.unsubscribe();
  }
}
