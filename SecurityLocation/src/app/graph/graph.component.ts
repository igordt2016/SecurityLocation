import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import * as Chartist from "chartist";
import { Occurrence } from "../occurrence";
import { OccurrenceService } from "../occurrence.service";
import { MapsAPILoader, MouseEvent } from "@agm/core";
import { FormsModule } from "@angular/forms";
import { googlemaps } from "googlemaps";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"]
})
export class GraphComponent implements OnInit {
  occurrence: Occurrence = new Occurrence();
  occurrenceList: Observable<any>;
  occurrenceBairro: Observable<any>;
  bairro: string = "";
  submitted = false;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  texto: string = "Mapa";
  filterBairro = "";
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

  @ViewChild("search", { static: true })
  public searchElementRef: ElementRef;

  constructor(
    private occurrenceService: OccurrenceService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ["Bairros"];
  public barChartLabelsTeste = [];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [{ data: [], label: "Bairros" }];
  public bairros: Array<any> = [];
  ngOnInit() {
    this.occurrenceBairro = this.occurrenceService.getBairro();
  }

  onSubmit() {
    var datawebsiteViewsChart = {
      labels: ["Bairros"],
      series: [[]]
    };
    if (this.occurrence.local1 == null) {
      this.local1 = "Bairro 1";
    } else {
      this.local1 = this.occurrence.local1;
    }
    if (this.occurrence.local2 == null) {
      this.local2 = "Bairro 2";
    } else {
      this.local2 = this.occurrence.local2;
    }
    if (this.occurrence.local3 == null) {
      this.local3 = "Bairro 3";
    } else {
      this.local3 = this.occurrence.local3;
    }

    this.barChartLabels = [this.local1, this.local2, this.local3];

    this.occurrenceBairro.subscribe(bairros => {
      this.bairros = bairros;

      this.inputBairro1 = this.local1;
      if (this.inputBairro1 != "Bairro 1") {
        this.vBairro1 = this.bairros.filter(items => {
          return items === this.inputBairro1;
        });
      } else {
        this.vBairro1 = 0;
      }

      this.inputBairro2 = this.local2;
      if (this.inputBairro2 != "Bairro 2") {
        this.vBairro2 = this.bairros.filter(items => {
          return items === this.inputBairro2;
        });
      } else {
        this.vBairro2 = 0;
      }

      this.inputBairro3 = this.local3;
      if (this.inputBairro3 != "Bairro 3") {
        this.vBairro3 = this.bairros.filter(items => {
          return items === this.inputBairro3;
        });
      } else {
        this.vBairro3 = 0;
      }

      if (this.vBairro1 != 0) {
        this.totalBairro1 = this.vBairro1.length;
      } else {
        this.totalBairro1 = 0;
      }
      if (this.vBairro2 != 0) {
        this.totalBairro2 = this.vBairro2.length;
      } else {
        this.totalBairro2 = 0;
      }
      if (this.vBairro3 != 0) {
        this.totalBairro3 = this.vBairro3.length;
      } else {
        this.totalBairro3 = 0;
      }
      this.barChartData = [
        {
          data: [this.totalBairro1, this.totalBairro2, this.totalBairro3],
          label: "Bairros"
        }
      ];
    });
  }

  showButtons() {
    console.log($(window).width());
    if ($(window).width() < 991) {
      return true;
    }
    return false;
  }
}
