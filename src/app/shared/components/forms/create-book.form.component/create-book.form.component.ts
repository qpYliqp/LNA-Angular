import { Component } from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {ClassicStepper} from '../../../prime-ng/step-panel/classic-stepper';
import {ClassicButtonComponent} from '../../../prime-ng/buttons/classic-button/classic-button.component';
import {BookDetailsFormComponent} from './book-details.form.component/book-details.form.component';
import {BookAuthorFormComponent} from './book-author.form.component/book-author.form.component';

@Component({
  selector: 'create-book-form',
  imports: [
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    Button,
    ClassicButtonComponent,
    BookDetailsFormComponent,
    BookAuthorFormComponent
  ],
  templateUrl: './create-book.form.component.html',
  styleUrl: './create-book.form.component.scss',
})
export class CreateBookFormComponent {

  currentStep: number = 0;

  next()
  {
    this.currentStep++;
  }

  prev()
  {
    this.currentStep--;
  }


  protected readonly ClassicButtonComponent = ClassicButtonComponent;
  protected readonly ClassicStepper = ClassicStepper;
}
