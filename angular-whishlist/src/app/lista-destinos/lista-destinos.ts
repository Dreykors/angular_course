import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViaje, FormDestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css',
})
export class ListaDestinos {
  destinos: DestinoViajeModel[];

  constructor() {
    this.destinos = [];
  }

  agregado(d: DestinoViajeModel): void {
    this.destinos.push(d);
  }

  elegido(d: DestinoViajeModel) {
    this.destinos.forEach(function (x) {
      x.setSelected(false);
    });
    d.setSelected(true);
  }
}
