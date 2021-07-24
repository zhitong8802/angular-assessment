import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Breadcrumb, PpBreadcrumbsService } from 'pp-breadcrumbs';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  private idToken: string = null;

  errorMsg = '';
  successMsg = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private breadcrumbsService: PpBreadcrumbsService
  ) {
    // this.breadcrumbsService.postProcess = (breadcrumbs: Breadcrumb[]) => {
    //   console.log(breadcrumbs[0].path);
    //   if (breadcrumbs[0].path === '/change') {
    //     breadcrumbs.push({ text: 'Change Password', path: '/' });
    //   }
    //   return breadcrumbs;
    // };
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user) => (this.idToken = user.token)
    );
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const currentPassword = form.value.currentPassword;
    const newpassword = form.value.newPassword;

    this.userService.checkPasswordMatched(currentPassword).subscribe(
      (resData) => {
        this.userService.changePassword(this.idToken, newpassword).subscribe(
          (resData) => {
            this.successMsg = 'The new password has been set up.';
          },
          (errorData) => {
            this.errorMsg = errorData;
          }
        );
      },
      (errorData) => {
        this.errorMsg = errorData;
      }
    );

    form.reset();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
