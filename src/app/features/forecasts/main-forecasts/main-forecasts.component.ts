import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, Subject, takeUntil } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { DailyForecast } from 'src/app/shared/models/daily-forecast.model';

@Component({
  selector: 'app-main-forecasts',
  templateUrl: './main-forecasts.component.html',
  styleUrls: ['./main-forecasts.component.css']
})
export class MainForecastsComponent implements OnInit, OnDestroy {
  private _subject$ = new Subject<void>;
  forecast: DailyForecast | null = null;


  constructor(public weatherService: WeatherService, private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(
      concatMap(params => {return this.weatherService.getForecast(params['zipcode'])}),
      takeUntil(this._subject$)
    )
    .subscribe(data => this.forecast = data);
  }

  ngOnDestroy(): void {
    this._subject$.next();
    this._subject$.complete();
  }

}
