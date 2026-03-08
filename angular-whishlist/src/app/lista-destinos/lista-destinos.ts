import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { DestinosApiClient } from '../models/destinos-api-client';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViaje, FormDestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css',
})
export class ListaDestinos {
  @Output() onItemAdded = new EventEmitter<DestinoViajeModel>();

  updates: string[] = [];

  private destinosApiClient = inject(DestinosApiClient);

  constructor() {
    this.destinosApiClient.subscribeOnChange((d: DestinoViajeModel | null) => {
      if (d != null) {
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }

  get destinos(): DestinoViajeModel[] {
    return this.destinosApiClient.getAll();
  }

  agregado(d: DestinoViajeModel): void {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d: DestinoViajeModel): void {
    this.destinosApiClient.elegir(d);
  }
}
