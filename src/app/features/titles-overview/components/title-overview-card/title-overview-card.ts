import {Component, input} from '@angular/core';
import {Tooltip} from 'primeng/tooltip';
import {ClassicTooltipPt} from '../../../../shared/prime-ng/tooltip/classic-tooltip.pt';
import {BookPreview} from '../../../../shared/models/BookPreview';

@Component({
  selector: 'title-overview-card',
  imports: [
    Tooltip,
  ],
  templateUrl: './title-overview-card.html',
  styleUrl: './title-overview-card.scss',
})
export class TitleOverviewCard {

  book = input.required<BookPreview>();

  protected readonly ClassicTooltipPt = ClassicTooltipPt;
}
