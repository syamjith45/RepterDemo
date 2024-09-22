import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginData = { username: '', password: '' };

  constructor(private authService:AuthService,private router:Router){}

  login() {
    this.authService.login(this.loginData).subscribe(
      (response) => {
        try {
          localStorage.setItem('token', response.token);
          console.log('User logged in successfully:', response);

          this.router.navigate(['/'])
        } catch (error) {
          console.error('LocalStorage access error:', error);
          // Handle alternative storage or notify the user
        }
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
  goToRegister(){
    this.router.navigate(['register'])
  }
}
