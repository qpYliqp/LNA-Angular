import {Component, computed, input, model} from '@angular/core';
import {InputTextPassThrough} from 'primeng/types/inputtext';
import {ClassicInputPt} from '../../../prime-ng/inputs/classic-input/classic-input.pt';
import {ValidationError} from '@angular/forms/signals';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'input-mask',
  providers: [provideNgxMask()],
  imports: [
    InputText,
    FloatLabel,
    NgxMaskDirective,
    FormsModule
  ],
  templateUrl: 'input-mask.component.html',
  styleUrl: './input-mask.component.scss',
})
export class InputMaskComponent {


  value = model<string>('');
  disabled = input<boolean>(false);

  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  pt = input<InputTextPassThrough>(ClassicInputPt.pt);
  label = input.required<string>();
  errors = input<readonly ValidationError[]>([]);

  submitted = input.required<boolean>();

  inputMask = input.required<string>();

  showError = computed(() => {
    return this.invalid() && this.submitted();
  });

  hasRequiredError = computed(() => {
    return this.errors().some(error => error.kind === 'required');
  });

}
