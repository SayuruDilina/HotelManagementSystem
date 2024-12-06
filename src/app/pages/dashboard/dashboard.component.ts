import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BasicauthService } from '../../basicauth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public userList: any = [];
  public username: string = "";
  public password: string = "";
  public count: number = 0;
  public base64Credentials: any;

  constructor(private service: BasicauthService) {
    this.username = this.service.username;
    this.password = this.service.password;
    this.base64Credentials = btoa(`${this.username}:${this.password}`);
  }

  ngOnInit(): void {
    this.getUserCount();
    this.getUsers();

  }

  getUserCount() {

    fetch("http://localhost:8080/user/get-user-count", {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${this.base64Credentials}`
      }

    }).then((res) => res.json()).then((data) => {
      console.log(data);
      this.count = data;
    })
  }

  getUsers() {
    fetch("http://localhost:8080/user/get-all-users", {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${this.base64Credentials}`
      }
    }

    ).then((res) => res.json()).then((data) => {
      console.log(data);
      this.userList = data;
    })
  }
}
