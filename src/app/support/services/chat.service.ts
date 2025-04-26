
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket = io('http://localhost:5000'); 

  sendMessage(message: string) {
    this.socket.emit('send_message', { message });
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receive_message', data => {
        observer.next(data.message);
      });
    });
  }
}
