import {inject, Injectable, signal} from '@angular/core';
import {BookPreview} from '../models/BookPreview';
import {ApiHttpService} from './api-http.service';
import {map} from 'rxjs';

@Injectable()
export class BookPreviewService {

  private _api = inject(ApiHttpService);
  books = signal<BookPreview[]>([]);

  private baseUrl: string = "books/preview";

  getAllPreviewBooks()
  {
    this._api.get<any[]>(this.baseUrl, false)
      .pipe(
        map((jsonItems) => {
          return jsonItems.map(item => ({
            id: item.id,
            title: item.title,
            coverUrl: item.coverUrl,
          } as BookPreview));
        })
      ).subscribe({
      next: (loadedBooks) => {
        this.books.set(loadedBooks);
      },
      error: (err) => console.error(err)
    });
  }

}
