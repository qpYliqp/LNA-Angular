import {AfterViewInit, Component, ElementRef, input, OnDestroy, QueryList, ViewChildren} from '@angular/core';
import {TitleOverviewCard} from "../title-overview-card/title-overview-card";
import Splide from '@splidejs/splide';
import {BookSection} from '../../services/titles-overview.service';

@Component({
  selector: 'title-overview-swiper-component',
  imports: [
    TitleOverviewCard
  ],
  templateUrl: './titles-overview-swiper.component.html',
  styleUrl: './titles-overview-swiper-component.scss',
})
export class TitlesOverviewSwiperComponent implements AfterViewInit, OnDestroy {

  sections = input.required<BookSection[]>()

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
        perPage: 18,
        perMove: 9,
        gap: '24px',
        pagination: false,
        arrows: false,
        autoWidth: false,

        breakpoints: {
          // Écran <= 3200px (prend la config Swiper 2560)
          3200: {
            perPage: 14,
            perMove: 7,
            gap: '24px'
          },
          // Écran <= 2560px (prend la config Swiper 2048)
          2560: {
            perPage: 12,
            perMove: 6,
            gap: '24px'
          },
          // Écran <= 2048px (prend la config Swiper 1920)
          2048: {
            perPage: 10,
            perMove: 5,
            gap: '22px'
          },
          // Écran <= 1920px (prend la config Swiper 1700)
          1920: {
            perPage: 9,
            perMove: 4,
            gap: '20px'
          },
          // Écran <= 1700px (prend la config Swiper 1536)
          1700: {
            perPage: 8,
            perMove: 4,
            gap: '20px'
          },
          // Écran <= 1536px (prend la config Swiper 1280)
          1536: {
            perPage: 6,
            perMove: 4,
            gap: '18px'
          },
          // Écran <= 1280px (prend la config Swiper 1024)
          1280: {
            perPage: 5,
            perMove: 4,
            gap: '16px'
          },
          // Écran <= 1024px (prend la config Swiper 768)
          1024: {
            perPage: 5,
            perMove: 3,
            gap: '16px'
          },
          // Écran <= 768px (prend la config Swiper 640)
          768: {
            perPage: 4,
            perMove: 3,
            gap: '13px'
          },
          // Écran <= 640px (prend la config Swiper 480)
          640: {
            perPage: 3,
            perMove: 2,
            gap: '12px'
          },
          // Écran <= 480px (prend la config Swiper 0)
          480: {
            perPage: 2,
            perMove: 2,
            gap: '10px'
          }
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
