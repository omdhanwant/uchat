import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { UserService, User } from '../services/user.service';
import { take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { VALIDATION_ALERT_MSG } from 'src/app/utils/constants'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage{
  imageUrl: string = '';
  firstName: string = '';
  lastName: string = '';
  type: string;
  emailId: string;
  userId: string;
  constructor(private auth: AuthService, private alert: AlertService, 
    private service: UserService, private nav: NavController) { }

 ionViewWillEnter(){
   const user = this.auth.getLoggedInUser();
  if(user) {
    this.firstName = user.name.split(' ')[0];
    this.lastName = user.name.split(' ')[1];
    this.type = user.type;
    this.emailId = user.email;
    this.userId = user.userId;
  }
 }

 save(){
  if(!this.firstName || !this.lastName) {
    this.alert.presentAlert(VALIDATION_ALERT_MSG);
    return
  }

  this.updateUser();
 }

 logout(){
   this.auth.logout();
 }

 updateUser() {
  this.alert.loading = true;
      const user = {
        _id: this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        image:this.imageUrl,
        type: this.type,
        emailId: this.emailId
      }
      this.service.updateUser(user)
      .pipe(take(1))
      .subscribe((response) => {
        const user: User = response['user']
        this.alert.loading = false;
        this.auth.updateStoredUser({
          name: `${user.firstName} ${user.lastName}`,
          email: user.emailId,
          type: user.type,
          userId: user._id
        })
        this.alert.presentAlert('User is updated!', [{
          text: 'OK',
          handler: () => {
            this.nav.navigateBack('/home')
          }
        }])
      } , error => {
        this.alert.loading = false;
        this.alert.presentAlert(error.error ? error.error.message : error.message);
        throw error;
      })
}

}
