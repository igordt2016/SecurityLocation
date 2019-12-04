import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FormsModule } from '@angular/forms';
import {googlemaps} from 'googlemaps';
import { Observable, of } from 'rxjs';

import { Occurrence } from '../occurrence';
import { OccurrenceService } from '../occurrence.service';

@Component({
  selector: 'app-occurrence-search',
  templateUrl: './occurrence-search.component.html',
  styleUrls: ['./occurrence-search.component.css']
})
export class OccurrenceSearchComponent implements OnInit {
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


 

  @ViewChild('search',{static: true})
  public searchElementRef: ElementRef;


  constructor(private occurrenceService: OccurrenceService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone
  ) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['BAIRROS'];
  public barChartLabelsTeste = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data:[], label: 'Bairros'}
  ];
  
  public bairros: Array<any> = [];

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.getAddress(this.latitude, this.longitude);
        this.zoom = 12;
      });
    });
    
    });

    this.occurrenceList = this.occurrenceService.getAll();
    this.occurrenceBairro = this.occurrenceService.getBairro();
    this.getBairro();
    
  }
 
  save() {
    this.occurrenceService.createOccurrence(this.occurrence);
    this.occurrence = new Occurrence();
  }
  
  beforeSave(){
    this.occurrence.local = this.address;
    this.occurrence.bairro = this.bairro;
    this.save();

  }


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);

  }


  getAddress(latitude, longitude) {

    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 16;
          this.address = results[0].formatted_address;
          this.bairro = results[0].address_components[2].long_name;     
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
        
      }
    });
  }
  getBairro(){

    this.occurrenceBairro.subscribe(bairros =>{
      this.bairros = bairros;
    
    })
  
  }

}