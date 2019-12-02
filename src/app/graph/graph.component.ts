import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import * as Chartist from 'chartist';
import { Occurrence } from '../occurrence';
import { OccurrenceService } from '../occurrence.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormsModule } from '@angular/forms';
import {googlemaps} from 'googlemaps';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  occurrence: Occurrence = new Occurrence();
  occurrenceList: Observable<any>;
  occurrenceBairro: Observable<any>;
  bairro: string = '';
  submitted = false;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  texto: string = "Mapa";
  filterBairro = '';
  local1: string;
  local2: string;
  local3: string;
  totalBairro1;
  inputBairro1;
  vBairro1;
  totalBairro2;
  inputBairro2;
  vBairro2;
  totalBairro3;
  inputBairro3;
  vBairro3;

  @ViewChild('search',{static: true})
  public searchElementRef: ElementRef;
  
  constructor(private occurrenceService: OccurrenceService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone
             ) { }

  // startAnimationForLineChart(chart){
  //     let seq: any, delays: any, durations: any;
  //     seq = 0;
  //     delays = 80;
  //     durations = 500;

  //     chart.on('draw', function(data) {
  //       if(data.type === 'line' || data.type === 'area') {
  //         data.element.animate({
  //           d: {
  //             begin: 600,
  //             dur: 700,
  //             from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
  //             to: data.path.clone().stringify(),
  //             easing: Chartist.Svg.Easing.easeOutQuint
  //           }
  //         });
  //       } else if(data.type === 'point') {
  //             seq++;
  //             data.element.animate({
  //               opacity: {
  //                 begin: seq * delays,
  //                 dur: durations,
  //                 from: 0,
  //                 to: 1,
  //                 easing: 'ease'
  //               }
  //             });
  //         }
  //     });

  //     seq = 0;
  // };
  // startAnimationForbarChart(chart){
  //     let seq2: any, delays2: any, durations2: any;

  //     seq2 = 0;
  //     delays2 = 80;
  //     durations2 = 500;
  //     chart.on('draw', function(data) {
  //       if(data.type === 'bar'){
  //           seq2++;
  //           data.element.animate({
  //             opacity: {
  //               begin: seq2 * delays2,
  //               dur: durations2,
  //               from: 0,
  //               to: 1,
  //               easing: 'ease'
  //             }
  //           });
  //       }
  //     });

  //     seq2 = 0;
  // };
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  

  public barChartLabels = ['Bairros'];
  public barChartLabelsTeste = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data:[], label: 'Bairros'}
  ];
  public bairros: Array<any> = [];
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    //   const dataDailySalesChart: any = {
    //       labels: ['Teste','Teste2'],
    //       series: [
    //           [12,10]
    //       ]
    //   };

    //  const optionsDailySalesChart: any = {
    //       lineSmooth: Chartist.Interpolation.cardinal({
    //           tension: 0
    //       }),
    //       low: 0,
    //       high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //       chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    //   }

    //   var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    //   // this.startAnimationForLineChart(dailySalesChart);


    //   /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    //   const dataCompletedTasksChart: any = {
    //       labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    //       series: [
    //           [230, 750, 450, 300, 280, 240, 200, 190]
    //       ]
    //   };

    //  const optionsCompletedTasksChart: any = {
    //       lineSmooth: Chartist.Interpolation.cardinal({
    //           tension: 0
    //       }),
    //       low: 0,
    //       high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //       chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    //   }

    //   var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    //   // start animation for the Completed Tasks Chart - Line Chart
    //   // this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
      this.occurrenceBairro = this.occurrenceService.getBairro();
      // var datawebsiteViewsChart = {
      //   labels: ['Teste', 'Teste2', 'Teste3'],
      //   series: [
      //     [10,15,8]

      //   ]
      // };
      // var optionswebsiteViewsChart = {
      //     axisX: {
      //         showGrid: false
      //     },
      //     low: 0,
      //     high: 1000,
      //     chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      // };
      // var responsiveOptions: any[] = [
      //   ['screen and (max-width: 640px)', {
      //     seriesbarDistance: 5,
      //     axisX: {
      //       labelInterpolationFnc: function (value) {
      //         return value[0];
      //       }
      //     }
      //   }]
      // ];
      // var websiteViewsChart = new Chartist.bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      // this.startAnimationForbarChart(websiteViewsChart);
  }

  onSubmit() {

    var datawebsiteViewsChart = {
      labels: ['Bairros'],
      series: [
        []
      ]
    };
    if(this.occurrence.local1 == null){
      this.local1 = 'Bairro 1';
    }else{
      this.local1 = this.occurrence.local1;
    }
    if(this.occurrence.local2 == null){
      this.local2 = 'Bairro 2';
    }else {
      this.local2 = this.occurrence.local2;
    }
    if(this.occurrence.local3 == null){
      this.local3 = 'Bairro 3';
    }else {
      this.local3 = this.occurrence.local3;
    }

    this.barChartLabels = [this.local1,this.local2,this.local3];

    this.occurrenceBairro.subscribe(bairros =>{
        this.bairros = bairros;
    

     this.inputBairro1 = this.local1;
     if(this.inputBairro1 != 'Bairro 1'){
      this.vBairro1 = this.bairros.filter(items =>{
        return items === this.inputBairro1;
      })
     }else{
      this.vBairro1 = 0;
      }

    this.inputBairro2 = this.local2;
    if(this.inputBairro2 != 'Bairro 2'){
      this.vBairro2 = this.bairros.filter(items =>{
     return items === this.inputBairro2;
      })
    }else{
    this.vBairro2 = 0;
    }

    this.inputBairro3 = this.local3;
    if(this.inputBairro3 != 'Bairro 3'){
      this.vBairro3 = this.bairros.filter(items =>{
     return items === this.inputBairro3;
      })
    }else{
    this.vBairro3 = 0;
    }

    if(this.vBairro1 != 0){
      this.totalBairro1 = this.vBairro1.length;
    } else{
      this.totalBairro1 = 0;
    }
    if(this.vBairro2 != 0){
      this.totalBairro2 = this.vBairro2.length;
    }else{
      this.totalBairro2 = 0;
    }
    if(this.vBairro3 != 0){
      this.totalBairro3 = this.vBairro3.length;
    }else{
      this.totalBairro3 = 0;
    }
    this.barChartData=[{data:[this.totalBairro1,this.totalBairro2, this.totalBairro3],label:'Bairros'}]

    })
  }

}

