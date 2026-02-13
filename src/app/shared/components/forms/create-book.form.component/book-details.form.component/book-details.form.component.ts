import {Component, signal, input, inject, DestroyRef, afterNextRender} from '@angular/core';
import { form, FormField, required, min} from '@angular/forms/signals';
import {FloatLabel} from 'primeng/floatlabel';
import {InputTextComponent} from '../../../inputs/input-text.component/input-text.component';
import {Observable} from 'rxjs';
import {InputMaskComponent} from '../../../inputs/input-mask.component/input-mask.component';
import {IsbnValidation} from '../../../../validations/isbn-validation';
import {InputNumberComponent} from '../../../inputs/input-number.component/input-number.component';
import {FormsModule} from '@angular/forms';
import {ClassicDatePickerPt} from '../../../../prime-ng/date-picker/classic-date-picker/classic-date-picker.pt';
import {DatePickerComponent} from '../../../inputs/date-picker.component/date-picker.component';
import {UploadImageComponent} from '../../../upload-image.component/upload-image.component';

interface IBookDetailsForm {
  title: string;
  isbn: string;
  price: number | null;
  pages: number | null;
  releaseDate: Date | null;
  nuart: string;
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
    title: '',
    isbn: '',
    price : null,
    pages : null,
    releaseDate: null,
    nuart : '',
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

  protected readonly ClassicDatePickerPt = ClassicDatePickerPt;
}
