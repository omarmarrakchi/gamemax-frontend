import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class FlouciService {

    private apiUrl = 'http://localhost:8080/api/flouci'; // URL de votre backend

    constructor(private http: HttpClient) {}

    initiatePayment(amount: number): Observable<any> {
      const body = { amount: amount }; // Corps de la requête
      return this.http.post(`${this.apiUrl}/pay`, body); // Appel à l'API backend
    }
  }
