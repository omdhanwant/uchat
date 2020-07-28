import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export interface ChatRoom {
        userIds: string[];
        _id: string;
        name: string;
        image: string;
        type: string;
        chatInitiator: string;
        createdAt: string;
        updatedAt: string;
}

@Injectable()

export class ChatRoomService extends NetworkService{

    private chatRoomsOfUsers$ = new BehaviorSubject<ChatRoom[]>(null);

    // {
    //     "userIds": ["081f1d7bd6b54d03a1402a57d999a6b5"],
    //     "type": "consumer-to-consumer"
    // }
    createChatRoom(data) {
        return this.post(`${environment.baseUrl}/room/initiate`, data)
    }

    updateChatRoom(data: ChatRoom) {
        return this.put(`${environment.baseUrl}/room/${data._id}`, data)
    }

    // get all rooms of user
    getChatRoomsOfUser() {
        if(this.chatRoomsOfUsers$.value){
            return this.chatRoomsOfUsers$.asObservable();
        }
        return this.get(`${environment.baseUrl}/room`)
        .pipe( map((response: ChatRoom[]) => {
            this.chatRoomsOfUsers$.next(response['rooms']);
            return response['rooms'];
        }));
    }

    refreshChatRooms() {
        this.chatRoomsOfUsers$.next(null);
    }
}