import {Injectable, signal, WritableSignal} from '@angular/core';

export interface PostBook
{
  id : number | null;
  title : string | null;
  isbn : string | null;
  nuart : string | null;
  releaseDate : Date | null;
  pages : number | null;
  price : number | null;
  coverUrl : File | null;
  summary : string | null;
  marketing : string | null;
  hook : string | null;
  note : string | null;
}

@Injectable()
export class CreateBookService {

  book: WritableSignal<PostBook> = signal<PostBook>(this.emptyBook());

  patchBook(changes: Partial<PostBook>) {
    this.book.update(currentBook => ({
      ...currentBook,
      ...changes
    }));

    console.log(this.book());
  }

  emptyBook(): PostBook {
    return {
      id: null,
      title: null,
      isbn: null,
      nuart: null,
      releaseDate: null,
      pages: null,
      price: null,
      coverUrl: null,
      summary:null,
      marketing:null,
      hook:null,
      note:null,
    };
  }
}
