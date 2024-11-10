import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './other.component.html',
  styleUrl: './other.component.css'
})
export class OtherComponent implements OnInit {

  public employeeList: any = [];
  selectedEmployee: any = {
    employeeId:"",
    employeeName: "",
    email: "",
    contactNumber: "",
    address: "",
    position: ""
  };
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    fetch("http://localhost:8080/get-all-employees")
    .then(((res) => res.json())
  ).then((data) => {
      this.employeeList = data;
console.log(data);

    })
  }

  openEditModal(employee: any) {
    this.selectedEmployee = { ...employee }; // Clone the selected employee
    const modal = document.getElementById('updateModal') as HTMLElement;
    modal.style.display = 'block'; // Display the modal
  }

  closeModal() {
    const modal = document.getElementById('updateModal') as HTMLElement;
    modal.style.display = 'none'; // Hide the modal
  }
  updateEmployee() {
    console.log(this.selectedEmployee);
    
    fetch("http://localhost:8080/update-employee", {
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
          return res.json();
        }
      })
      .then((data) => {
        console.log("Package added successfully:", data);
         

      })
      .catch((error) => {
        console.error("Error uploading package:", error);

      });
      this.getAllEmployees() ;
  }

  deleteEmployee(employeeId: number) {
    fetch(`http://localhost:8080/delete-employee/${employeeId}`,{
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
 
