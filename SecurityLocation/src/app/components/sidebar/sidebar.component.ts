import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/occurrence-register', title: 'Cadastro de Ocorrência',  icon:'content_paste', class: '' },    
    { path: '/occurrence-search', title: 'Ver Ocorrências Por Bairro',  icon:'library_books', class: '' },
    { path: '/graph', title: 'Gráfico Por Bairro',  icon: 'dashboard', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
