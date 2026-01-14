import {Component, input} from '@angular/core';
import {Tooltip} from 'primeng/tooltip';
import {ClassicTooltipPt} from '../../../../shared/prime-ng/tooltip/classic-tooltip.pt';

@Component({
  selector: 'title-overview-card',
  imports: [
    Tooltip,
  ],
  templateUrl: './title-overview-card.html',
  styleUrl: './title-overview-card.scss',
})
export class TitleOverviewCard {

  title = input<string>('title');
  image = input<string>('/assets/mock/bs1.jpg');

  protected readonly ClassicTooltipPt = ClassicTooltipPt;
}
