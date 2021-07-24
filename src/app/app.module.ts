import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SideBarMenuComponent } from './side-bar-menu/side-bar-menu.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { PpBreadcrumbsModule } from 'pp-breadcrumbs';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarDetailComponent } from './cars/car-detail/car-detail.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CarComponent } from './cars/car.component';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    SideBarMenuComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    ChangePasswordComponent,
    CarListComponent,
    CarDetailComponent,
    UnauthorizedComponent,
    ForgetPasswordComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PpBreadcrumbsModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
