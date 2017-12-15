import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PizzeriaService } from './domain/service/pizzeria.service';
import { PizzeriaComponent } from './pizzeria/pizzeria.component';
import {ButtonModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import { StatisticsComponent } from './statistics/statistics.component';
import {SliderModule} from 'primeng/primeng';
import {DataTableModule, SharedModule} from 'primeng/primeng';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { OnlineOrdersComponent } from './online-orders/online-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PizzeriaComponent,
    StatisticsComponent,
    BankAccountComponent,
    OnlineOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    ChartModule,
    SliderModule,
    DataTableModule,
    SharedModule
  ],
  providers: [PizzeriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
