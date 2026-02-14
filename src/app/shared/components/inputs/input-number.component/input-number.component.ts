import {Component, computed, input, model} from '@angular/core';
import {ClassicInputPt} from '../../../prime-ng/inputs/classic-input/classic-input.pt';
import {ValidationError} from '@angular/forms/signals';
import {InputNumber, InputNumberPassThrough} from 'primeng/inputnumber';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ClassicInputNumberPt} from '../../../prime-ng/inputs/classic-input-number/classic-input-number.pt';

@Component({
  selector: 'input-number',
  imports: [
    FloatLabel,
    InputText,
    InputNumber,
    FormsModule
  ],
  templateUrl: 'input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent {

  value = model<number>(0);
  touched = model<boolean>(false);
  disabled = input<boolean>(false);

  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  pt = input<InputNumberPassThrough>(ClassicInputNumberPt.pt);
  label = input.required<string>();
  errors = input<readonly ValidationError[]>([]);

  submitted = input.required<boolean>();

  showError = computed(() => {
    if (!this.invalid()) return false;
    return this.submitted();
  });

  hasRequiredError = computed(() => {
    return this.errors().some(error => error.kind === 'required');
  });


}
