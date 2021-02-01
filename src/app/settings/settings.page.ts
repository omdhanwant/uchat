import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage{

  constructor(public alert: AlertService, private theme: ThemeService) { }

  get currentTheme(){
    return this.theme.selectedTheme;
  }

  get currentFontSize(){
    return this.theme.selectedFontSize.replace('px', '');
  }

  presentThemes(){
    this.alert.presentThemeAlert();
  }

  presentFontSizes(){
    this.alert.presentFontSizeAlert();
  }
}
