import { Component } from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {ClassicStepperPt} from '../../../prime-ng/step-panel/classic-stepper.pt';
import {ClassicButtonPt} from '../../../prime-ng/buttons/classic-button/classic-button.pt';
import {BookDetailsFormComponent} from './book-details.form.component/book-details.form.component';
import {BookAuthorFormComponent} from './book-author.form.component/book-author.form.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'create-book-form',
  imports: [
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    Button,
    ClassicButtonPt,
    BookDetailsFormComponent,
    BookAuthorFormComponent
  ],
  templateUrl: './create-book.form.component.html',
  styleUrl: './create-book.form.component.scss',
})
export class CreateBookFormComponent {

  currentStep: number = 0;
  submitSignal = new Subject<number>();

  next()
  {
    this.submitSignal.next(this.currentStep);
  }

  prev()
  {
    this.currentStep--;
  }


  protected readonly ClassicButtonComponent = ClassicButtonPt;
  protected readonly ClassicStepper = ClassicStepperPt;
}
