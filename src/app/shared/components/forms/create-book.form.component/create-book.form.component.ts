import { Component } from '@angular/core';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Button} from 'primeng/button';
import {StepPanneleeee} from '../../../prime-ng/step-panel/StepPannel';
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

  activeStep = 1;
  currentStep: number = 0;


  // PT pour le Stepper principal (conteneur root)
  stepperPT = {
    root: {
      class: 'border-4 border-dashed border-purple-500 bg-purple-50 p-6 rounded-xl shadow-lg',
      'data-pt': 'stepper.root',
      style: { position: 'relative' }
    }
  };

  // PT pour la liste des steps
  stepListPT = {
    root: {
      class: 'border-4 border-dashed border-blue-500 bg-blue-50 p-4 rounded-lg mb-6',
      'data-pt': 'stepList.root'
    }
  };

  // PT pour chaque step (fonction dynamique selon l'état)
  getStepPT(stepValue: number) {
    const isActive = this.activeStep === stepValue;
    const isCompleted = this.activeStep > stepValue;

    return {
      // Root du step
      root: {
        class: [
          'border-4 border-dashed border-green-500 bg-green-50 p-3 rounded-lg',
          'transition-all duration-300',
          isActive && 'scale-105 shadow-xl'
        ],
        'data-pt': 'step.root',
        'data-step-value': stepValue
      },

      // Header (zone cliquable)
      header: {
        class: [
          'border-4 border-dashed border-orange-500 bg-orange-50 p-3 rounded cursor-pointer',
          'hover:bg-orange-100 transition-colors',
          'flex items-center gap-3'
        ],
        'data-pt': 'step.header'
      },

      // Number (badge numérique)
      number: {
        class: [
          'border-4 border-dashed border-pink-500 bg-pink-50',
          'w-12 h-12 rounded-full flex items-center justify-center',
          'font-bold text-lg transition-all',
          isActive && 'bg-blue-500 text-white border-blue-700 scale-110',
          isCompleted && 'bg-green-500 text-white border-green-700',
          !isActive && !isCompleted && 'bg-gray-200 text-gray-600 border-gray-400'
        ],
        'data-pt': 'step.number'
      },

      // Title (texte du step)
      title: {
        class: [
          'border-2 border-dashed border-yellow-500 bg-yellow-50 px-2 py-1 rounded',
          'font-semibold transition-colors',
          isActive && 'text-blue-700',
          isCompleted && 'text-green-700',
          !isActive && !isCompleted && 'text-gray-500'
        ],
        'data-pt': 'step.title'
      },

      // Separator (ligne entre les steps)
      separator: {
        class: [
          'border-4 border-dashed border-red-500 bg-red-50',
          'flex-1 h-1 mx-2 rounded',
          'transition-all',
          isCompleted && 'bg-green-400 border-green-600',
          !isCompleted && 'bg-gray-300 border-gray-400'
        ],
        'data-pt': 'step.separator'
      }
    };
  }

  // PT pour le conteneur des panels
  stepPanelsPT = {
    root: {
      class: 'border-4 border-dashed border-indigo-500 bg-indigo-50 p-4 rounded-lg mt-6',
      'data-pt': 'stepPanels.root'
    }
  };

  // PT pour chaque panel individuel
  stepPanelPT = {
    root: {
      class: 'border-4 border-dashed border-teal-500 bg-teal-50 p-4 rounded-lg',
      'data-pt': 'stepPanel.root'
    },
    content: {
      class: 'border-4 border-dashed border-cyan-500 bg-cyan-50 p-6 rounded-lg',
      'data-pt': 'stepPanel.content'
    },
    transition: {
      enterFromClass: 'opacity-0 translate-x-4',
      enterActiveClass: 'transition-all duration-300',
      enterToClass: 'opacity-100 translate-x-0',
      leaveFromClass: 'opacity-100',
      leaveActiveClass: 'transition-all duration-200',
      leaveToClass: 'opacity-0'
    }
  };

  onFinish() {
    alert('🎉 Processus terminé ! Étape active: ' + this.activeStep);
    console.log('Stepper completed at step:', this.activeStep);
  }
}
