import { Component, OnInit } from '@angular/core';
import { ChatRoomService, ChatRoom } from '../services/chatRoom.service';
import { User, UserService } from '../services/user.service';
import { switchMap, take } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { ModalController, NavController } from '@ionic/angular';
import { ChatRoomModalPage } from '../modals/chat-room-modal/chat-room-modal.page';

@Component({
  selector: 'app-uchat-home',
  templateUrl: './uchat-home.page.html',
  styleUrls: ['./uchat-home.page.scss'],
})
export class UchatHomePage {
  chatRooms: ChatRoom[]
  usersMap: Map<string, User>;
  userInfo: any;
  constructor(public service: ChatRoomService, 
      private userService: UserService, 
      public alert: AlertService, 
      private auth: AuthService,
      public modalController: ModalController,
      private nav: NavController) {  
  }
  initData() {
    this.chatRooms = [];
    this.usersMap = new Map();
  }
 
  ionViewDidEnter(withRefresh  = null){
    this.userInfo = this.auth.getLoggedInUser();
    this.initData();
    this.alert.loading = true;
    this.userService.getAllUsers()
    .pipe(
      take(1),
      switchMap(users => {
        // create user map
        users.forEach(user => {
          this.usersMap.set(user._id, user);
        })
        return this.service.getChatRoomsOfUser();
      })
    ).pipe(take(1)).subscribe(rooms => {
      console.log(rooms);
      this.alert.loading = false;
        this.chatRooms = JSON.parse(JSON.stringify(rooms));
        this.chatRooms.forEach(room => {
           room['users'] = room.userIds.map(id => this.usersMap.get(id));
           room['userStrings'] = room.userIds.map(id => this.usersMap.get(id).firstName).join(',')
        });

        if(withRefresh) {
          withRefresh.target.complete();
        }
        
      }, error => {
        this.alert.loading = false;
        this.alert.presentAlert(error.error ? error.error.message : error.message);
        throw error;
      })
  }

  // async presentModal(room: ChatRoom) {
  //   const modal = await this.modalController.create({
  //     component: ChatRoomModalPage,
  //     cssClass: '',
  //     componentProps: {
  //       "users" : room['users'],
  //       "room": room,
  //       "controller": this.modalController
  //     }
  //   });
  //   return modal.present();
  // }
  
   
  async goToRoom(room: ChatRoom) {
    // await this.presentModal(room)
    this.nav.navigateForward(['/chat-room', room._id]);
  }

  doRefresh(event) {
    this.service.refreshChatRooms();
    this.ionViewDidEnter(event);
  }
}
