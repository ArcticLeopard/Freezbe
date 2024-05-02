import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-active-projects',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './active-projects.component.html',
  styleUrl: './active-projects.component.scss'
})
export class ActiveProjectsComponent {
  open : boolean = true;
  projects = [
    {
      name: 'Self-teaching Piano Playing',
      color: '#007bff'
    },
    {
      name: 'Mastering English',
      color: '#6610f2'
    },
    {
      name: 'Mastering German',
      color: '#6f42c1'
    },
    {
      name: 'Mastering French',
      color: '#e83e8c'
    },
    {
      name: 'Writing a Novel',
      color: '#dc3545'
    },
    {
      name: 'Travel Around the World',
      color: '#fd7e14'
    },
    {
      name: 'Starting Own Business',
      color: '#ffc107'
    },
    {
      name: 'Getting a Doctorate',
      color: '#28a745'
    },
    {
      name: 'Marathon Training',
      color: '#20c997'
    },
    {
      name: 'Learning to Cook',
      color: '#17a2b8'
    },


    {
      name: 'Build House Yourself',
      color: '#007bff'
    },
    {
      name: 'Complete Photography Course',
      color: '#6610f2'
    },
    {
      name: 'Charity Project',
      color: '#6f42c1'
    },
    {
      name: 'Mastering Meditation',
      color: '#e83e8c'
    },
    {
      name: 'Creating Original Documentary',
      color: '#dc3545'
    },
    {
      name: 'Public Speaking Skills Training',
      color: '#fd7e14'
    },
    {
      name: 'Conquering Stock Market',
      color: '#ffc107'
    },
    {
      name: 'Making Own Beer',
      color: '#28a745'
    },
    {
      name: 'Learning Breakdance',
      color: '#20c997'
    },
    {
      name: 'Cultivating Hydroponic Vegetables' ,
      color: '#17a2b8'
    },
    {
      name: 'Own Fashion Show',
      color: '#007bff'
    }
  ];
}
