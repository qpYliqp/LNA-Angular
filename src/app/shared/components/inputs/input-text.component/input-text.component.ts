import {ChangeDetectionStrategy, Component, computed, input, model} from '@angular/core';
import {DisabledReason, FormValueControl, ValidationError} from '@angular/forms/signals';
import {ClassicInputPt} from '../../../prime-ng/inputs/classic-input/classic-input.pt';
import {InputTextPassThrough} from 'primeng/types/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'input-text',
  templateUrl: 'input-text.component.html',
  imports: [
    FloatLabel,
    InputText
  ],
  styleUrl: './input-text.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent implements FormValueControl<string> {
  value = model<string>('');
  touched = model<boolean>(false);
  disabled = input<boolean>(false);

  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  pt = input<InputTextPassThrough>(ClassicInputPt.pt);
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
