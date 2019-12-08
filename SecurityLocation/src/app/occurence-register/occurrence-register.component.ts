import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { MapsAPILoader, MouseEvent } from "@agm/core";
import { googlemaps } from "googlemaps";
import { FormsModule } from "@angular/forms";

import { Occurrence } from "../occurrence";
import { OccurrenceService } from "../occurrence.service";

@Component({
  selector: "app-occurrence-register",
  templateUrl: "./occurrence-register.component.html",
  styleUrls: ["./occurrence-register.component.css"]
})
export class OccurrenceRegisterComponent implements OnInit {
  occurrence: Occurrence = new Occurrence();
  submitted = false;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  bairro: string;
  private geoCoder;
  texto: string = "Mapa";
  myDate = new Date().toJSON("yyyy/mm/dd");

  @ViewChild("search", { static: true })
  public searchElementRef: ElementRef;
  public iconUrl = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
  constructor(
    private occurrenceService: OccurrenceService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
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
  }

  save() {
    this.occurrenceService.createOccurrence(this.occurrence);
    this.occurrence = new Occurrence();
  }

  beforeSave() {
    this.occurrence.local = this.address;
    this.occurrence.bairro = this.bairro;
    this.save();
  }

  onSubmit() {
    if (this.occurrence.tpOcorrencia == "") {
      // alert("Por Favor, seleciona o tipo da Ocorrência.");
      window.alert("Por Favor, seleciona o tipo da Ocorrência.");
    } else if (this.occurrence.data == null) {
      // alert("Por Favor, informe a data.");
      window.alert("Por Favor, informe a data.");
    } else if (this.occurrence.data.toString() > this.myDate.toString()) {
      // alert("A data da Ocorrência não pode ser maior que hoje.");
      window.alert("A data da Ocorrência não pode ser maior que hoje.");
    } else if (this.occurrence.temPolicia == "") {
      // alert("Informe se houve comparecimento da polícia.");
      window.alert("Informe se houve comparecimento da polícia.");
    } else {
      this.submitted = true;
      this.beforeSave();
    }
    if (this.submitted == true) {
      window.alert("Cadastro Realizado com Sucesso!");
      this.refresh();
    }
  }

  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 16;
            this.address = results[0].formatted_address;
            this.bairro = results[0].address_components[2].long_name;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  refresh(): void {
    window.location.reload();
  }

  showLinks() {
    console.log($(window).width());
    if ($(window).width() < 991) {
      return true;
    }
    return false;
  }
}
