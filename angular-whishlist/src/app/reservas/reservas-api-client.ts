import { Injectable } from '@angular/core';

@Injectable()
export class ReservasApiClient {
  getAll() {
    return [
      { id: 1, name: 'Reserva 1' },
      { id: 2, name: 'Reserva 2' },
    ];
  }
}
