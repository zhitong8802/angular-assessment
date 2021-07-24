import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CarDetailComponent } from './cars/car-detail/car-detail.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarResolverService } from './cars/car-resolver.service';
import { CarComponent } from './cars/car.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './login/auth.guard';

import { LoginComponent } from './login/login.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const appRoutes: Routes = [
  { path: '', component: MainScreenComponent, data: { breadcrumbs: 'Home' } },
  {
    path: 'Home',
    component: MainScreenComponent,
    data: { breadcrumbs: 'Home' },
  },
  { path: 'Login', component: LoginComponent, data: { breadcrumbs: 'Login' } },
  {
    path: 'fgtpwsd',
    component: ForgetPasswordComponent,
    data: { breadcrumbs: 'Forget Password' },
  },
  {
    path: 'Profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { breadcrumbs: 'Profile' },
  },
  {
    path: 'change',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: { breadcrumbs: 'Profile / Change Password' }
  },
  {
    path: 'Carlist',
    component: CarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: CarListComponent
      },
      {
        path: ':id',
        component: CarDetailComponent,
        resolve: [CarResolverService]
      },
    ],
    data: { breadcrumbs: 'Car List' },
  },
  {
    path: 'Unauthorized',
    component: UnauthorizedComponent,
    data: { breadcrumbs: 'Unauthorized' }
  },
  {
    path: '**',
    redirectTo: "",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
