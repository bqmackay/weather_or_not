import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from './../../providers/weather/weather';
import { HttpResponse } from '@angular/common/http';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  now: object;
  fiveDayWeather: object;

  constructor(public navCtrl: NavController, public weatherProvider: WeatherProvider) {
    this.weatherProvider.getCityWeather("Provo").then(data => {
      this.now = data;
    })
  }

}
