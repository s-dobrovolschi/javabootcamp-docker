import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLoginDialog: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }


  onShowLoginDialog() {
    this.showLoginDialog = true;
  }

  authenticateUser(){
    this.showLoginDialog = false;
  }
}
