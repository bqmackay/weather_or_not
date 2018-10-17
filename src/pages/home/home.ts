import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from './../../providers/weather/weather';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  now: object;
  fiveDayWeather: object;

  constructor(public navCtrl: NavController, public weatherProvider: WeatherProvider) {
    if (localStorage["now"] == null) {
      var response = this.weatherProvider.getCityWeather('Provo')
      response.subscribe(data => {
        console.log(data);
        localStorage["now"] = JSON.stringify(data.body);
        this.now = data.body;
        this.now.weather[0].icon = "http://openweathermap.org/img/w/" + this.now.weather[0].icon + ".png";
      }, error => {
        console.log("No weather returned");
      })
    } else {
      this.now = JSON.parse(localStorage["now"]);
      this.now.weather[0].icon = "http://openweathermap.org/img/w/" + this.now.weather[0].icon + ".png";
      this.now.dt_txt = new Date();
      console.log(this.now);
    }

    if (localStorage["forecast"] == null) {
      var weekResponse = this.weatherProvider.getFiveDayWeather('Provo')
      weekResponse.subscribe(data => {
        console.log(data);
        localStorage["forecast"] = JSON.stringify(data.body.list);
        this.fiveDayWeather = data.body.list;
      }, error => {
        console.log("No 5 day forcast returned");
      })
    } else {
      this.fiveDayWeather = JSON.parse(localStorage["forecast"])
      console.log(this.fiveDayWeather);
    }

    //Processing Date Info
    for (let day of this.fiveDayWeather) {
      var date = new Date(day.dt_txt);
      var month = date.getMonth() + 1;
      var dayOfMonth = date.getDate();
      var hour = date.getHours();
      var isMorning = hour < 12;
      debugger
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

  }


}
