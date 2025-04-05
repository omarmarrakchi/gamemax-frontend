import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/login/authentification.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }
}