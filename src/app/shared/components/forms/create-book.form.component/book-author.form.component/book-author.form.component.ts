import {afterNextRender, Component, computed, DestroyRef, inject, input, output, signal} from '@angular/core';
import {AuthorService} from '../../../../services/author.service';
import {Observable} from 'rxjs';
import {MultiSelect} from 'primeng/multiselect';
import {Author} from '../../../../models/Author';
import {form, FormField, min, minLength, required} from '@angular/forms/signals';
import {CreateBookService} from '../services/create-book.service';
import {FormsModule} from '@angular/forms';
import {ClassicSelectPt} from '../../../../prime-ng/select/classic-select.pt';
import {IsbnValidation} from '../../../../validations/isbn-validation';

interface IBookAuthorForm {
  authors: Author[];
}

@Component({
  selector: 'book-author-form',
  imports: [
    MultiSelect,
    FormsModule,
    FormField
  ],
  templateUrl: './book-author.form.component.html',
  styleUrl: './book-author.form.component.scss',
  providers: [AuthorService],
})
export class BookAuthorFormComponent {

  hasSubmitted = false;
  submitTrigger = input.required<Observable<number>>();
  submitResult = output<{ step: number; valid: boolean }>();
  stepIndex = input.required<number>();

  BookAuthorModel = signal<IBookAuthorForm>({
    authors: [],
  });

  BookAuthorForm = form(this.BookAuthorModel, (schemaPath) => {
    minLength(schemaPath.authors, 1, {message: "Vous devez sélectionner au moins un auteur"});
  });


  authorService = inject(AuthorService);
  bookService = inject(CreateBookService);
  authors = computed(() => this.authorService.authors());

  ngOnInit()
  {
    this.authorService.getAllAuthors();
  }

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

  removeAuthor(author: Author): void {
    this.BookAuthorModel.update(model => ({
      ...model,
      authors: model.authors.filter(a => a.id !== author.id)
    }));
  }

  public onSubmit(): void  {
    console.log("ddd");

    this.hasSubmitted = true;
    const isValid = this.BookAuthorForm().valid();
    console.log("is valid ? " , isValid, this.BookAuthorForm.authors.length);
    if (isValid) {
      const formValues = this.BookAuthorModel();
      this.bookService.patchBook({
        authorsId: formValues.authors.map(a => a.id),
      });
    }
    this.submitResult.emit({
      step : this.stepIndex(),
      valid: isValid
    });
  }


  protected readonly ClassicSelectPt = ClassicSelectPt;
}
