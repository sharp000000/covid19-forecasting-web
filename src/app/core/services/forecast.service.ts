import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ForecastService {

  constructor(
    private http: HttpClient
  ) { }

  getForecastData(numdays: number, method: string): Observable<any> {

    const headers = new HttpHeaders({
      timeout: '60000',
      'Content-Type': 'application/json'
    });

    const params = new HttpParams()
      .append('numdays', numdays.toString())
      .append('method', method);
    // https://hospitalizationapp.azurewebsites.net/api/HttpTrigger
    return this.http.get('https://hospitalizationforecast.azurewebsites.net/api/HttpTrigger', { headers, params });
  }

}
