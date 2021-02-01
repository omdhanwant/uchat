import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  TOKEN: string = null;
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.TOKEN = sessionStorage.getItem('TOKEN')
    
    if(this.TOKEN) {
      const authReq = req.clone({

        setHeaders: {
          Authorization : `Bearer ${this.TOKEN}`,
          Accept: 'application/json'
        }
      });  
      
      return next.handle(authReq);

    } else {
      return next.handle(req);
    }

  }

}
