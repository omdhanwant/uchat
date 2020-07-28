import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UchatHomePage } from './uchat-home.page';

const routes: Routes = [
  {
    path: '',
    component: UchatHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UchatHomePageRoutingModule {}
