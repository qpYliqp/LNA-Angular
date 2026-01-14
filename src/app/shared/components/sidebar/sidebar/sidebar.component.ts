import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';

interface SidebarButton {
  label: string;
  urlPath: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  sidebarButtons: SidebarButton[] = [
    {label: "Tableau de bord", urlPath: "/board", icon: "pi pi-th-large"},
    {label: "Calendrier", urlPath: "/calendar", icon: "pi pi-calendar"},
    {label: "Titres", urlPath: "/titles", icon: "pi pi-eye"},
  ]

}
