import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { NetworkService } from "../../services/network.service";
import { ChatMessage } from '../model/ChatMessageModel';

@Injectable()
export class ChatMessageService extends NetworkService{

    // get conversations
    getMessages(roomId: string, options = { page: 0 , limit: 10 }) {
        return this.get(`${environment.baseUrl}/room/${roomId}/conversations`, 
        {
            params: options
        })
        .pipe(map((response: ChatMessage) => {
            return response
        }))
        .toPromise();
    }

    postMessage(message: {messageText: string }, roomId: string ){
        return this.post(`${environment.baseUrl}/room/${roomId}/message`, message).toPromise();
    }
}