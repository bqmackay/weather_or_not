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
    return new Promise(resolve => {
      this.get('weather', 'q=' + city_name).then(body => {
        var weather = this.formatWeatherObject(body);
        resolve(weather);
      })
    })
  }

  formatWeatherObject(weatherObject) {
    weatherObject.weather[0].icon = "http://openweathermap.org/img/w/" + weatherObject.weather[0].icon + ".png";
    weatherObject.dt_txt = new Date();
    return weatherObject;
  }

  processForecastData(data) {
    for (let day of data) {
      var date = new Date(day.dt_txt);
      var offset = date.getTimezoneOffset() / 60;
      var hour = date.getHours() - offset;
      date.setHours(hour);
      var hour = date.getHours();
      var isMorning = hour < 12;

      if (hour > 12) {
        hour = hour - 12;
      }
      if (hour == 0) {
        hour = 12;
      }
      day.dt_txt = hour + (isMorning ? "AM" : "PM");

      //format temp
      day.main.temp = parseInt(day.main.temp);

      day.weather[0].icon = "http://openweathermap.org/img/w/" + day.weather[0].icon + ".png";
    }
    return data;
  }

}
