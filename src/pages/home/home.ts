import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from './../../providers/weather/weather';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public weatherProvider: WeatherProvider) {

  }

}
