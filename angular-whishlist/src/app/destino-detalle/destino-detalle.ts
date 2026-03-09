import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent, MarkerComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [CommonModule, MapComponent, MarkerComponent],
  templateUrl: './destino-detalle.html',
  styleUrl: './destino-detalle.css',
})
export class DestinoDetalle {
  style: any = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
      },
    },
    version: 8,
    layers: [
      {
        id: 'countries',
        type: 'fill',
        source: 'world',
        layout: {},
        paint: {
          'fill-color': '#6F788A',
        },
      },
    ],
  };

  zoom: [number] = [2];
  center: [number, number] = [-58.3816, -34.6037];
  markerLngLat: [number, number] = [-58.3816, -34.6037];

  mostrarMensaje(): void {
    alert('Hola');
  }
}
