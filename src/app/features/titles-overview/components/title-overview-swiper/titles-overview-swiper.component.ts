import {AfterViewInit, Component, ElementRef, input, OnDestroy, QueryList, ViewChildren} from '@angular/core';
import {TitleOverviewCard} from "../title-overview-card/title-overview-card";
import Splide from '@splidejs/splide';

@Component({
  selector: 'title-overview-swiper-component',
  imports: [
    TitleOverviewCard
  ],
  templateUrl: './titles-overview-swiper.component.html',
  styleUrl: './titles-overview-swiper-component.scss',
})
export class TitlesOverviewSwiperComponent implements AfterViewInit, OnDestroy {

  sections = input.required<{title:string,items : number[]}[]>()

  @ViewChildren('splideElement') splideElements!: QueryList<ElementRef>;
  @ViewChildren('prevBtn') prevBtns!: QueryList<ElementRef>;
  @ViewChildren('nextBtn') nextBtns!: QueryList<ElementRef>;

  private splideInstances: Splide[] = [];

  ngAfterViewInit() {
    this.initializeCarousels();

    this.splideElements.changes.subscribe(() => {
      this.destroyCarousels();
      if (this.splideElements.length > 0) {
        setTimeout(() => {
          this.initializeCarousels();
        }, 0);
      }
    });
  }

  ngOnDestroy() {
    this.destroyCarousels();
  }

  private initializeCarousels() {
    if (!this.splideElements || this.splideElements.length === 0) {
      return;
    }

    this.splideElements.forEach((carousel, index) => {
      if (!carousel?.nativeElement) {
        return;
      }

      const prevBtnEl = this.prevBtns.toArray()[index]?.nativeElement;
      const nextBtnEl = this.nextBtns.toArray()[index]?.nativeElement;

      if (!prevBtnEl || !nextBtnEl) {
        return;
      }

      const splideInstance = new Splide(carousel.nativeElement, {
        perMove: 1,
        gap: '30px',
        pagination: false,
        arrows: false,
        perPage: 13,
        autoWidth: false,
        breakpoints: {
          2560: {
            perPage: 11,
            perMove: 3,
            gap: '1.5rem'
          },
          2200: {
            perPage: 10,
            perMove: 3,
            gap: '1.5rem'
          },
          1920: {
            perPage: 9,
            perMove: 2,
            gap: '1.25rem'
          },
          1440: {
            perPage: 7,
            perMove: 2,
            gap: '1.25rem'
          },
          1280: {
            perPage: 6,
            perMove: 2,
            gap: '1rem'
          },
          1024: {
            perPage: 5,
            perMove: 2,
            gap: '1rem'
          },
          768: {
            perPage: 4,
            perMove: 1,
            gap: '0.75rem'
          },
          640: {
            perPage: 3,
            perMove: 1,
            gap: '0.75rem'
          },
          480: {
            perPage: 2,
            perMove: 1,
            gap: '0.5rem',
          },
        }
      });

      splideInstance.mount();
      this.splideInstances.push(splideInstance);

      const checkArrows = () => {
        const hasOverflow = splideInstance.length > splideInstance.options.perPage!;
        const visibility = hasOverflow ? 'visible' : 'hidden';
        prevBtnEl.style.visibility = visibility;
        nextBtnEl.style.visibility = visibility;
      };

      const limitArrows = () => {
        prevBtnEl.style.opacity = splideInstance.index === 0 ? "0.2" : "1";
        nextBtnEl.style.opacity = splideInstance.index >= splideInstance.length - splideInstance.options.perPage! ? "0.2" : "1";
      };

      checkArrows();
      splideInstance.on('refresh', checkArrows);
      splideInstance.on('resize', checkArrows);
      splideInstance.on('resize', limitArrows);
      splideInstance.on('mounted move', limitArrows);

      prevBtnEl.onclick = () => splideInstance.go('<');
      nextBtnEl.onclick = () => splideInstance.go('>');
    });
  }

  private destroyCarousels() {
    this.splideInstances.forEach(instance => {
      if (instance) {
        instance.destroy();
      }
    });
    this.splideInstances = [];
  }

}
