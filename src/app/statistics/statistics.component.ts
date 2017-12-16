import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @Input() moodData: any;
  @Input() locationsData: any;


  constructor() {
    
  }

  ngOnInit() {
  }

}
