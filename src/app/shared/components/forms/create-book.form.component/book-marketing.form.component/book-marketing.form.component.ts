import {afterNextRender, Component, DestroyRef, inject, input, output, signal} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {form, FormField, required} from '@angular/forms/signals';
import {Observable} from 'rxjs';
import {CreateBookService} from '../services/create-book.service';
import {Textarea} from 'primeng/textarea';
import {InputTextComponent} from '../../../inputs/input-text.component/input-text.component';
import {InputAreaComponent} from '../../../inputs/input-area.component/input-area.component';
interface IBookMarketingForm {
  summary: string | null;
  marketing: string | null;
  hook: string | null;
  note: string | null;
}

@Component({
  selector: 'book-marketing-form',
  imports: [
    InputAreaComponent,
    FormField
  ],
  templateUrl: './book-marketing.form.component.html',
  styleUrl: './book-marketing.form.component.scss',

})
export class BookMarketingFormComponent {
  BookMarketingModel = signal<IBookMarketingForm>({
    summary: null,
    marketing: null,
    hook : null,
    note : null,
  });

  BookMarketingForm = form(this.BookMarketingModel, (schemaPath) =>
  {
    required(schemaPath.summary);
    required(schemaPath.marketing);
    required(schemaPath.hook);
    required(schemaPath.note);
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
    const isValid = this.BookMarketingForm().valid();
    if (isValid) {
      const formValues = this.BookMarketingModel();
      this.bookService.patchBook({
        summary: formValues.summary,
        marketing: formValues.marketing,
        hook: formValues.hook,
        note: formValues.note,
      });
    }
    this.submitResult.emit({
      step : this.stepIndex(),
      valid: isValid
    });
  }


}
