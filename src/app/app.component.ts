import { Component, OnInit } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeService } from './services/theme.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  color: string = 'default';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public theme: ThemeService,
    public alert: AlertService,
    private auth: AuthService,
    private nav: NavController,
    private route: ActivatedRoute,
    private socket: Socket
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    // start socket connetion
    this.socket.connect();

    this.auth.peekAuth()
    .subscribe(auth => {
      if(!auth) {
        this.nav.navigateForward('/login')
      } else{

        if(this.route.snapshot.queryParams.hasOwnProperty('returnUrl')) {
          this.nav.navigateForward([this.route.snapshot.queryParams.returnUrl]);
        }

        const user = this.auth.getLoggedInUser();
        this.socket.emit('identity',user.userId);
      } 
      
      // else {
      //   this.nav.navigateForward(['/'])
      // }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }
}
