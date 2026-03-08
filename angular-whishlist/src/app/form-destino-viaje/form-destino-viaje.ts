import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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

  minLongitud = 3;

  fg = this.fb.group({
    nombre: [
      '',
      Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud),
      ]),
    ],
    url: ['', Validators.required],
  });

  constructor() {
    this.fg.valueChanges.subscribe((value) => {
      console.log('Cambios en el formulario:', value);
    });
  }

  nombreValidator(control: AbstractControl): ValidationErrors | null {
    const l = (control.value ?? '').toString().trim().length;

    if (l > 0 && l < 5) {
      return { invalidNombre: true };
    }

    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const l = (control.value ?? '').toString().trim().length;

      if (l > 0 && l < minLong) {
        return { minLongNombre: true };
      }

      return null;
    };
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
