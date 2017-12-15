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
  orderInterval: number = 5000;
  nrClients = 50;
  private imgSrc: string;
  private happy = 0;
  private unhappy = 0;
  private angry = 0;
  moodData: any;
  private _sub: any;

  constructor(private pizzeriaService: PizzeriaService) { }

  ngOnInit() {


  }

  stopOrderPizza() {
    this._sub.unsubscribe();
  }

  startOrderPizza() {
    this._clearMoods();

    this._sub = Observable.interval(this.orderInterval).take(this.nrClients).subscribe(
      () => {
        const orderStartTime = new Date(Date.now()).valueOf();
        this.customers.push({ name: 'Mario', timestamp: new Date(orderStartTime) });
        this.pizzeriaService.getPizza('Mario').subscribe(
          order => {
            const orderEndTime = new Date(Date.now()).valueOf();
            const waitTime = (orderEndTime.valueOf() - orderStartTime.valueOf()) / 1000;
            order.mood = this._setMood(waitTime);
            order.waitTime = waitTime;
            const tempOrderArray: Order[] = [order];
            this.orders.push.apply(this.orders, tempOrderArray);

          });
      }
    );

  }

  private _setMood(waitTime: number): string {
    if (waitTime < 6) {
      this.imgSrc = 'assets/images/happy-customer.png';
      this.happy = this.happy + 1;
    } else if (waitTime > 6 && waitTime < 10) {
      this.imgSrc = 'assets/images/unhappy-customer.png';
      this.unhappy = this.unhappy + 1;
    } else if (waitTime > 10) {
      this.imgSrc = 'assets/images/angry-customer.png';
      this.angry = this.angry + 1;
    }

    this.moodData = {
      labels: ['Angry', 'Unhappy', 'Happy'],
      datasets: [
        {
          data: [this.angry, this.unhappy, this.happy],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };

    return this.imgSrc;
  }

  private _clearMoods() {
    this.imgSrc = null;
  }
}
