import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vuelos',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './vuelos.html',
  styleUrl: './vuelos.css',
})
export class Vuelos {}
