import { NgModule } from '@angular/core';

import { ChatRoomPageRoutingModule } from './chat-room-routing.module';
import { ChatRoomPage } from './chat-room.page';
import { SharedModule } from '../shared/shared.module';
import { ChatMessageService } from './service/chatMessage.service';

@NgModule({
  imports: [
    SharedModule,
    ChatRoomPageRoutingModule
  ],
  declarations: [ChatRoomPage],
  providers: [
    ChatMessageService
  ]
})
export class ChatRoomPageModule {}
