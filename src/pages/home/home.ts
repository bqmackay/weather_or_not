import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from './../../providers/weather/weather';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: object;

  constructor(public navCtrl: NavController, public weatherProvider: WeatherProvider) {
    var response = this.weatherProvider.getCityWeather('Provo')
    response.subscribe(data => {
      console.log(data);
      this.weather = data.body;
    }, error => {
      console.log("NOPE");
    })
  }

}
