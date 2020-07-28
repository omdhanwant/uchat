import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    type: string;
    image: string;
    emailId: string;
    createdAt: string;
    updatedAt: string;
}

@Injectable()

export class UserService extends NetworkService{

private $users  = new BehaviorSubject<User[]>(null);
    // {
    //     "userIds": ["081f1d7bd6b54d03a1402a57d999a6b5"],
    //     "type": "consumer-to-consumer"
    // }
    getAllUsers(): Observable<User[]> {
        if(this.$users.value){
            return this.$users.asObservable();
        }
        return this.get(`${environment.baseUrl}/users`)
        .pipe(map( response => {
            const users = response['users']; //.filter(user => user._id != this.auth.getLoggedInUser().userId);
            this.$users.next(users);
            return users as User[];
        }));
    }

    updateUser(user) {
        return this.put(`${environment.baseUrl}/users/${user._id}`, user)
    }
}