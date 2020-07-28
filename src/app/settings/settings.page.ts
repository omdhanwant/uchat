import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage{

  constructor(public alert: AlertService, public theme: ThemeService) { }

  presentThemes(){
    this.alert.presentThemeAlert();
  }
}
