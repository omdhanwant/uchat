import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatRoomModalPageRoutingModule } from './chat-room-modal-routing.module';

import { ChatRoomModalPage } from './chat-room-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatRoomModalPageRoutingModule
  ],
  declarations: [ChatRoomModalPage]
})
export class ChatRoomModalPageModule {}
