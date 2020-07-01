import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
	  next: HttpHandler
  ): Observable<HttpEvent<any>>{
    // console.log(req);
    const modifiedReq = req.clone({
      withCredentials: true
    })
    return next.handle(modifiedReq)
    .pipe(
      tap(val => {
      if(val.type === HttpEventType.Sent){
        console.log('request was sent to server')
      }

      if(val.type === HttpEventType.Response){
        console.log('Got a response from the API', val)
      }
      })
    )
  }
}
