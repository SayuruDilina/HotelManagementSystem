import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../model/Employee';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './other.component.html',
  styleUrl: './other.component.css'
})
export class OtherComponent implements OnInit {

  public employeeList: Employee[] = [];
  selectedEmployee: Employee;
  public employeesCount:number=0;
  ngOnInit(): void {
    this.getAllEmployees();
    this.getEmployeesCount();
  }
  constructor(){
    this.selectedEmployee=new Employee('','','','','',0);
  }

  getAllEmployees() {
    fetch("http://localhost:8080/employee/get-all-employees")
    .then(((res) => res.json())
  ).then((data) => {
      this.employeeList = data;
      console.log(data);

    })
  }
getEmployeesCount(){
  fetch("http://localhost:8080/employee/get-employees-count")
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
      },
      body: JSON.stringify(this.selectedEmployee)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            alert(JSON.stringify(errorData));
          });
        } else {
          this.getAllEmployees() ;
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
    fetch(`http://localhost:8080/employee/delete-employee/${employeeId}`,{
      method: "DELETE",
     
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      this.getAllEmployees() ;
    }
  }
 
