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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PizzeriaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ButtonModule
  ],
  providers: [PizzeriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
