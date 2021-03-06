import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ThemeService } from './theme.service';


@Injectable()
export class AlertService {
    loading: boolean;
    constructor(
      public alertController: AlertController, 
      public toastController: ToastController,
      private theme: ThemeService){

    }

    async presentAlert(message = "An error occured",buttons: any[] = ["OK"], classes: string | string[] = 'secondary') {
        const alert = await this.alertController.create({
          cssClass: classes,
          header: 'Uchat Alert',
          subHeader: '',
          message: message,
          buttons: buttons,
          backdropDismiss: false,
          mode:'ios',
          translucent: false,
        });
    
        await alert.present();
      }

      async presentToast(message: string, color: string = "dark" ) {
        const toast = await this.toastController.create({
          message: message,
          position: 'top',
          color: color,
          duration: 3000
        });
        toast.present();
      }

      async presentThemeAlert() {
        const alert = await this.alertController.create({
          header: 'Select Theme',
          inputs: [
            {
              name: 'Default',
              type: 'radio',
              label: 'Default',
              value: 'default',
              checked: this.theme.selectedTheme == 'default',
              handler: (input) => this.themeHandler(input)
            },
    
            {
              name: 'Dark',
              type: 'radio',
              label: 'Dark',
              value: 'dark',
              checked: this.theme.selectedTheme == 'dark',
              handler: (input) => this.themeHandler(input)
            },
    
            {
              name: 'Autumn',
              type: 'radio',
              label: 'Autumn',
              value: 'autumn',
              checked: this.theme.selectedTheme == 'autumn',
              handler: (input) => this.themeHandler(input)
            },
    
            {
              name: 'Neon',
              type: 'radio',
              label: 'Neon',
              value: 'neon',
              checked: this.theme.selectedTheme == 'neon',
              handler: (input) => this.themeHandler(input)
            }
          ],
          buttons: ['OK']
        });
    
        await alert.present();
      }

      async presentFontSizeAlert() {
        const alert = await this.alertController.create({
          header: 'Select Font Size',
          inputs: [
            {
              name: 'X-Large',
              type: 'radio',
              label: 'X-Large',
              value: '16px',
              checked: this.theme.selectedFontSize == '16px',
              handler: (input) => this.fontSizeHandler(input)
            },
    
            {
              name: 'Large',
              type: 'radio',
              label: 'Large',
              value: '14px',
              checked: this.theme.selectedFontSize == '14px',
              handler: (input) => this.fontSizeHandler(input)
            },
    
            {
              name: 'Small',
              type: 'radio',
              label: 'Small',
              value: '12px',
              checked: this.theme.selectedFontSize == '12px',
              handler: (input) => this.fontSizeHandler(input)
            }
          ],
          buttons: ['OK']
        });
    
        await alert.present();
      }

      themeHandler = (input) => {
        this.theme.changeTheme(input.value);
      }

      fontSizeHandler = (input) => {
        this.theme.setCSSVariable('--fs-msg', input.value);
      }
}