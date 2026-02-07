import {Component, computed, input, model} from '@angular/core';
import {InputTextPassThrough} from 'primeng/types/inputtext';
import {ClassicInputPt} from '../../../prime-ng/inputs/classic-input/classic-input.pt';
import {ValidationError} from '@angular/forms/signals';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

@Component({
  selector: 'input-mask',
  providers: [provideNgxMask()],
  imports: [
    InputText,
    FloatLabel,
    NgxMaskDirective
  ],
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
            [dropSpecialCharacters]="true"
            [mask]="inputMask()"
            [validation]="true"
            pInputText
            placeholder="99/99/9999"
          />
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
          @if (showError() && hasRequiredError()) {
            Champs requis
          }
        </small>
      </div>
    </div>
  `,
  styleUrl: './input-mask.component.scss',
})
export class InputMaskComponent {


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

  inputMask = input.required<string>();

  showError = computed(() => {
    for(const e of this.errors())
    {
        console.log("erreur", e.kind)
    }
    return this.invalid() && this.submitted();
  });

  hasRequiredError = computed(() => {
    return this.errors().some(error => error.kind === 'required');
  });

}
