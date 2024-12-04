import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public userList:any=[];
  public count:number=0;
  ngOnInit(): void {
    this.getUserCount();
    this.getUsers();
  }
 getUserCount(){
  fetch("http://localhost:8080/user/get-user-count").then((res)=>res.json()).then((data)=>{
    console.log(data);
    this.count=data;
  })
 }

 getUsers(){
  fetch("http://localhost:8080/user/get-all-users").then((res)=>res.json()).then((data)=>{
    console.log(data);
  this.userList=data;
  })
 }
}
