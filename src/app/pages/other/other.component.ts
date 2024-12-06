import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../model/Employee';
import { BasicauthService } from '../../basicauth.service';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './other.component.html',
  styleUrl: './other.component.css'
})
export class OtherComponent implements OnInit {

  public employeeList: Employee[] = [];
  selectedEmployee: Employee;
  public employeesCount: number = 0;
  public username: string = "";
  public password: string = "";
  public base64Credentials: any;

  ngOnInit(): void {
    this.getAllEmployees();
    this.getEmployeesCount();
  }
  constructor(private service: BasicauthService) {
    this.selectedEmployee = new Employee('', '', '', '', '', 0);
    this.username = this.service.username;
    this.password = this.service.password;
    this.base64Credentials = btoa(`${this.username}:${this.password}`);
  }

  getAllEmployees() {
    
    fetch("http://localhost:8080/employee/get-all-employees", {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${this.base64Credentials}`
      }

    })
      .then(((res) => res.json())
      ).then((data) => {
        this.employeeList = data;
        console.log(data);

      })
  }
  getEmployeesCount() {

    fetch("http://localhost:8080/employee/get-employees-count", {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${this.base64Credentials}`
      }

    })
      .then(((res) => res.json())
      ).then((data) => {
        this.employeesCount = data;
        console.log(data);

      })
  }
  openEditModal(employee: any) {
    this.selectedEmployee = { ...employee };
    const modal = document.getElementById('updateModal') as HTMLElement;
    modal.style.display = 'block';
  }

  closeModal() {
    const modal = document.getElementById('updateModal') as HTMLElement;
    modal.style.display = 'none';
  }
  updateEmployee() {
    console.log(this.selectedEmployee);
  

    fetch("http://localhost:8080/employee/update-employee", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic ${this.base64Credentials}`
      },
      body: JSON.stringify(this.selectedEmployee)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            alert(JSON.stringify(errorData));
          });
        } else {
          this.getAllEmployees();
          return res.json();
        }
      })
      .then((data) => {
        console.log("Package added successfully:", data);

      })
      .catch((error) => {
        console.error("Error uploading package:", error);

      });


  }

  deleteEmployee(employeeId: number) {
 

    fetch(`http://localhost:8080/employee/delete-employee/${employeeId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Basic ${this.base64Credentials}`
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    this.getAllEmployees();
  }
}

