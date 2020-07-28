import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatRoomModalPage } from './chat-room-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ChatRoomModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoomModalPageRoutingModule {}
