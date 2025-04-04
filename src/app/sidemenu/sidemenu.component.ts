import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/login/authentification.service';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  currentUser: any;
  selectedFile: File | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private http: HttpClient
  ) {
    this.authenticationService.currentUser.subscribe((x: any) => this.currentUser = x);
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  handleAuthAction() {
    if (this.currentUser) {
      this.logout();
    } else {
      this.login();
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authenticationService.logout();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadFile();
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile as Blob, this.selectedFile?.name);

    this.http.post<any>('http://localhost:8080/api/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress: ' + Math.round(event.loaded / event.total! * 100) + '%');
      } else if (event.type === HttpEventType.Response) {
        console.log(event.body);
        this.currentUser.profilePictureUrl = event.body.fileUrl;
        this.updateUserProfilePictureUrl(event.body.fileUrl);
      }
    });
  }

  updateUserProfilePictureUrl(url: string) {
    this.authenticationService.updateProfilePictureUrl(url).subscribe(() => {
      console.log('Profile picture URL updated');
    });
  }
}