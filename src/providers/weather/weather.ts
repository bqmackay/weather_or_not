import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NetworkProvider } from '../network-provider'

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider extends NetworkProvider {

  constructor(public http: HttpClient) {
    super(http);
  }

  getCityWeather(city_name) {
    return this.get('weather', 'q=' + city_name);
  }

  getFiveDayWeather(city_name) {
    return this.get('forecast', 'q=' + city_name);
  }

}
