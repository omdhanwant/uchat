import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/services/user.service';
import { ChatRoomService, ChatRoom } from 'src/app/services/chatRoom.service';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { convertBufferToImageUrl } from 'src/app/utils/commons';

@Component({
  selector: 'app-chat-room-modal',
  templateUrl: './chat-room-modal.page.html',
  styleUrls: ['./chat-room-modal.page.scss'],
})
export class ChatRoomModalPage {
  @Input() users: User[];
  @Input() room?: ChatRoom;
  @Input() controller: ModalController;
  name: string;
  imageUrl: string = '';
  blobImage: Blob;
  isEditMode: boolean = false;
  saveButtonName: string = ''
  constructor(public service: ChatRoomService, private alert: AlertService,private nav: NavController,) { }

  ionViewWillEnter(){
    if(this.room){
      this.isEditMode = true;
      this.name = this.room.name;
      this.imageUrl = this.room.image
      window.open(this.imageUrl);
      this.saveButtonName = 'Update'
    } else {
      this.saveButtonName = 'Create'
    }
  }

  dismissModal(){
    this.controller.dismiss();
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if(file) {
      this.service.uploadImage(file)
      .then((response) => response.json())
      .then(data => {
        const encode_image = data['image']['data'];
        // this.blobImage = new Blob([new Uint8Array(encode_image)], {type : 'image/*'});
        this.imageUrl = convertBufferToImageUrl(encode_image) //window.URL.createObjectURL(this.blobImage);
      }).catch(error => {
          throw error;
      })
    }
  }

  save() {
    if(this.isEditMode) {
      this.updateRoom();
    } else {
      this.createRoom();
    }
  }

  createRoom(){
      
        this.alert.loading = true;
        const data = {
          userIds: this.users.map(u => u._id),
          name: this.name ? this.name: '',
          image: this.imageUrl, // blob url string
          type: 'consumer-to-consumer'
        }

        // console.log(data);
        this.service.createChatRoom(data)
        .pipe(take(1))
        .subscribe(response => {
          this.alert.loading = false;
          this.alert.presentAlert('Chat Room is ready!', [{
            text: 'Go to chat rooms',
            handler: this.handler()
          }])
        } , error => {
          this.alert.loading = false;
          this.alert.presentAlert(error.error ? error.error.message : error.message);
          throw error;
        })
  }

  updateRoom() {
    this.alert.loading = true;
        this.room.name = this.name;
        this.room.image = this.imageUrl;
        this.service.updateChatRoom(this.room)
        .pipe(take(1))
        .subscribe(response => {
          this.alert.loading = false;
          this.alert.presentAlert('Chat Room is updated!', [{
            text: 'Go to chat rooms',
            handler: this.handler()
          }])
        } , error => {
          this.alert.loading = false;
          this.alert.presentAlert(error.error ? error.error.message : error.message);
          throw error;
        })
  }

   // alert button handler
 handler(){
  return () => {
    this.dismissModal();
    this.nav.navigateBack('/home');
  }
}

}
