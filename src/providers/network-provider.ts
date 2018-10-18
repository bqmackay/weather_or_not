import { HttpClient } from '@angular/common/http';

export class NetworkProvider {

  baseUrl: string = 'http://api.openweathermap.org/data/2.5/';
  api_params: string = '?APPID=985fd02cf5bd424f5c6e2b61f7397987&units=imperial&';
  cache: boolean = true;

  constructor(public http: HttpClient) {}

  get(path, params) {
    return new Promise(resolve => {
      const cacheKey = path;
      const fullPath = this.baseUrl + path + this.api_params + params;
      if (localStorage[cacheKey] != null && this.cache) {
        console.log("loading from cache: " + fullPath)
        var body = JSON.parse(localStorage[cacheKey]);
        resolve(body);
      } else {
        console.log("loading from network: " + fullPath)
        return this.http.get(fullPath, { observe: 'response' }).subscribe(data => {
          var body = data.body;
          localStorage[cacheKey] = JSON.stringify(body);
          resolve(body);
        }, error => {
          console.log("Error gathering data for " + fullPath);
        });
      }
    })
  }

}
