import {Component, computed, input, model} from '@angular/core';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClassicDatePickerPt} from '../../../prime-ng/date-picker/classic-date-picker/classic-date-picker.pt';
import {InputTextPassThrough} from 'primeng/types/inputtext';
import {ClassicInputPt} from '../../../prime-ng/inputs/classic-input/classic-input.pt';
import {ValidationError} from '@angular/forms/signals';

@Component({
  selector: 'date-picker',
  imports: [
    DatePicker,
    FloatLabel,
    ReactiveFormsModule,
    FormsModule
  ],
  template: `<div class="flex flex-col w-full md:w-auto">
    <div class="relative">
      <p-floatlabel>
        <p-datePicker
          #inputEl
          [(ngModel)]="value"
          [pt]="ClassicDatePickerPt.pt"
          appendTo="body"
          class="bg-third text-white border-none outline-none max-w-50"
          name="date"
          required/>
        <label
          [class]="showError() ? '!text-l-red' : '!text-secondary'"
          class="text-sm">
          {{ label() }}
        </label>
      </p-floatlabel>
    </div>
    <div class="h-6 flex justify-end items-start">
      <small
        [class]="invalid() ? 'opacity-100' : 'opacity-0'"
        class="text-l-red text-xs">
        @if (showError() && hasRequiredError()) {
          Champs requis
        }
        @else if(showError()) {
          {{errors()[0].message}}
        }
      </small>
    </div>
  </div>`,
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent {

  value = model<Date>();
  disabled = input<boolean>(false);

  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  pt = input<InputTextPassThrough>(ClassicInputPt.pt);
  label = input.required<string>();
  errors = input<readonly ValidationError[]>([]);

  submitted = input.required<boolean>();

  showError = computed(() => {
    return this.invalid() && this.submitted();
  });

  hasRequiredError = computed(() => {
    return this.errors().some(error => error.kind === 'required');
  });

  protected readonly ClassicDatePickerPt = ClassicDatePickerPt;
}
