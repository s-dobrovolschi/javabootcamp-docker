import { Component, OnInit } from '@angular/core';
import { PizzeriaService } from '../domain/service/pizzeria.service';
import { Order } from '../domain/model/Order';
import { Observable } from 'rxjs';
import { Customer } from '../domain/model/customer';

@Component({
  selector: 'app-pizzeria',
  templateUrl: './pizzeria.component.html',
  styleUrls: ['./pizzeria.component.css']
})
export class PizzeriaComponent implements OnInit {

  orders: Order[] = [];
  customers: Customer[] = [];
  orderInterval = 5000;
  private imgSrc: string;

  constructor(private pizzeriaService: PizzeriaService) { }

  ngOnInit() {


  }

  orderPizza() {
    this._clearMoods();

    Observable.interval(this.orderInterval).take(10).subscribe(
      () => {
        const orderStartTime = new Date(Date.now()).valueOf();
        this.customers.push({ name: 'Mario', timestamp: new Date(orderStartTime) });
        this.pizzeriaService.getPizza('Mario').subscribe(
          order => {
            const orderEndTime = new Date(Date.now()).valueOf();
            const waitTime = (orderEndTime.valueOf() - orderStartTime.valueOf()) / 1000;
            order.mood = this._setMood(waitTime);
            order.waitTime = waitTime;
            this.orders.push(order);

          });
      }
    );

  }

  private _setMood(waitTime: number): string {
    if (waitTime < 6) {
      this.imgSrc = 'assets/images/happy-customer.png';
    } else if (waitTime > 6 && waitTime < 10) {
      this.imgSrc = 'assets/images/unhappy-customer.png';
    } else if (waitTime > 10) {
      this.imgSrc = 'assets/images/angry-customer.png';
    }
    return this.imgSrc;
  }

  private _clearMoods() {
    this.imgSrc = null;
  }
}
