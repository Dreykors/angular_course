import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  msg = '';

  authService = inject(AuthService);

  login(): boolean {
    this.msg = '';

    const ok = this.authService.login(this.username, this.password);

    if (!ok) {
      this.msg = 'Login incorrecto';
      setTimeout(() => {
        this.msg = '';
      }, 2500);
    }

    return false;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }
}
