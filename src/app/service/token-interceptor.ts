import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import {
  Component,
  Input,
  OnDestroy,
  Inject,
  Injectable,
  ViewEncapsulation
} from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })
export class TokenInterceptor implements HttpInterceptor {
  data: any;
  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
    
        }
      });
    }


    
    return next.handle(request).pipe(tap((result) => {
      if (result instanceof HttpResponse) {
        if (result.body.status == 401 && (result.body.message == 'unauthorized' || result.body.exceptionMessage == 'unauthorized')) {
          this.router.navigate(['']);
        }
      }
      if (result instanceof HttpErrorResponse) {
        if (result.error.status == 401 && (result.error.message == 'unauthorized' || result.error.exceptionMessage == 'unauthorized')) {
          this.router.navigate(['']);
        }
      }
    }, (error) => {
      if (error.error.status == 401 && (error.error.message == 'unauthorized' || error.error.exceptionMessage == 'unauthorized')) {
        this.router.navigate(['']);
      }else{
        // alert(error.error.message);
      }
    }));

  }
}

