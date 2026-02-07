import {ChangeDetectionStrategy, Component, computed, input, model} from '@angular/core';
import {DisabledReason, FormValueControl, ValidationError} from '@angular/forms/signals';
import {ClassicInputPt} from '../../../prime-ng/inputs/classic-input/classic-input.pt';
import {InputTextPassThrough} from 'primeng/types/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'input-text',
  template: `
    <div class="flex flex-col w-full md:w-auto">
      <div class="relative">
        <p-floatlabel [pt]="{root : '!text-white'}">
          <input
            #inputEl
            [value]="value()"
            (input)="value.set(inputEl.value)"
            [disabled]="disabled()"
            [readonly]="readonly()"
            [class.invalid]="invalid()"
            [attr.aria-invalid]="invalid()"
            (blur)="touched.set(true)"
            autocomplete="off"
            [pt]="pt()"
            pInputText/>
          <label
            [class]="showError() ? '!text-l-red' : '!text-secondary'"
            class="text-sm">
            Titre
          </label>
        </p-floatlabel>
      </div>
      <div class="h-6 flex justify-end items-start">
        <small
          [class]="invalid() ? 'opacity-100' : 'opacity-0'"
          class="text-l-red text-xs">
          @if (showError()) {
            Champs requis
          }
        </small>
      </div>
    </div>
  `,
  imports: [
    FloatLabel,
    InputText
  ],
  styleUrl: './input-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    return this.touched() || this.submitted();
  });

}
