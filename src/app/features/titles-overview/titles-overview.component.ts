import {AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {TitleOverviewCard} from './components/title-overview-card/title-overview-card';
import Splide from '@splidejs/splide';
import {ClassicButtonComponent} from '../../shared/prime-ng/buttons/classic-button/classic-button.component';
import {
  TitlesOverviewSwiperComponent
} from './components/title-overview-swiper/title-overview-swiper-component/titles-overview-swiper.component';

@Component({
  selector: 'app-titles-overview',
  imports: [
    ClassicButtonComponent,
    TitlesOverviewSwiperComponent
  ],
  templateUrl: './titles-overview.component.html',
  styleUrl: './titles-overview.component.scss',
})
export class TitlesOverviewComponent {


  sections = [
    { title: 'Tendances', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
    { title: 'Reprendre avec le profil Yli', items: [1, 2, 3, 4, 5, 6] },
    { title: 'Science-Fiction', items: [1, 2, 3, 4, 5, 6] }
  ];

  test: boolean = true;



  testButton() {
    this.test = !this.test;
  }
}
