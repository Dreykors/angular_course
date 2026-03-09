import { Directive, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appEspia]',
  standalone: true,
})
export class Espia implements OnInit, OnDestroy {
  private static nextId = 0;

  ngOnInit(): void {
    this.log('OnInit');
  }

  ngOnDestroy(): void {
    this.log('OnDestroy');
  }

  private log(mensaje: string): void {
    console.log(`Espia #${Espia.nextId++} ${mensaje}`);
  }
}
