import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DestinoViajeModel } from './destino-viaje.model';

@Injectable({
  providedIn: 'root',
})
export class DestinosApiClient {
  destinos: DestinoViajeModel[] = [];

  current = new BehaviorSubject<DestinoViajeModel | null>(null);

  add(d: DestinoViajeModel): void {
    this.destinos.push(d);
  }

  getAll(): DestinoViajeModel[] {
    return this.destinos;
  }

  elegir(d: DestinoViajeModel): void {
    this.destinos.forEach((x) => x.setSelected(false));
    d.setSelected(true);
    this.current.next(d);
  }

  subscribeOnChange(fn: (d: DestinoViajeModel | null) => void): void {
    this.current.subscribe(fn);
  }
}
