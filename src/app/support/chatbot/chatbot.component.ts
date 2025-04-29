import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core'; // Ajout de ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef
import { io, Socket } from 'socket.io-client';

// Interface pour la structure des messages dans le tableau 'messages'
interface ChatUIMessage { // Renommé pour clarifier que c'est pour l'UI
  sender: 'user' | 'bot';
  text: string;
  options?: string[]; // Champ optionnel pour les boutons
}

// Interface pour la structure des données reçues du backend
interface BackendResponseData {
  message: string;
  options?: string[]; // Le backend envoie maintenant les options
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked { // Ajout de AfterViewChecked
  socket!: Socket;
  messages: ChatUIMessage[] = []; 
  userMessage: string = '';
  isChatOpen: boolean = false;

  readonly SERVER_URL = 'http://localhost:5000'; // Assurez-vous que c'est l'URL de votre backend Flask

  // Pour le défilement automatique
  @ViewChild('chatBox') private chatBoxContainer!: ElementRef; // Cibler le conteneur des messages
  private shouldScrollToBottom: boolean = false;

  // Injecter ChangeDetectorRef pour forcer la détection de changements si nécessaire
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Se connecter uniquement si ce n'est pas déjà fait ou si nécessaire
    if (!this.socket || !this.socket.connected) {
      this.connectSocket();
    }
  }

  connectSocket(): void {
      this.socket = io(this.SERVER_URL, {
          transports: ['websocket'], // Optionnel mais souvent recommandé
          // Ajoutez d'autres options si nécessaire (ex: reconnection, timeouts)
       });

      this.socket.on('connect', () => {
        console.log('✅ Connecté au backend du chatbot');
        
      });

      // --- MODIFIER ICI pour accepter BackendResponseData ---
      this.socket.on('receive_message', (data: BackendResponseData) => {
        console.log('Message reçu du bot:', data);
        // Utiliser la fonction helper pour ajouter le message
        this.addBotMessage(data.message, data.options);
      });
      // --- FIN MODIFICATION ---

      this.socket.on('disconnect', (reason) => {
        console.log(`❌ Déconnecté du backend du chatbot: ${reason}`);
         // Gérer la déconnexion si nécessaire (ex: tentative de reconnexion ?)
      });

       this.socket.on('connect_error', (err) => {
        console.error('Erreur de connexion Socket.IO:', err.message);
      });
  }

  // Helper pour ajouter un message utilisateur
  addUserMessage(text: string): void {
      this.messages.push({ sender: 'user', text: text });
      this.triggerScrollToBottom();
  }

  // Helper pour ajouter un message bot (avec ou sans options)
  addBotMessage(text: string, options?: string[]): void {
     this.messages.push({ sender: 'bot', text: text, options: options && options.length > 0 ? options : undefined });
     this.triggerScrollToBottom();
  }

  // Marquer pour faire défiler après la mise à jour de la vue
  triggerScrollToBottom(): void {
      this.shouldScrollToBottom = true;
      // Forcer la détection de changements pour que ngAfterViewChecked soit appelé
      this.cdRef.detectChanges();
  }

  // Faire défiler après que la vue ait été vérifiée
  ngAfterViewChecked() {
      if (this.shouldScrollToBottom) {
          this.scrollToBottom();
          this.shouldScrollToBottom = false;
      }
  }

  // Fonction de défilement
  scrollToBottom(): void {
      try {
          if (this.chatBoxContainer) {
              const element = this.chatBoxContainer.nativeElement;
              element.scrollTop = element.scrollHeight;
          }
      } catch (err) {
          console.error("Scroll to bottom error:", err);
      }
  }

  sendMessage(): void {
    const message = this.userMessage.trim();
    if (!message || !this.socket || !this.socket.connected) {
        if (!this.socket || !this.socket.connected) {
            console.warn("Socket non connecté, impossible d'envoyer le message.");
            // Optionnel : tenter une reconnexion ou afficher un message d'erreur
        }
        return;
    };

    if(message) {
      this.addUserMessage(message);
  } else if (this.messages.length === 0) {
      // Ne pas afficher de message utilisateur vide, mais déclencher l'accueil
       console.log("Sending empty message to trigger welcome");
  } else {
      return; // Ne rien faire si message vide et ce n'est pas le premier
  }
    this.socket.emit('send_message', { message: message }); // Envoie au backend
    this.userMessage = ''; // Efface le champ de saisie
    this.scrollToBottom(); // Fait défiler immédiatement pour le message utilisateur
  }

  // <<<--- AJOUTER CETTE MÉTHODE --- >>>
  onOptionClick(optionText: string): void {
    if (!this.socket || !this.socket.connected) {
        console.warn("Socket non connecté, impossible d'envoyer l'option.");
        return;
    }
    console.log("Option cliquée:", optionText);
    // 1. Afficher l'option comme si l'utilisateur l'avait tapée
    this.addUserMessage(optionText);
    // 2. Envoyer le texte de l'option au backend pour obtenir la réponse suivante
    this.socket.emit('send_message', { message: optionText });
    this.scrollToBottom(); // Fait défiler
  }
  // <<< --- FIN AJOUT MÉTHODE --- >>>

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    
    if (this.isChatOpen) {
      // Connect socket if not already connected
      if (!this.socket || !this.socket.connected) {
        this.connectSocket();
      }
      
      // Trigger welcome message if chat is empty
      if (this.messages.length === 0) {
        setTimeout(() => {
          if (this.socket && this.socket.connected) {
            console.log("Triggering welcome message on chat open");
            this.socket.emit('send_message', { message: '' });
          }
        }, 100);
   }
      
         setTimeout(() => this.scrollToBottom(), 0);
     }
  }

  ngOnDestroy(): void {
    if (this.socket) {
      console.log('Déconnexion du socket dans ngOnDestroy');
      this.socket.disconnect();
    }
  }
}