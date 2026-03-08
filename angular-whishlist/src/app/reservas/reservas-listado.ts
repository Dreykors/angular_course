import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservas-listado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reservas-listado.html',
  styleUrl: './reservas-listado.css',
})
export class ReservasListado {}