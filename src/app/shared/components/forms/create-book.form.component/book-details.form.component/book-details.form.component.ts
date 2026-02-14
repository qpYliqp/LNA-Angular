import {Component, signal, input, inject, DestroyRef, afterNextRender, output} from '@angular/core';
import { form, FormField, required, min} from '@angular/forms/signals';
import {InputTextComponent} from '../../../inputs/input-text.component/input-text.component';
import {Observable} from 'rxjs';
import {InputMaskComponent} from '../../../inputs/input-mask.component/input-mask.component';
import {IsbnValidation} from '../../../../validations/isbn-validation';
import {InputNumberComponent} from '../../../inputs/input-number.component/input-number.component';
import {FormsModule} from '@angular/forms';
import {ClassicDatePickerPt} from '../../../../prime-ng/date-picker/classic-date-picker/classic-date-picker.pt';
import {DatePickerComponent} from '../../../inputs/date-picker.component/date-picker.component';
import {UploadImageComponent} from '../../../inputs/upload-image.component/upload-image.component';
import {CreateBookService} from '../services/create-book.service';

interface IBookDetailsForm {
  title: string | null;
  isbn: string | null;
  price: number | null;
  pages: number | null;
  releaseDate: Date | null;
  nuart: string | null;
  coverFile: File | null;
}


@Component({
  selector: 'book-details-form',
  imports: [
    FormField,
    InputTextComponent,
    InputMaskComponent,
    InputNumberComponent,
    FormsModule,
    DatePickerComponent,
    UploadImageComponent
  ],
  templateUrl: './book-details.form.component.html',
  styleUrl: './book-details.form.component.scss',
})


export class BookDetailsFormComponent {
  BookDetailsModel = signal<IBookDetailsForm>({
    title: "null",
    isbn: "978-272-348-852-5",
    price : 5,
    pages : 5,
    releaseDate: new Date(),
    nuart : null,
    coverFile: null,
  });

  BookDetailsForm = form(this.BookDetailsModel, (schemaPath) =>
  {
    required(schemaPath.title);
    required(schemaPath.isbn);
    IsbnValidation.IsValidIsbn(schemaPath.isbn);
    required(schemaPath.pages);
    required(schemaPath.price);
    min(schemaPath.price,1, {message : "Le prix doit être supérieur à 1€"});
    min(schemaPath.pages,1, {message : "Le prix doit être supérieur à 1€"});
    required(schemaPath.releaseDate);
  });

  hasSubmitted = false;
  submitTrigger = input.required<Observable<number>>();
  submitResult = output<{ step: number; valid: boolean }>();
  stepIndex = input.required<number>();

  private bookService = inject(CreateBookService);


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

    public onSubmit(): void  {
      this.hasSubmitted = true;
      const isValid = this.BookDetailsForm().valid();
      if (isValid) {
        const formValues = this.BookDetailsModel();
        this.bookService.patchBook({
          title: formValues.title,
          isbn: formValues.isbn,
          price: formValues.price,
          pages: formValues.pages,
          releaseDate: formValues.releaseDate,
          nuart: formValues.nuart,
          coverUrl: formValues.coverFile,
        });
      }
      this.submitResult.emit({
        step : this.stepIndex(),
        valid: isValid
      });
    }
}
