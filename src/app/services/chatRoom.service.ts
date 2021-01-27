import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

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

    private chatRoomsOfUser$ = new BehaviorSubject<ChatRoom[]>(null);

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
        if(this.chatRoomsOfUser$.value){
            return this.chatRoomsOfUser$.asObservable();
        }
        return this.get(`${environment.baseUrl}/room`)
        .pipe( map((response: ChatRoom[]) => {
            this.chatRoomsOfUser$.next(response['rooms']);
            return response['rooms'];
        }));
    }

    getChatRoomById(roomId){
        return this.get(`${environment.baseUrl}/room/${roomId}`)
        .pipe( map((response: ChatRoom) => {
            return <ChatRoom>response['room'];
        })).toPromise();
    }

    refreshChatRooms() {
        this.chatRoomsOfUser$.next(null);
    }
}