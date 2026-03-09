import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { DestinoViajeModel } from '../models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css',
  animations: [
    trigger('esFavorito', [
      state(
        'esFavorito',
        style({
          backgroundColor: '#1abc9c',
        }),
      ),
      state(
        'noEsFavorito',
        style({
          backgroundColor: 'whitesmoke',
        }),
      ),
      transition('noEsFavorito => esFavorito', [animate('3s')]),
      transition('esFavorito => noEsFavorito', [animate('1s')]),
    ]),
  ],
})
export class DestinoViaje {
  @Input() destino!: DestinoViajeModel;
  @Input('idx') position!: number;

  @HostBinding('attr.class') cssClass = 'col-12 col-md-4 mb-4';

  @Output() clicked = new EventEmitter<DestinoViajeModel>();
  @Output() remove = new EventEmitter<DestinoViajeModel>();

  ir(): boolean {
    this.clicked.emit(this.destino);
    return false;
  }

  borrar(): void {
    this.remove.emit(this.destino);
  }
}
