import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.css'],
})
export class SideBarMenuComponent implements OnInit {
  currentRoute: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.data['breadcrumbs'];
  }
}
