import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css',
})
export class DestinoViaje {
  @Input() nombre!: string;

  constructor() {}
}
