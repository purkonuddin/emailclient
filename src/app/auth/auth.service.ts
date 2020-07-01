import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
	authenticated: boolean;
	username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string){
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, {username})
  }

  signup(credentials: SignupCredentials){
    return this.http
    .post<SignupResponse>( `${this.rootUrl}/auth/signup`, credentials )
    .pipe(
      tap(()=>{
        this.signedin$.next(true);
      })
    )
  }

  checkAuth(){
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
    .pipe(
      tap(({authenticated}) => {
        // console.log('@checkAuth',response);
        this.signedin$.next(authenticated);
      })
    )
  }

  signout(){
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
    .pipe(
      tap(()=>{
        this.signedin$.next(false);
      })
    )
  }

  signin(credentials: SigninCredentials){
    return this.http.post<SignedinResponse>(`${this.rootUrl}/auth/signin`, credentials)
    .pipe(
      tap(()=>{
        this.signedin$.next(true);
      })
    )
  }
}
