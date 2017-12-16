import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/Order';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PizzeriaService {

    switchNode = true;
    constructor(private http: HttpClient) { }

    /* getPizza(customer: string): Observable<Order> {
        const node = this.switchNode ? '/node-1' : '/node-2';
        const apiURI = node + '/api/order/pizza?customer=' + customer;
        console.log('Ordering pizza - ' + new Date(Date.now()).toISOString());
        this.switchNode = !this.switchNode;
        return this.http.get<Order>(apiURI);
    } */


    getPizza(customer: string): Observable<Order> {
        const node = '/node-1';
        const apiURI = node + '/api/order/pizza?customer=' + customer;
        console.log('Ordering pizza - ' + new Date(Date.now()).toISOString());
        return this.http.get<Order>(apiURI);
    }

}
