
import {ClassicInputPt} from '../../inputs/classic-input/classic-input.pt';
import {DatePickerPassThrough} from 'primeng/datepicker';
import {ButtonPassThrough} from 'primeng/button';

export class ClassicDatePickerPt
{

  private static DatePickerButton : ButtonPassThrough =
  {
      root : '!text-white hover:!bg-secondary'
  }

    public static pt: DatePickerPassThrough = {
      panel : '!bg-primary !border-secondary',
      header : '!bg-primary !text-white !border-secondary',
      selectMonth : '!text-white hover:!bg-secondary',
      selectYear : '!text-white hover:!bg-secondary',
      year: '!text-white hover:!bg-secondary',
      month: '!text-white hover:!bg-secondary',
      day : "!text-white hover:!bg-secondary [.p-datepicker-today_&]:!bg-secondary [&.p-datepicker-day-selected]:!bg-blue",
      weekDay : "!text-white",
      pcInputText: ClassicInputPt.pt,
      pcNextButton : this.DatePickerButton,
      pcPrevButton : this.DatePickerButton,
    }




}
