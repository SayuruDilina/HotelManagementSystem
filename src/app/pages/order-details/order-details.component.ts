import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{
  public orderList:any=[];
  public dateString: string = new Date().toLocaleDateString('en-CA');
  
ngOnInit(): void {
  
  this.getAllOrderDetails();
}

  getAllOrderDetails(){
    fetch("http://localhost:8080/get-all-orders").then((res)=>res.json()).then((data)=>{
console.log(data);
this.orderList=data;
    })
  }
}
