import { Component } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { ChatRoomService } from '../services/chatRoom.service';
import { AlertService } from '../services/alert.service';
import { NavController, ModalController } from '@ionic/angular';
import { ChatRoomModalPage } from '../modals/chat-room-modal/chat-room-modal.page';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-initiate-chat',
  templateUrl: './initiate-chat.page.html',
  styleUrls: ['./initiate-chat.page.scss'],
})
export class InitiateChatPage{
  users: User[];
  search: string;
  sortedUsers: User[];
  tags:User[] = [];
  loggedInUser: string;
  constructor(private service: UserService, 
              private nav: NavController,
              public modalController: ModalController,
              public auth: AuthService) {
    this.users = [];
    this.sortedUsers = [];
   }

 ionViewDidEnter() {
   this.loggedInUser = this.auth.getLoggedInUser().userId;
  this.service.getAllUsers()
    .subscribe(users => {
       this.users = users.filter(user => user._id != this.loggedInUser);
       this.sortedUsers = this.users;
    })
 }

 initiateChatRoom(){
   this.presentModal()
 }
 async presentModal() {
  const modal = await this.modalController.create({
    component: ChatRoomModalPage,
    cssClass: '',
    componentProps: {
      "users" : this.tags,
      "controller": this.modalController
    }
  });
  return await modal.present();
}

 // alert button handler
 handler(){
   return () => {
     this.nav.navigateBack('/home');
   }
 }

 filter() {
   if(this.search) {
     this.sortedUsers =  this.users.filter(user => {
      if(`${user.firstName.toLowerCase()}${user.lastName.toLowerCase()}`.includes( this.search.toLowerCase().trim()))
        return true;
     })
   } else {
     this.sortedUsers = this.users;
   }
 }

 selectedUser(user: User){
   if(!this.tags.find(u => u._id == user._id)) {
    this.tags.push(user)
   }

 }
}
