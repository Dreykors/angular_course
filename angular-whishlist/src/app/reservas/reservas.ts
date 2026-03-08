import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas {}
