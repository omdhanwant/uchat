import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatRoomModalPage } from '../modals/chat-room-modal/chat-room-modal.page';
import { AlertService } from '../services/alert.service';
import { ChatRoom, ChatRoomService } from '../services/chatRoom.service';
import { ChatMessage, Conversation } from './model/ChatMessageModel';
import { ChatMessageService } from './service/chatMessage.service';
import * as util from '../utils/commons'
import { Socket } from 'ngx-socket-io';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage {
  @ViewChild('messagesContainer', {static: false}) messagesContainer: any;
  private roomId: string;
  private room: ChatRoom;
  private chatMessagesDetails: ChatMessage;
  private messages: Conversation[];
  private me: { userId: string; name: string; }
  private page = 0;
  private limit = 30;

  // actions
  inputText: string;
  chatRoomsubscription: Subscription;
  userActiveSubscription: Subscription;
  userLeftSubscription: Subscription;

  constructor(
    private modalController: ModalController, 
    private route: ActivatedRoute,
    private messageService: ChatMessageService,
    private chatRoomService: ChatRoomService,
    private alert: AlertService,
    private auth: AuthService,
    private socket: Socket ) { 
    }

    // ngAfterViewChecked(){
    //   this.scrollToBottom();
    // }

  ionViewDidEnter() {
    this.alert.loading = true;
    this.messages = [];
    this.me = this.auth.getLoggedInUser();
    
    this.roomId = this.route.snapshot.paramMap.get('id');
    
    // get conversations
    Promise.all([
      this.chatRoomService.getChatRoomById(this.roomId),
      this.messageService.getMessages(this.roomId,{ page: this.page , limit : this.limit })
    ]).then(response => {
        this.room = util.getPureObject(response[0]);
        this.chatMessagesDetails = util.getPureObject(response[1]);
        this.messages = this.chatMessagesDetails.conversation;
        this.page+=1;
        this.alert.loading = false;
        this.subscribeToRoom();
        setTimeout(() => {
          this.scrollToBottom();
        }, 1000);

    }).catch(error => {
      this.alert.loading = false;
      this.alert.presentAlert(error.error ? error.error.message : error.message);
      throw error;
    })
  }

  async presentChatRoomModal() {
    const modal = await this.modalController.create({
      component: ChatRoomModalPage,
      cssClass: '',
      componentProps: {
        "users" : this.chatMessagesDetails.users,
        "room": this.room,
        "controller": this.modalController
      }
    });
    return modal.present();
  }

  subscribeToRoom(){
    // connect socket 
    this.socket.emit('subscribe', [this.roomId, this.me]);

   this.userActiveSubscription =  this.socket.fromEvent('joined').subscribe((msg: { user: string; }) => {
      this.alert.presentToast(`${msg.user} joined the room!`)
    })

    this.userLeftSubscription =  this.socket.fromEvent('left').subscribe((msg: { user: string; }) => {
      this.alert.presentToast(`${msg.user} left the room!`)
    })

    // start listining to new messages
    this.chatRoomsubscription = this.socket.fromEvent('new message').subscribe(response => {
      this.messages.push(response['message']);
      this.scrollToBottom();
    }, error => {
      throw new Error(error.message);
    })
  }

  loadMoreMessages(event){
    // load more messages
    this.messageService.getMessages(this.roomId, { page: this.page , limit : this.limit })
      .then( (response: ChatMessage) => {

        if(!response.conversation.length) {
          event.target.disabled = true;
          return;
        }

        this.messages = [...response.conversation , ...this.messages];
        this.page+=1;
        event.target.complete();

      }).catch(error => {
        this.alert.presentAlert(error.error ? error.error.message : error.message);
        throw error;
      });
  }

  // actions
  async sendMessage(){
    if(this.inputText) {

      // get the message from input
      const message = {
        messageText: this.inputText
      }

      // push message here
      try{
        await this.messageService.postMessage(message, this.roomId);
        this.inputText = '';
      }catch(err){
        throw new Error(err.message);
      }
    }
  }

  get myId(){
    return this.me.userId;
  }

  get conversations() {
    return this.messages;
  }
  
  get roomDetail() {
    return this.room;
  }
   
  async goToRoom() {
    await this.presentChatRoomModal();
  }

  scrollToBottom(){
    // this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    // console.log(this.messagesContainer.nativeElement.scrollHeight);
    this.messagesContainer.scrollToBottom(500);
  }


  ionViewWillLeave() {
    this.socket.emit('unsubscribe', [this.roomId,this.me]);
    if( this.chatRoomsubscription ) 
      this.chatRoomsubscription.unsubscribe();
    
    if (this.userActiveSubscription )
      this.userActiveSubscription.unsubscribe();

    if (this.userLeftSubscription)
      this.userLeftSubscription.unsubscribe();
  }

}
