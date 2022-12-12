import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { concatMap, Observable, Subject, takeUntil } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { DailyForecast } from 'src/app/shared/models/daily-forecast.model';
import { WeatherUtils } from 'src/app/shared/utils/weather.utils';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastsListComponent {

  @Input() forecast: DailyForecast | null = null;

  constructor() {}

}
