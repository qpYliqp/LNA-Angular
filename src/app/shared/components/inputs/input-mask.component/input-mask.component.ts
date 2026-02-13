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
  template: `
    <div class="flex flex-col w-full md:w-auto">
      <div class="relative">
        <p-floatlabel [pt]="{root : '!text-white'}">
          <input
            pInputText
            [(ngModel)]="value"
            [mask]="inputMask()"
            [dropSpecialCharacters]="true"

            [disabled]="disabled()"
            [readonly]="readonly()"
            [pt]="pt()"/>
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
    </div>
  `,
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
