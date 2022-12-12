import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DailyForecastElement } from 'src/app/shared/models/daily-forecast-element.model';
import { WeatherUtils } from 'src/app/shared/utils/weather.utils';

@Component({
  selector: 'app-forecast-element',
  templateUrl: './forecast-element.component.html',
  styleUrls: ['./forecast-element.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastElementComponent {
  @Input() element : DailyForecastElement | null = null;

  getWeatherIcon(id: number): string{
    return WeatherUtils.getWeatherIcon(id);
  }
}
