import { HttpClient } from '@angular/common/http';

export class NetworkProvider {

  baseUrl: string = 'http://api.openweathermap.org/data/2.5/'
  api_params: string = '?APPID=985fd02cf5bd424f5c6e2b61f7397987&units=imperial&';

  constructor(public http: HttpClient) {}

  get(path, params) {
    const fullPath = this.baseUrl + path + this.api_params + params;
    return this.http.get(fullPath, { observe: 'response' });
  }

}
