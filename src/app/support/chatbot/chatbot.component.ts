import { Component, OnInit, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  socket!: Socket;
  messages: Message[] = [];
  userMessage: string = '';
  isChatOpen: boolean = false;

  readonly SERVER_URL = 'http://localhost:5000'; // Update this if needed

  ngOnInit(): void {
    this.socket = io(this.SERVER_URL, { transports: ['websocket'] });

    this.socket.on('connect', () => {
      console.log('✅ Connected to chatbot backend');
    });

    this.socket.on('receive_message', (data: { message: string }) => {
      this.messages.push({ sender: 'bot', text: data.message });
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from chatbot backend');
    });
  }

  sendMessage(): void {
    const message = this.userMessage.trim();
    if (!message) return;

    this.messages.push({ sender: 'user', text: message });
    this.socket.emit('send_message', { message });
    this.userMessage = '';
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
