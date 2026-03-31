import {inject, Injectable, signal} from '@angular/core';
import {ApiHttpService} from './api-http.service';
import {Author} from '../models/Author';
import {map} from 'rxjs';
import {BookPreview} from '../models/BookPreview';

@Injectable()
export class AuthorService {

  private _api = inject(ApiHttpService);
  authors = signal<Author[]>([]);

  private baseUrl: string = "authors";


  getAllAuthors()
  {
    this._api.get<any[]>(this.baseUrl, false)
      .pipe(
        map((jsonItems) => {
          return jsonItems.map(item => ({
            id: item.id,
            name: item.name,
          } as Author));
        })
      ).subscribe({
      next: (loadedAuthors) => {
        this.authors.set(loadedAuthors);
      },
      error: (err) => console.error(err)
    });
  }
}
