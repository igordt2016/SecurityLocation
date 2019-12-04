import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { OccurrenceRegisterComponent } from '../../occurence-register/occurrence-register.component';
import { OccurrenceSearchComponent } from '../../occurrence-search/occurrence-search.component';
import { GraphComponent } from '../../graph/graph.component';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';




import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcEXXYGWmv1Mu_OarfCW5MdGmKeKta34A',
      libraries: ['places']
    })
  ],
  declarations: [
   OccurrenceRegisterComponent,
   OccurrenceSearchComponent,
   GraphComponent,
  ]
})

export class AdminLayoutModule {}
