import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.css',
})
export class FormDestinoViaje {
  @Output() onItemAdded = new EventEmitter<DestinoViajeModel>();

  private fb = inject(FormBuilder);

  fg = this.fb.group({
    nombre: ['', Validators.required],
    url: ['', Validators.required],
  });

  constructor() {
    this.fg.valueChanges.subscribe((value) => {
      console.log('Cambios en el formulario:', value);
    });
  }

  guardar(): void {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched();
      return;
    }

    const nombre = this.fg.get('nombre')?.value ?? '';
    const url = this.fg.get('url')?.value ?? '';

    const d = new DestinoViajeModel(nombre, url);
    this.onItemAdded.emit(d);

    this.fg.reset({
      nombre: '',
      url: '',
    });
  }
}
