import {Component, computed, inject, Injectable, signal} from '@angular/core';
import {BookPreview} from '../../../shared/models/BookPreview';
import {BookPreviewService} from '../../../shared/services/book-preview.service';

export interface BookSection {
  letter: string;
  books: BookPreview[];
}
@Injectable()
export class TitlesOverviewService {

  private bookPreviewService = inject(BookPreviewService);
  books = computed(() => this.bookPreviewService.books());

  readonly booksByLetter = computed<BookSection[]>(() => {
    const sourceBooks = this.books();

    if (!sourceBooks || sourceBooks.length === 0) return [];
    const groups = sourceBooks.reduce((acc, book) => {
      const firstChar = book.title?.charAt(0).toUpperCase();
      const letter = /^[A-Z]$/.test(firstChar) ? firstChar : '#';
      if (!acc[letter]) {
        acc[letter] = [];
      }
      acc[letter].push(book);
      return acc;
    }, {} as { [key: string]: BookPreview[] });
    return Object.keys(groups)
      .sort((a, b) => {
        if (a === '#') return 1;
        if (b === '#') return -1;
        return a.localeCompare(b);
      })
      .map((key) => {
        return {
          letter: key,
          books: groups[key]
        } as BookSection;
      });
  });


  loadBooks()
  {
    this.bookPreviewService.getAllPreviewBooks();
  }


}
