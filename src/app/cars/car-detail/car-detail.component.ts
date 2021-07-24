import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Breadcrumb, PpBreadcrumbsService } from 'pp-breadcrumbs';
import { Car } from 'src/app/model/car.model';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  car: Car;
  id: number;
  carNotFound: boolean = false;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbsService: PpBreadcrumbsService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.car = this.carService.carList[this.id];
      this.breadcrumbsService.postProcess = (breadcrumbs: Breadcrumb[]) => {
        console.log(breadcrumbs[0].path);
        if (breadcrumbs[0].path.includes('/Carlist') && this.car != null) {
            breadcrumbs.push({ text: this.car.name, path: '/' });
        }
        return breadcrumbs;
      };
    });
  }

  ngOnInit(): void {
    if (this.car == null) {
      this.carNotFound = true;
    }
  }

  backToList() {
    this.router.navigate(['/Carlist']);
  }
}
