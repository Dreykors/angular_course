import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css',
})
export class DestinoViaje {
  @Input() destino!: DestinoViajeModel;
  @HostBinding('attr.class') cssClass = 'col-12 col-md-4 mb-4';

  constructor() {}
}
