// Dans src/app/auth/register/register.component.ts

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/login/authentification.service'; // Votre service d'authentification

// --- NOUVEAU: Importation pour le composant IA ---
// NOUVEAU: Importez votre composant IA. ASSUREZ-VOUS que le chemin d'import est correct !
// Le chemin dépend de où vous avez créé le dossier 'ai' par rapport à 'auth'
import { UsernameGeneratorComponent } from 'src/app/ai/username-generator/username-generator.component'; // Exemple de chemin basé sur votre import précédent, AJUSTEZ si nécessaire
// Si le chemin est '../components/ai/username-generator/username-generator.component', utilisez celui-là.
// Si le chemin est 'src/app/components/ai/username-generator/username-generator.component', utilisez celui-là.
// Vérifiez l'emplacement réel du fichier username-generator.component.ts


declare var grecaptcha: any; // Si vous utilisez reCAPTCHA de cette manière

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  // Vos variables existantes - AUCUNE SUPPRESSION
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  // --- NOUVEAU: Variable pour contrôler l'affichage du générateur IA ---
  showAiGenerator: boolean = false; // Initialement caché


  // Accès facile aux contrôles du formulaire
  get f() { return this.registerForm.controls; }


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService // Votre service d'authentification
    // NgbModal n'est PLUS nécessaire ici, donc pas d'injection modalService
  ) { } // Le constructeur existant reste tel quel

  ngOnInit() {
    // Votre logique d'initialisation de formulaire existante - AUCUNE MODIFICATION
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      birthday: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    // Votre logique AfterViewInit existante pour la vidéo et reCAPTCHA - AUCUNE MODIFICATION
    const video = document.getElementById('bg-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(error => {
        console.error('Error attempting to play video', error);
      });
    }
     if (typeof grecaptcha !== 'undefined') {
         // Logique reCAPTCHA ici si nécessaire
     } else {
         console.warn('reCAPTCHA script not loaded');
     }
  }

  // Votre méthode de soumission de formulaire existante - AUCUNE MODIFICATION
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = err;
          this.loading = false;
        }
      });
  }

  // Votre méthode de navigation existante - AUCUNE MODIFICATION
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Votre méthode reCAPTCHA existante (si utilisée) - AUCUNE MODIFICATION
  executeRecaptcha() {
    grecaptcha.execute();
  }

  // --- NOUVEAU: Méthodes pour gérer l'affichage du générateur IA (sans modale) ---

  /**
   * Bascule la visibilité du générateur de noms IA.
   */
  toggleAiGenerator(): void {
    this.showAiGenerator = !this.showAiGenerator;
    console.log("Générateur IA affiché:", this.showAiGenerator);
     // Optionnel: Effacer les suggestions et l'erreur lorsque vous cachez le générateur
     // Si vous voulez effacer les suggestions dans le composant enfant lorsqu'il est caché,
     // vous devrez peut-être ajouter une @Input() ou appeler une méthode de l'enfant
     // via @ViewChild, ce qui complique. Pour l'instant, on ne fait rien ici.
  }

  /**
   * Reçoit le nom d'utilisateur sélectionné depuis le composant IA
   * et le met dans le champ username du formulaire principal.
   * @param selectedUsername Le nom sélectionné.
   */
  handleUsernameSelectedFromAi(selectedUsername: string): void {
    console.log("Nom sélectionné reçu du composant IA:", selectedUsername);
    // Mettre le nom sélectionné dans le champ 'username' du formulaire principal
    const usernameControl = this.registerForm.get('username');
    if (usernameControl) {
         usernameControl.setValue(selectedUsername);
         usernameControl.markAsDirty(); // Marquer le champ comme modifié
         usernameControl.markAsTouched(); // Marquer le champ comme touché
         // NOUVEAU: Cacher le générateur après avoir sélectionné un nom
         this.showAiGenerator = false;
    } else {
        console.error("Contrôle 'username' non trouvé dans le formulaire d'inscription.");
    }
  }
  // --- Fin NOUVEAU: Méthodes pour gérer l'affichage du générateur IA ---

  // Ajoutez d'autres méthodes ou propriétés existantes ici si j'en ai manqué.

}