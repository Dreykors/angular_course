import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from '../destino-viaje/destino-viaje';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css',
})
export class ListaDestinos {
  destinos!: string[];

  constructor() {
    this.destinos = ['Francisco Morazán', 'Copán', 'Lempira', 'Yoro'];
  }
}
