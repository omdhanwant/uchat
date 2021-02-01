import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import * as utils from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

interface StoredUser {
  userId:string; 
  name: string; 
  email: string; 
  type: string;
}
interface LoginResponse{
  success: boolean;
  authorization: string;
  user: {userId:string; name: string; emailId: string; type: string}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private peekAuthentication = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient){
    if(sessionStorage.getItem(utils.USER) )
      this.peekAuthentication.next(true);
  }

  peekAuth(){
   return this.peekAuthentication.asObservable();
  }

  getLoggedInUser() {
    return sessionStorage.getItem(utils.USER) ? JSON.parse(sessionStorage.getItem(utils.USER)) as StoredUser : null;
  }

  updateStoredUser(user: StoredUser){
    sessionStorage.setItem(utils.USER, JSON.stringify(user))
  }
  register(data){
    return this.http.post(`${environment.baseUrl}/users`, data);
  }

  login(cred) {
   return  this.http.post(`${environment.baseUrl}/login`, cred).pipe(
       take(1),
       map((response: LoginResponse) => {
        // store the token in session storage
        sessionStorage.setItem( utils.TOKEN, response.authorization);
        sessionStorage.setItem(utils.USER, JSON.stringify(response.user))
        this.peekAuthentication.next(true);
        return {}
      }))
     
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem(utils.TOKEN) ? true : false;
}

  public logout() {
    sessionStorage.removeItem(utils.TOKEN);
    sessionStorage.removeItem(utils.USER);
    this.peekAuthentication.next(false);
}
}
