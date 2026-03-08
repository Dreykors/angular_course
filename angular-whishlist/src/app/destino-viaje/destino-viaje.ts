import { Component, EventEmitter, HostBinding, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { Store } from '@ngrx/store';

import { DestinoViajeModel } from '../models/destino-viaje.model';
import { AppState } from '../store/destinos-viajes.state';
import { voteDownDestino, voteUpDestino } from '../store/destinos-viajes.actions';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css',
})
export class DestinoViaje {
  @Input() destino!: DestinoViajeModel;
  @Input('idx') position!: number;

  @HostBinding('attr.class') cssClass = 'col-12 col-md-4 mb-4';

  @Output() clicked = new EventEmitter<DestinoViajeModel>();
  @Output() remove = new EventEmitter<DestinoViajeModel>();

  private store = inject(Store<AppState>);

  ir(): boolean {
    this.clicked.emit(this.destino);
    return false;
  }

  borrar(): void {
    this.remove.emit(this.destino);
  }

  voteUp(): boolean {
    this.store.dispatch(voteUpDestino({ destino: this.destino }));
    return false;
  }

  voteDown(): boolean {
    this.store.dispatch(voteDownDestino({ destino: this.destino }));
    return false;
  }
}
