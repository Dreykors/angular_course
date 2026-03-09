import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Store } from '@ngrx/store';

import { DestinoViajeModel } from '../models/destino-viaje.model';
import { voteDown, voteUp } from '../store/destinos-viajes.actions';
import { AppState } from '../store/destinos-viajes.state';
import { TrackearClickDirective } from '../trackear-click.directive';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, TrackearClickDirective],
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
    this.store.dispatch(voteUp({ destino: this.destino }));
    return false;
  }

  voteDown(): boolean {
    this.store.dispatch(voteDown({ destino: this.destino }));
    return false;
  }
}
