import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationData = { username: '', password: '', email: '', role: 'User' };


  constructor(private authService:AuthService){}

  register() {
    this.authService.register(this.registrationData).subscribe(
      (response) => {
        if (response.success) {
          console.log(response.message); // User registered successfully
        } else {
          console.error(response.message); // Username already exists or Registration failed
        }
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
}

}
