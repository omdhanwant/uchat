import { NgModule } from '@angular/core';
import { UchatHomePageRoutingModule } from './uchat-home-routing.module';

import { UchatHomePage } from './uchat-home.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    UchatHomePageRoutingModule
  ],
  declarations: [UchatHomePage]
})
export class UchatHomePageModule {}
