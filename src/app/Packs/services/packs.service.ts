import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pack } from '../models/pack';
import {environment} from "../../environments/environment"; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class PacksService {
  private apiUrl = `${environment.apiUrl}/packs/allPacks`;

  constructor(private http: HttpClient) {}

  getAllPacks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(packs => packs)
    );
  }
}
