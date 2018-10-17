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
      if (localStorage["now"] != null) {
        var now = JSON.parse(localStorage["now"]);
        now = this.formatWeatherObject(now);
        resolve(now);
      } else {
        this.get('weather', 'q=' + city_name).subscribe(data => {
          var now = data.body
          localStorage["now"] = JSON.stringify(now);
          now = this.formatWeatherObject(now);
          resolve(now);
        }, error => {
          console.log("No weather returned");
        })
      }
    })
  }

  getFiveDayWeather(city_name) {
    return new Promise(resolve => {
      if (localStorage["forecast"] == null) {
        this.get('forecast', 'q=' + city_name).subscribe(data => {
          var forecast = this.processForecastData(data.body.list);
          localStorage["forecast"] = JSON.stringify(forecast);
          resolve(forecast);
        }, error => {
          console.log("No 5 day forcast returned");
        })
      } else {
        resolve(JSON.parse(localStorage["forecast"]))
      }
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
