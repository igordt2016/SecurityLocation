import { Routes } from '@angular/router';
import { OccurrenceRegisterComponent } from '../../occurence-register/occurrence-register.component';
import { OccurrenceSearchComponent } from '../../occurrence-search/occurrence-search.component';
import { GraphComponent } from '../../graph/graph.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component:OccurrenceRegisterComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'OccurrenceSearch',
    //         component: OccurrenceSearchComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'occurrence-register',   component:OccurrenceRegisterComponent },
    { path: 'occurrence-search',     component: OccurrenceSearchComponent },
    { path: 'graph',     component: GraphComponent },
];
