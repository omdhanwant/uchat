import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private auth: AuthService, private alert: AlertService, private nav: NavController) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    if(form.valid){
      this.alert.loading = true;

      this.auth.register(form.value)
        .subscribe(response => {
          // show alert
          this.alert.loading = false;
          this.alert.presentAlert('Successfully Registered!');

          // clear form
          form.reset();
          this.nav.navigateForward(['/login']);
        }, error => {
          this.alert.loading = false;
          this.alert.presentAlert(error.error ? error.error.message : error.message);
          throw error;
        })
    } else {
      // show alert
      this.alert.loading = false;
      this.alert.presentAlert('Enter the required fields!');
    }
  }
}
