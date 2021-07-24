import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { UserInfo, UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime: Date = null;
  isLogin: boolean = false;
  user: UserInfo = null;

  private isLoginSub: Subscription;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.currentTime == null) {
      setInterval(() => {
        this.currentTime = new Date();
      }, 1);
    }

    this.isLoginSub = this.authService.isLogin.subscribe(
      (isLogin) => (this.isLogin = isLogin)
    );

    this.userSub = this.userService.user.subscribe((user) => {
        this.user = user;
    });
  }

  signout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.isLoginSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
