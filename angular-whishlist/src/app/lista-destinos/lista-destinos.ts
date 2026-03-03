import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css',
})
export class ListaDestinos {
  destinos!: DestinoViajeModel[];

  constructor() {
    this.destinos = [];
  }

  guardar(nombre: string, url: string): boolean {
    this.destinos.push(new DestinoViajeModel(nombre, url));
    return false;
  }

  elegido(d: DestinoViajeModel) {
    this.destinos.forEach(function (x) {
      x.setSelected(false);
    });
    d.setSelected(true);
  }
}
