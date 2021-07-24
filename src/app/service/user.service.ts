import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseData } from 'src/app/login/auth.service';
import { environment } from 'src/environments/environment';

export class UserInfo {
  public email: string = '';
  public displayName: string = '';
  public emailVerified: boolean = false;

  constructor(email: string, displayName: string, emailVerified: boolean) {
    this.email = email;
    this.displayName = displayName;
    this.emailVerified = emailVerified;
  }
}

export interface GetUserResponse {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  emailVerified: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new BehaviorSubject<UserInfo>(null);
  userInfo: UserInfo = null;

  constructor(private http: HttpClient) {}

  getUser(idToken: string): Observable<any> {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' +
          environment.firebaseAPIKey,
        {
          idToken: idToken,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.userInfo = new UserInfo(
            resData['users'][0]['email'],
            resData['users'][0]['displayName'],
            JSON.parse(resData['users'][0]['emailVerified'])
          );
          this.user.next(this.userInfo);
        })
      );
  }

  checkPasswordMatched(password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: this.userInfo.email,
          password: password,
          returnSecureToken: false,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          return true;
        })
      );
  }

  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' +
          environment.firebaseAPIKey,
        {
          requestType: 'PASSWORD_RESET',
          email: email,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          return 'Success';
        })
      );
  }

  changePassword(idToken: string, password: string): Observable<any> {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' +
          environment.firebaseAPIKey,
        {
          idToken: idToken,
          password: password,
          returnSecureToken: false,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          return 'Success';
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'INVALID_ID_TOKEN':
        errorMessage = 'Session Time Out. Please login again.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'This email does not exist.';
        break;
      case 'EXPIRED_OOB_CODE':
        errorMessage = 'The reset password link is expired.';
        break;
      case 'INVALID_OOB_CODE':
        errorMessage = 'The reset password link is invalid.';
        break;
      case 'WEAK_PASSWORD':
        errorMessage = 'The password must be 6 characters long or more.';
        break;
    }
    return throwError(errorMessage);
  }
}
