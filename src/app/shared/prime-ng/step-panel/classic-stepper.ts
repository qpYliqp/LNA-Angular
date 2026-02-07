import {StepPanelPassThrough, StepPanelsPassThrough, StepPassThrough, StepperPassThrough} from 'primeng/types/stepper';

export class ClassicStepper {

  public static ptStepper : StepperPassThrough =
  {
    root: {class:'flex-1 w-full h-full flex flex-col min-h-0'},
    motion: {disabled: true,duration: 0, appear: false, enter: false}
  }

  public static ptStep : StepPassThrough =
  {
    root: {class: '!text-primary [&_.p-stepper-separator]:!bg-secondary'},
    number: {class:'!bg-primary !text-secondary !border-none [[data-p-active=true]_&]:!text-white/50'},
    title: {class:'!text-secondary [[data-p-active=true]_&]:!text-white/50'}
  }

  public static ptStepPanels : StepPanelsPassThrough =
  {
    root: { class: 'flex-1 flex flex-col w-full bg-third h-full min-h-0 overflow-hidden relative' }
  }

  public static ptStepPanel : StepPanelPassThrough =
  {
    root: {class: ' flex bg-black flex-col h-full w-full min-h-0 [&_.p-motion]:h-full [&_.p-motion]:!bg-third [&_.p-motion]:flex [&_.p-motion]:flex-col [&_.p-stepper-separator]:hidden'},
    contentWrapper: {class: 'flex flex-1 bg-third flex-col !h-full w-full min-h-0 overflow-hidden'},
    content: {class: 'flex-1 flex flex-col bg-third w-full h-full min-h-0 overflow-hidden'}
  }


}
