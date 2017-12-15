import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Order } from '../domain/model/Order';

@Component({
  selector: 'app-online-orders',
  templateUrl: './online-orders.component.html',
  styleUrls: ['./online-orders.component.css']
})
export class OnlineOrdersComponent implements OnInit {

  @Input() orders: Order[];

  constructor() { }

  ngOnInit() {
  }

}
