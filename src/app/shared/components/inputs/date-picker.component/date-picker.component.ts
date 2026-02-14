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
  templateUrl: 'date-picker.component.html',
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
