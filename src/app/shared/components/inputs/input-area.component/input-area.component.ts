import {Component, computed, input, model} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {ValidationError} from '@angular/forms/signals';
import {TextareaPassThrough} from 'primeng/types/textarea';
import {ClassicTextAreaPt} from '../../../prime-ng/inputs/classic-text-area/classic-text-area.pt';
import {Textarea} from 'primeng/textarea';

@Component({
  selector: 'input-area',
  imports: [
    FloatLabel,
    Textarea
  ],
  templateUrl: './input-area.component.html',
  styleUrl: './input-area.component.scss',
})
export class InputAreaComponent {

  value = model<string>('');
  touched = model<boolean>(false);
  disabled = input<boolean>(false);

  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  pt = input<TextareaPassThrough>(ClassicTextAreaPt.pt);
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
