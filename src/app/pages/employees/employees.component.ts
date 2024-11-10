import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  public Employee: any = {
    employeeName: "",
    email: "",
    contactNumber: "",
    address: "",
    position: ""
  }
  
  registerEmployee() {
    fetch("http://localhost:8080/register-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.Employee)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            alert(JSON.stringify(errorData))
          });
        } else {
          return res.json().then((data) => {
            alert(data.message);
          });
        }
      })


  }

}
