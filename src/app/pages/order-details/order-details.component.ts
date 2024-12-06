import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicauthService } from '../../basicauth.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NgFor, HttpClientModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  public orderList: any = [];
  public dateString: string = new Date().toLocaleDateString('en-CA');
  public username: string = "";
  public password: string = "";
  public base64Credentials: any;

  constructor(private http: HttpClient, private service: BasicauthService) {
    this.username = this.service.username;
    this.password = this.service.password;
    this.base64Credentials = btoa(`${this.username}:${this.password}`);
  }

  ngOnInit(): void {

    this.getAllOrderDetails();
  }

  getAllOrderDetails() {
    fetch("http://localhost:8080/order/get-all-orders", {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${this.base64Credentials}`
      }

    }).then((res) => res.json()).then((data) => {
      console.log(data);
      this.orderList = data;
    })
  }

  getOrderDetailReport(): Observable<Blob> {
    return this.http.get('http://localhost:8080/order/get-detail-report', {
      responseType: 'blob',  // No need for 'as json'
      headers: new HttpHeaders({
        'Content-Type': 'application/pdf',
        'Authorization': `Basic ${this.base64Credentials}`
      })
  });
}



genaratePdf() {
  this.getOrderDetailReport().subscribe((pdfBlob: Blob) => {
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfUrl;
    downloadLink.download = 'OrderDetails.pdf';
    downloadLink.click();

    URL.revokeObjectURL(pdfUrl);
  });
}
}
