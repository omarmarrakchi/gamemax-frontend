// Dans src/app/services/ai/ai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface UsernameDescriptionRequest {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private backendUrl = 'http://localhost:8091/api/ai';

  constructor(private http: HttpClient) { }

  // Changez le type de retour à Observable<string> (une seule chaîne de texte)
  generateUsernames(description: string): Observable<string> {
    const requestBody: UsernameDescriptionRequest = { description: description };

    // Changez le type attendu dans .post à <string> et spécifiez le header Accept
    return this.http.post(`${this.backendUrl}/generate-usernames`, requestBody, { responseType: 'text' }) // Attendre du texte brut
      .pipe(
        tap(response => {
            console.log("AiService - Réponse 200 OK reçue du backend (texte brut):", response);
        }),
      
        
      );
  }

  suggestSimilarUsernames(existingUsername: string): Observable<string[]> {
    const requestBody: UsernameDescriptionRequest = { description: existingUsername };
  
    return this.http.post<string[]>(`${this.backendUrl}/suggest-similar-username`, requestBody)
      .pipe(
        tap(response => {
            console.log("AiService - Réponse 200 OK reçue du backend (suggestions similaires):", response);
        }),
        
      );
  }
  

  
}