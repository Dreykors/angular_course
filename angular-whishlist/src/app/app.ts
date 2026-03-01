import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DestinoViaje } from './destino-viaje/destino-viaje';
import { ListaDestinos } from './lista-destinos/lista-destinos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DestinoViaje, ListaDestinos, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-whishlist');
}
