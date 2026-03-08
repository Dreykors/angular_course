import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vuelos-detalle',
  standalone: true,
  imports: [],
  templateUrl: './vuelos-detalle.html',
  styleUrl: './vuelos-detalle.css',
})
export class VuelosDetalle {
  id: string | null = null;

  private route = inject(ActivatedRoute);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }
}
