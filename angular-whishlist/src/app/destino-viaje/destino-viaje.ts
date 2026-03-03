import { Component, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { RouterLinkWithHref } from '@angular/router';

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
  @Output() clicked: EventEmitter<DestinoViajeModel>;

  constructor() {
    this.clicked = new EventEmitter();
  }

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }
}
