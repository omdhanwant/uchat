import { NgModule } from '@angular/core';

import { InitiateChatPageRoutingModule } from './initiate-chat-routing.module';

import { InitiateChatPage } from './initiate-chat.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    InitiateChatPageRoutingModule
  ],
  declarations: [
    InitiateChatPage
]
})
export class InitiateChatPageModule {}
