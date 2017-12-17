import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/Order';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PizzeriaService {

    switchNode = true;
    constructor(private http: HttpClient) { }

    getPizza(customer: string, deliveryCapacity: number): Observable<Order> {
        const apiURI = '/api/order/pizza?customer=' + customer + '&deliveryCapacity=' + deliveryCapacity;
        console.log('Ordering pizza - ' + new Date(Date.now()).toISOString());
        return this.http.get<Order>(apiURI);
    }

}
