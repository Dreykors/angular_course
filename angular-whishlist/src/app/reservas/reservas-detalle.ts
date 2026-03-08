import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reservas-detalle.html',
  styleUrl: './reservas-detalle.css',
})
export class ReservasDetalle {
  id: string | null = null;

  private route = inject(ActivatedRoute);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }
}