import {
  Component, computed,
  inject,
} from '@angular/core';

import {ClassicButtonComponent} from '../../shared/prime-ng/buttons/classic-button/classic-button.component';
import {
  TitlesOverviewSwiperComponent
} from './components/title-overview-swiper/titles-overview-swiper.component';
import {TitlesOverviewService} from './services/titles-overview.service';
import {BookPreview} from '../../shared/models/BookPreview';
import {BookPreviewService} from '../../shared/services/book-preview.service';
import {
  CreateBookFormComponent
} from '../../shared/components/forms/create-book.form.component/create-book.form.component';
import {TitleOverviewCard} from './components/title-overview-card/title-overview-card';

@Component({
  selector: 'app-titles-overview',
  imports: [
    ClassicButtonComponent,
    TitlesOverviewSwiperComponent,
    CreateBookFormComponent,
    TitleOverviewCard
  ],
  providers: [BookPreviewService, TitlesOverviewService],
  templateUrl: './titles-overview.component.html',
  styleUrl: './titles-overview.component.scss',
})
export class TitlesOverviewComponent {

  titlesOverviewService = inject(TitlesOverviewService);
  books = computed(() => this.titlesOverviewService.books());
  booksByLetter = computed(() => this.titlesOverviewService.booksByLetter());

  modal : boolean = false;
  ngOnInit()
  {
    this.titlesOverviewService.loadBooks();
  }

  sections = [
    { title: 'Tendances', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
    { title: 'Reprendre avec le profil Yli', items: [1, 2, 3, 4, 5, 6] },
    { title: 'Science-Fiction', items: [1, 2, 3, 4, 5, 6] }
  ];

  test: boolean = true;



  testButton() {
    this.test = !this.test;
    console.log(this.books());
    console.log(this.booksByLetter());
  }

  openModal() {
    this.modal = true;
  }
}
