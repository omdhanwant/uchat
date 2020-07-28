import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService, private alert: AlertService, private nav: NavController, private route: ActivatedRoute) { }

  ngOnInit() {
  }


  login(form: NgForm) {
    if(form.valid){
      this.alert.loading = true;

      this.auth.login(form.value)
        .subscribe(() => {
          // show alert
          this.alert.loading = false;
          this.alert.presentAlert('Successfully Logged In!');

          // clear form
          form.reset();
          const returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') || '/'
          this.nav.navigateRoot([returnUrl]);
          // this.nav.navigateBack(['/home']);
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
