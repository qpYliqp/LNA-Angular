import {Component, signal} from '@angular/core';
import {Field, form, FormField, required} from '@angular/forms/signals';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';

interface IBookDetailsForm {
  title: string;
  isbn: string;
  price: number | null;
  pages: number | null;
  releaseDate: Date | null;
  nuart: string | null;
  coverFile: File | null;
}


@Component({
  selector: 'book-details-form',
  imports: [
    FloatLabel,
    FormField,
    Field,
    InputText
  ],
  templateUrl: './book-details.form.component.html',
  styleUrl: './book-details.form.component.scss',
})


export class BookDetailsFormComponent {

  BookDetailsModel = signal<IBookDetailsForm>({
    title: '',
    isbn: '',
    price : null,
    pages : null,
    releaseDate: null,
    nuart : null,
    coverFile: null,
  });

  BookDetailsForm = form(this.BookDetailsModel, (schemaPath) =>
  {
    required(schemaPath.title);
    required(schemaPath.isbn);
  });



}
