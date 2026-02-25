import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Saludador } from './saludador/saludador';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Saludador],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-hola-mundo');
}
