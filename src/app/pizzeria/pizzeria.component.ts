import { Component, OnInit } from '@angular/core';
import { PizzeriaService } from '../domain/service/pizzeria.service';
import { Order } from '../domain/model/Order';
import { Observable } from 'rxjs';
import { Customer } from '../domain/model/customer';
import { Location } from '../domain/model/location';

@Component({
  selector: 'app-pizzeria',
  templateUrl: './pizzeria.component.html',
  styleUrls: ['./pizzeria.component.css']
})
export class PizzeriaComponent implements OnInit {

  orders: Order[] = [];
  customers: Customer[] = [];
  orderInterval = 5000;
  totalOrders = 50;
  deliveryCapacity = 5;
  private imgSrc: string;
  private happy = 0;
  private unhappy = 0;
  private angry = 0;
  moodData: any;
  locationsData: any;
  private _sub: any;
  private _locations: Map<string, Location> = new Map([['', null]]);

  constructor(private pizzeriaService: PizzeriaService) { }

  ngOnInit() {


  }

  stopOrderPizza() {
    this._sub.unsubscribe();
  }

  startOrderPizza() {
    this._clearMoods();

    this._sub = Observable.interval(this.orderInterval).take(this.totalOrders).subscribe(
      () => {
        const orderStartTime = new Date(Date.now()).valueOf();
        const customerName = this._getRandomCustomerName();
        this.customers.push({ name: customerName, timestamp: new Date(orderStartTime) });
        this.pizzeriaService.getPizza(customerName, this.deliveryCapacity).subscribe(
          order => {
            const orderEndTime = new Date(Date.now()).valueOf();
            const waitTime = (orderEndTime.valueOf() - orderStartTime.valueOf());
            order.mood = this._setMood(waitTime);
            this._setLocationsData(order);
            order.waitTime = waitTime;
            const tempOrderArray: Order[] = [order];
            this.orders.push.apply(this.orders, tempOrderArray);

          });
      }
    );

  }



  private _getRandomCustomerName(): string {
    enum Names {
      Camila, Aisha, Daisy, Dakota, Fiona, Kay, Kelis, Lucy, Mercedes, Roberta, Tasha, Zoya
    }

    const len = (Object.keys(Names).length / 2) - 1; // returns the length
    // calculate the random number
    const item = (Math.floor(Math.random() * len) + 0);
    return Names[item];
  }

  private _setMood(waitTime: number): string {
    if (waitTime <= 500) {
      this.imgSrc = 'assets/images/happy-customer.png';
      this.happy = this.happy + 1;
    } else if (waitTime > 500 && waitTime <= 1000) {
      this.imgSrc = 'assets/images/unhappy-customer.png';
      this.unhappy = this.unhappy + 1;
    } else if (waitTime > 1000) {
      this.imgSrc = 'assets/images/angry-customer.png';
      this.angry = this.angry + 1;
    }

    this.moodData = {
      labels: ['Happy', 'Unhappy', 'Angry'],
      datasets: [
        {
          data: [this.happy, this.unhappy, this.angry],
          backgroundColor: [
            '#FFCE56',
            '#36A2EB',
            '#FF6384'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#36A2EB',
            '#FF6384'
          ]
        }]
    };

    return this.imgSrc;
  }

  private _setLocationsData(order: Order): void {
    if (this._locations.get(order.location)) {
      this._locations.get(order.location).count = ++this._locations.get(order.location).count;
    } else {
      const color = this._getRandomColor();
      const location: Location = { ipAddr: order.location, name: order.location, count: 1, color };
      this._locations.set(location.ipAddr, location);
    }
    console.log(this._locations);

    const datasets = [];
    datasets.push({
      label: '',
      backgroundColor: '#FFFFFF',
      borderColor: '#FFFFFF',
      data: [0]
    });
    this._locations.forEach(location => {
      if (location) {
        datasets.push({
          label: location.ipAddr,
          backgroundColor: location.color,
          borderColor: location.color,
          data: [location.count]
        });
      }

    }
    );

    this.locationsData = {
      labels: ['Containers'],
      datasets: datasets
    };
  }

  private _getRandomColor(): string {
    enum Colors {
      '#b3ff1a', '#3399ff', '#ff9933', '#ff66ff', '#9966ff'
    }

    const len = (Object.keys(Colors).length / 2) - 1; // returns the length
    // calculate the random number
    const item = (Math.floor(Math.random() * len) + 0);
    return Colors[item];
  }

  private _clearMoods() {
    this.imgSrc = null;
  }
}
