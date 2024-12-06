import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../model/Employee';
import Swal from 'sweetalert2';
import { BasicauthService } from '../../basicauth.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  public employee: Employee;
  public username: string = "";
  public password: string = "";
  public base64Credentials: any;

  constructor(private service: BasicauthService) {
    this.username = this.service.username;
    this.password = this.service.password;
    this.base64Credentials = btoa(`${this.username}:${this.password}`);
    this.employee = new Employee('', '', '', '', '', 0);
  }

  registerEmployee() {
  

    fetch("http://localhost:8080/employee/register-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${this.base64Credentials}`

      },
      body: JSON.stringify(this.employee)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            alert(JSON.stringify(errorData))
          });
        } else {
          return res.json().then((data) => {
            Swal.fire({
              title: "Good job!",
              text: data.message,
              icon: "success"
            });

          });
        }
      })


  }

}
