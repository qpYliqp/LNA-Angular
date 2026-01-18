import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {BookPreview} from '../models/BookPreview';
import {ApiHttpService} from './api-http.service';
import {finalize, map} from 'rxjs';

@Injectable()
export class BookPreviewService {

  api = inject(ApiHttpService);
  books = signal<BookPreview[]>([]);

  private baseUrl: string = "books/preview";

  getAllPreviewBooks()
  {
    this.api.get<any[]>(this.baseUrl, false)
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
