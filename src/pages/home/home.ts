import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from './../../providers/weather/weather';
import { HttpResponse } from '@angular/common/http';
import { ListPage } from '../list/list';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  now: object;
  fiveDayWeather: object;

  constructor(public navCtrl: NavController, public weatherProvider: WeatherProvider, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then( (resp) => {
      this.weatherProvider.getLocationWeather(resp.coords).then(data => {
        this.now = data;
      })

      this.weatherProvider.getLocationFiveDayWeather(resp.coords).then(data => {
        this.fiveDayWeather = data;
      })
    }).catch((error) => {
      console.log('error', error)
    });

  }

  openList() {
    this.navCtrl.push(ListPage, {
      fiveDayWeather: this.fiveDayWeather
    });
  }

}
