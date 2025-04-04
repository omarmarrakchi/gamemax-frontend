import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/login/authentification.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
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
    const video = document.getElementById('bg-video') as HTMLVideoElement;
    if (video) {
      video.play().catch(error => {
        console.error('Error attempting to play', error);
      });
    }
  }

  // Getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  executeRecaptcha() {
    grecaptcha.execute();
  }
}