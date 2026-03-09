import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, fromEvent } from 'rxjs';

import { AppState } from './store/destinos-viajes.state';
import { trackTagClick } from './store/destinos-viajes.actions';

@Directive({
  selector: '[appTrackearClick]',
  standalone: true,
})
export class TrackearClickDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef<HTMLElement>);
  private store = inject(Store<AppState>);

  private clickSubscription?: Subscription;

  ngOnInit(): void {
    this.clickSubscription = fromEvent(this.elementRef.nativeElement, 'click').subscribe(() => {
      this.track();
    });
  }

  ngOnDestroy(): void {
    this.clickSubscription?.unsubscribe();
  }

  private track(): void {
    const rawTags: string = this.elementRef.nativeElement.getAttribute('data-trackear-tags') ?? '';

    const tags: string[] = rawTags
      .split(/\s+/)
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);

    tags.forEach((tag: string) => {
      this.store.dispatch(trackTagClick({ tag }));
    });

    if (tags.length > 0) {
      console.log('Track evento:', tags.join(', '));
    }
  }
}
