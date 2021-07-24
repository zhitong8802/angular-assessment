import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../login/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  faEnvelope = faEnvelope;
  errorMsg = '';
  successMsg = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;

    let authObs: Observable<AuthResponseData>;

    authObs = this.userService.sendPasswordResetEmail(username);

    authObs.subscribe(
      (resData) => {
        this.successMsg = "The reset password link has been sent to " + username;
      },
      (errorMessage) => {
        this.errorMsg = errorMessage;
      }
    );

    form.reset();
  }
}
