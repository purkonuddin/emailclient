import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncValidator,  FormControl } from '@angular/forms';
import { map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {

  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const { value } = control;
    return this.authService.usernameAvailable(value)
    .pipe(
      map((value)=>{
        // console.log(value);
        if(value.available){
          return null;
        }
      }),
      catchError((err)=>{
        // console.log('err...',err.status);
        if(err.message.username){
          return of({ nonUniqueUsername: true });
        }else if(err.status === 422){
          return of({ nonUniqueUsername: true });
        }else if(err.status === 0){
          return of({ unknownError: true });
        }else{
          return of({ noConnection: true });
        }
      })
    )
  }
}
