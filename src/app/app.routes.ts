import { Routes } from '@angular/router';
import {Board} from './features/board/board';
import {Calendar} from './features/calendar/calendar';
import {TitlesOverviewComponent} from './features/titles-overview/titles-overview.component';
import {BookView} from './features/book-view/book-view';

export const routes: Routes = [
  {path: "board", component: Board},
  {path: "calendar", component: Calendar},
  {path: "titles", component: TitlesOverviewComponent},
  {path: 'book/:id', component: BookView}
];
