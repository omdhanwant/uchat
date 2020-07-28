import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ThemeService } from './theme.service';


@Injectable()
export class AlertService {
    loading: boolean;
    constructor(public alertController: AlertController, private theme: ThemeService){

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

      async presentThemeAlert() {
        const alert = await this.alertController.create({
          header: 'Select Theme',
          inputs: [
            {
              name: 'Default',
              type: 'radio',
              label: 'Default',
              value: 'default',
              handler: (input) => this.themeHandler(input)
            },
    
            {
              name: 'Dark',
              type: 'radio',
              label: 'Dark',
              value: 'dark',
              handler: (input) => this.themeHandler(input)
            },
    
            {
              name: 'Autumn',
              type: 'radio',
              label: 'Autumn',
              value: 'autumn',
              handler: (input) => this.themeHandler(input)
            },
    
            {
              name: 'Neon',
              type: 'radio',
              label: 'Neon',
              value: 'neon',
              handler: (input) => this.themeHandler(input)
            }
          ],
          buttons: ['OK']
        });
    
        await alert.present();
      }

      themeHandler = (input) => {
        this.theme.changeTheme(input.value)
      }
}