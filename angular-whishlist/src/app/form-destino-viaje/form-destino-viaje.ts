import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-destino-viaje.html',
  styleUrl: './form-destino-viaje.css',
})
export class FormDestinoViaje implements AfterViewInit {
  @Output() onItemAdded = new EventEmitter<DestinoViajeModel>();

  @ViewChild('nombreInput', { static: true })
  nombreInput!: ElementRef<HTMLInputElement>;

  private fb = inject(FormBuilder);

  minLongitud = 3;

  destinosDisponibles: string[] = [
    'Barcelona',
    'Madrid',
    'Barranquilla',
    'Bogotá',
    'Buenos Aires',
    'Montevideo',
    'Lima',
    'Santiago',
    'Cartagena',
    'Valencia',
    'Sevilla',
    'Málaga',
  ];

  searchResults: string[] = [];

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

  ngAfterViewInit(): void {
    fromEvent<InputEvent>(this.nombreInput.nativeElement, 'input')
      .pipe(
        map((event) => (event.target as HTMLInputElement).value.trim()),
        filter((text) => text.length >= 4),
        debounceTime(200),
        distinctUntilChanged(),
        map((text) =>
          this.destinosDisponibles.filter((destino) =>
            destino.toLowerCase().includes(text.toLowerCase()),
          ),
        ),
      )
      .subscribe((results) => {
        this.searchResults = results;
      });

    fromEvent<InputEvent>(this.nombreInput.nativeElement, 'input')
      .pipe(map((event) => (event.target as HTMLInputElement).value.trim()))
      .subscribe((text) => {
        if (text.length < 4) {
          this.searchResults = [];
        }
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

  seleccionarSugerencia(sugerencia: string): void {
    this.fg.patchValue({ nombre: sugerencia });
    this.searchResults = [];
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

    this.searchResults = [];
  }
}
