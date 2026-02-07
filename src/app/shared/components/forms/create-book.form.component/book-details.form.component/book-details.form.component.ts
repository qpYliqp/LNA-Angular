import {Component, signal, input, inject, DestroyRef, afterNextRender} from '@angular/core';
import {Field, form, FormField, required, min, pattern} from '@angular/forms/signals';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {InputTextComponent} from '../../../inputs/input-text.component/input-text.component';
import {Observable} from 'rxjs';
import {InputMaskComponent} from '../../../inputs/input-mask.component/input-mask.component';

interface IBookDetailsForm {
  title: string;
  isbn: string;
  price: number;
  pages: number;
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
    InputText,
    InputTextComponent,
    InputMaskComponent
  ],
  templateUrl: './book-details.form.component.html',
  styleUrl: './book-details.form.component.scss',
})


export class BookDetailsFormComponent {

  BookDetailsModel = signal<IBookDetailsForm>({
    title: '',
    isbn: '',
    price : 0,
    pages : 0,
    releaseDate: null,
    nuart : null,
    coverFile: null,
  });

  BookDetailsForm = form(this.BookDetailsModel, (schemaPath) =>
  {
    required(schemaPath.title);
    required(schemaPath.isbn);
    required(schemaPath.pages);
    required(schemaPath.price);
    min(schemaPath.price,1);
    min(schemaPath.pages,1);
  });

  hasSubmitted = false;
  submitTrigger = input.required<Observable<number>>();
  stepIndex = input.required<number>();



  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const sub = this.submitTrigger().subscribe(targetStep => {
        if (targetStep === this.stepIndex()) {
          this.onSubmit();
        }
      });
      destroyRef.onDestroy(() => sub.unsubscribe());
    });
  }

  public onSubmit(): boolean {
      this.hasSubmitted = true;
      return this.hasSubmitted;

  }



  }
