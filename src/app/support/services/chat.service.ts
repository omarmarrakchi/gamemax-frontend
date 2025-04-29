import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interface pour la structure des messages reçus
export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  options?: string[];
  timestamp: Date;
}

// Interface pour la structure brute reçue du backend
interface BackendMessage {
  message: string;
  options?: string[];
}


@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private socket: Socket) { }

  sendMessage(message: string): void {
    this.socket.emit('send_message', { message: message });
  }

  receiveMessages(): Observable<ChatMessage> {
    // Solution Alternative: Pas de générique sur fromEvent, caster après
    return (this.socket.fromEvent('receive_message') as Observable<any>) // <<<--- PAS de <any> ici, mais cast en Observable<any>
      .pipe(
        map((data: any) => { // Accepter 'any' ici car on a casté avant
          // Vérification pour la robustesse
          if (!data || typeof data.message === 'undefined') {
            console.error("Received invalid data structure from socket:", data);
            return { sender: 'bot', text: '[Error receiving message]', options: [], timestamp: new Date() };
          }
          // Mapper vers ChatMessage
          return {
            sender: 'bot',
            text: data.message,
            options: data.options || [], // Assurer que options est un tableau
            timestamp: new Date()
          };
        })
      );
  }

  connect(): void {
    this.socket.connect();
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}