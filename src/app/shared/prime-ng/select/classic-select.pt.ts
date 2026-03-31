import {InputTextPassThrough} from 'primeng/types/inputtext';
import {SelectPassThrough} from 'primeng/select';
import {OverlayPassThrough} from 'primeng/types/overlay';
import {ClassicInputPt} from '../inputs/classic-input/classic-input.pt';
import {CheckboxPassThrough} from 'primeng/checkbox';


export class ClassicSelectPt
{

  public static overlay: OverlayPassThrough = {
    root: {
      class: 'bg-secondary! m-0! p-0! border-none! outline-none!'
    },
    content: {
      class: 'bg-secondary! m-0! p-0! border-none! outline-none!'
    },
  }

  public static pt: SelectPassThrough = {
    root : '!bg-fourth outline-none! border-2! border-secondary! focus:outline-none!',
    label : '!text-white',
    header : 'border-none! outline-none!',
    listContainer : '!border-none !outline-none',
    pcOverlay : {
      content: {
        class: ' [&_.p-multiselect-overlay]:!bg-fourth [&_.p-multiselect-overlay]:!border-2 [&_.p-multiselect-overlay]:!border-secondary  [&_.p-multiselect-overlay]:!p-0 !border-none !outline-none'
      }
    },
    pcFilter : {root: '!bg-fourth  !text-white !border-2 !border-secondary !outline-secondary !rounded-sm '},
    pcFilterIconContainer : {root : '!text-fourth'},
    filterIcon : {root : '!text-secondary !bg-yellow'},
    option : 'hover:!bg-secondary !text-white [&.p-focus]:!bg-fourth [&.p-multiselect-option-selected]:!bg-secondary [&_.p-checkbox-box]:!bg-secondary [&_.p-checkbox-box]:!border-secondary [&_.p-checkbox-checked_.p-checkbox-box]:!bg-secondary [&_.p-checkbox-checked_.p-checkbox-box]:!border-fifth',
    emptyMessage : '!text-white',
    dropdownIcon : '!text-white',
  }




}

