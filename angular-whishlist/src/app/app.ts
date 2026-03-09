import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-whishlist');

  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['es', 'en', 'fr']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  cambiarIdioma(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
  }
}
