import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ForecastService } from 'src/app/core/services/forecast.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private unsubscribe = new Subject<void>();

  showLoader: boolean = false;
  details: any;
  forecast: any;
  noData: boolean = false;
  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: ChartOptions = {
    responsive: true
  };
  lineChartColors: Color[] = [

    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    }
  ];

  // Set true to show legends
  lineChartLegend = true;

  // Define type of chart
  lineChartType = 'line';

  selectedDay: number = 7;
  selectedMethod: string = 'ARIMA';
  constructor(
    public forecastService: ForecastService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.showLoader = true;

    this.forecastService.getForecastData(this.selectedDay, this.selectedMethod)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          this.showLoader = false;
          this.details = data;
          this.forecast = Array(data.Hospitalization.length - this.selectedDay).fill(null).concat(data['Hospitalization'].slice(-this.selectedDay));
          this.details.Hospitalization = data.Hospitalization.slice(0, data.Hospitalization.length - this.selectedDay + 1);
          console.log(this.forecast)
          this.setChartData();
        },
        error => {
          this.showLoader = false;
        }
      );
  }

  setChartData() {

    this.lineChartData = [
      { data: this.details.Hospitalization, label: 'Hospitalization' },
      { data: this.forecast, label: 'Forecast' }
    ];
    this.lineChartLabels = this.details.Date;
  }


}


