import {Component, input, output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule, ButtonPassThrough} from 'primeng/button';

@Component({
  selector: 'classic-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
    <p-button
      [label]="label()"
      (onClick)="onClick.emit()"
      [pt]="pt">
    </p-button>
  `,
  styles: []
})
export class ClassicButtonComponent {

  label = input.required<string>();
  onClick = output();

  pt: ButtonPassThrough = {
    root: '!bg-third hover:!bg-third/30 hover:!border-secondary !text-white/60 !rounded-sm !px-6 !py-3 !border-1 !border-fourth transition-colors',
    label: '!font-medium',
    icon: '!mr-2'
  };

}
