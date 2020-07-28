import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitiateChatPage } from './initiate-chat.page';

const routes: Routes = [
  {
    path: '',
    component: InitiateChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitiateChatPageRoutingModule {}
