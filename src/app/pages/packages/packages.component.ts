import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent {

  public accomdationPackageList: any = [];
  public serach: any = "";
  public detailInput: string = '';
  public isClicked: boolean = false;
  private selectedIndex: any;
  public isUpdateDetails: boolean = false;


  public Package: any = {
    id: "",
    packageNum: "",
    packageName: "",
    PackgeDetailsArray: [],
    price: "",
    availableQty: "",
    image:null  
  }


  public selectedPackage: string | null = null;

  selectPackage(packageName: string) {
    this.selectedPackage = packageName;
    console.log("Selected Package:", this.selectedPackage);
    this.loadTable();
  }
  addDetail() {
    if (this.detailInput.trim()) {
      this.Package.PackgeDetailsArray.push(this.detailInput);
      this.detailInput = '';
    }
  }
  updateDetail() {
    this.isUpdateDetails = false;
    if (this.selectedIndex !== null && this.detailInput.trim()) {
      // Update the detail at the selected index
      this.Package.packgeDetailsArray[this.selectedIndex] = this.detailInput;
      this.selectedIndex = null; // Reset the selected index
      this.detailInput = '';     // Clear the input field after updating
    }

  }
  deleteDetail() {
    if (this.selectedIndex !== null && this.detailInput.trim()) {

      this.Package.PackgeDetailsArray.splice(this.selectedIndex, 1);
      this.selectedIndex = null; // Reset the selected index
      this.detailInput = '';     // Clear the input field after updating
    }
  }
  getIndex(i: any, detail: any) {
    this.isUpdateDetails = true;
    this.selectedIndex = i; // Store the index of the selected detail
    this.detailInput = detail;
  }
  public searchId: string = '';
  public packageExists: boolean = false;

  searchPackage() {
    this.isClicked = true;
    
    if (this.selectedPackage == null) {
      alert("Please select a pacakge");
    }
    if (this.searchId && this.selectedPackage === "Accommodation") {
      fetch(`http://localhost:8080/accommodation/search-by-id/${this.searchId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data) {
            this.packageExists = true;
            this.Package = { ...data };
            this.Package.id = data.accommodationId;
            const file = this.base64ToFile(data.image, 'image.png');
            console.log(file);
            this.Package.image = file;
            console.log(this.Package);
            this.accomdationPackageList[0] = data;
            if (Array.isArray(data.packageDetails)) {
              data.packageDetails = data.packageDetails.map((detail: string) => {

                return detail.replace(/[\[\]\"']/g, '');
              });
            }
            this.Package.PackgeDetailsArray = data.packageDetails;


          } else {
            console.error("No data found for the provided ID");
          }
        })
        .catch((error) => {
          console.error("Error fetching package by ID:", error);
        });
    } else if (this.searchId && this.selectedPackage === "DayOut") {
      fetch(`http://localhost:8080/day-out/search-by-id/${this.searchId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data) {
            this.packageExists = true;
            this.Package = { ...data };
            this.Package.id = data.accommodationId;
            this.Package.availableQty = data.availableSheets;
            this.Package.id = data.dayOutID;

            const file = this.base64ToFile(data.image, 'image.png');
             console.log(file);
            this.Package.image = file;
            
            console.log(this.Package);
            this.accomdationPackageList[0] = data;
            if (Array.isArray(data.packageDetails)) {
              data.packageDetails = data.packageDetails.map((detail: string) => {

                return detail.replace(/[\[\]\"']/g, '');
              });
            }
            this.Package.packgeDetailsArray = data.packageDetails;


          } else {
            console.error("No data found for the provided ID");
          }
        })
        .catch((error) => {
          console.error("Error fetching package by ID:", error);
        });
    } else if (this.searchId && this.selectedPackage === "MenuOptions") {
      fetch(`http://localhost:8080/menu-option/search-by-id/${this.searchId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data) {
            this.packageExists = true;
            this.Package = { ...data };
            this.Package.id = data.accommodationId;
            

            const file = this.base64ToFile(data.image, 'image.png');
            
            console.log(file);
            this.Package.image = file;
            
            this.Package.availableQty = data.availableSheets;
            this.Package.id = data.menuOptionId;

            console.log(this.Package);
            this.accomdationPackageList[0] = data;
            if (Array.isArray(data.packageDetails)) {
              data.packageDetails = data.packageDetails.map((detail: string) => {

                return detail.replace(/[\[\]\"']/g, '');
              });
            }
            this.Package.PackgeDetailsArray = data.packageDetails;


          } else {
            console.error("No data found for the provided ID");
          }
        })
        .catch((error) => {
          console.error("Error fetching package by ID:", error);
        });
    }

    else {
      console.error("Please provide an ID to search for");
    }


  }
  base64ToFile(base64String: string, fileName: string): File {
    try {

      if (/[^A-Za-z0-9+/=]/.test(base64String)) {
        throw new Error('Invalid characters in base64 string');
      }


      const base64Data = base64String.replace(/-/g, '+').replace(/_/g, '/');
      const cleanedBase64String = base64Data.split(',')[1] || base64Data;


      const byteString = atob(cleanedBase64String);


      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);


      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }


      const file = new File([arrayBuffer], fileName, { type: 'image/png' });
      return file;
    } catch (error) {
      console.error('Error during base64 to file conversion:', error);
      throw error;
    }
  }
  updatePackage() {
    this.isClicked = false;
    const formData = new FormData();

    console.log(this.Package.PackgeDetailsArray);
    formData.append('id', this.Package.id.toString());
    formData.append('packageNum', this.Package.packageNum);
    formData.append('packageName', this.Package.packageName);
    formData.append('price', this.Package.price.toString());
    formData.append('availableQty', this.Package.availableQty.toString());


    formData.append('packageDetails', JSON.stringify(this.Package.PackgeDetailsArray));
    console.log(formData);



    if (this.Package.image) {
      formData.append('image', this.Package.image, this.Package.image.name);
    }

    if (this.selectedPackage === "Accommodation") {
      fetch("http://localhost:8080/accommodation/update-accommodation-package", {
        method: "PUT",
        body: formData
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
    } else if (this.selectedPackage === "DayOut") {
      fetch("http://localhost:8080/day-out/update-day-out-package", {
        method: "PUT",
        body: formData
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
    } else if (this.selectedPackage === "MenuOptions") {
      fetch("http://localhost:8080/menu-option/update-menu-options-package", {
        method: "PUT",
        body: formData
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
    }


  }

  deletePackage() {
    if (this.searchId && this.selectedPackage === "Accommodation") {
      fetch(`http://localhost:8080/accommodation/delete-by-id/${this.searchId}`, {
        method: "DELETE",

      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })

    } else if (this.searchId && this.selectedPackage === "DayOut") {
      fetch(`http://localhost:8080/day-out/delete-by-id/${this.searchId}`, {
        method: "DELETE",

      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })

    } else if (this.searchId && this.selectedPackage === "MenuOptions") {
      fetch(`http://localhost:8080/menu-option/delete-by-id/${this.searchId}`, {
        method: "DELETE",

      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })

    }

  }
  loadTable() {
    if (this.selectedPackage == "Accommodation") {
      fetch('http://localhost:8080/accommodation/get-all-accommodation-packages').then(res => res.json())
        .then(data => {
          console.log(data);

          this.accomdationPackageList = data.map((pkg: any) => {


            if (Array.isArray(pkg.packageDetails)) {
              pkg.packageDetails = pkg.packageDetails.map((detail: string) => {

                return detail.replace(/[\[\]\"']/g, '');
              });
            }
            return pkg;
          });
        });

    } else if (this.selectedPackage == "DayOut") {
      fetch('http://localhost:8080/day-out/get-all-day-out-packages').then(res => res.json())
        .then(data => {
          console.log(data);

          // this.accomdationPackageList.availableQty==data.availableSheets;
          console.log(this.accomdationPackageList.availableQty);

          this.accomdationPackageList = data.map((pkg: any) => {


            if (Array.isArray(pkg.packageDetails)) {
              pkg.packageDetails = pkg.packageDetails.map((detail: string) => {

                return detail.replace(/[\[\]\"']/g, '');
              });
            }
            return pkg;
          });
        });

    } else if (this.selectedPackage == "MenuOptions") {
      fetch('http://localhost:8080/menu-option/get-all-menu-option-packages').then(res => res.json())
        .then(data => {
          console.log(data);

          this.accomdationPackageList = data.map((pkg: any) => {


            if (Array.isArray(pkg.packageDetails)) {
              pkg.packageDetails = pkg.packageDetails.map((detail: string) => {

                return detail.replace(/[\[\]\"']/g, '');
              });
            }
            return pkg;
          });
        });

    }
  }

  checkID(){
    if (this.selectedPackage == null) {
      alert("Please select a pacakge");
    }
    if (this.Package.id && this.selectedPackage === "Accommodation") {
      fetch(`http://localhost:8080/accommodation/search-by-id/${this.Package.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
            alert("Already Exists");
          
        })
        .catch((error) => {
            this.addPackage();
        });
    } else if (this.searchId && this.selectedPackage === "DayOut") {
      fetch(`http://localhost:8080/day-out/search-by-id/${this.searchId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          alert("Already Exists");
        
      })
      .catch((error) => {
          this.addPackage();
      });
    } else if (this.searchId && this.selectedPackage === "MenuOptions") {
      fetch(`http://localhost:8080/menu-option/search-by-id/${this.searchId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          alert("Already Exists");
        
      })
      .catch((error) => {
          this.addPackage();
      });
    }
  }

  addPackage() {
    console.log("check");
    
   console.log("check2");
    
    const formData = new FormData();

    console.log(this.Package.packgeDetailsArray);
    formData.append('id',this.Package.id);
    formData.append('packageNum', this.Package.packageNum);
    formData.append('packageName', this.Package.packageName);
    formData.append('price', this.Package.price.toString());
    formData.append('availableQty', this.Package.availableQty.toString());


    formData.append('packageDetails', JSON.stringify(this.Package.PackgeDetailsArray));
    console.log(formData);

    if (this.Package.image) {
      formData.append('image', this.Package.image, this.Package.image.name);
    }
    if (this.selectedPackage === "Accommodation") {
      fetch("http://localhost:8080/accommodation/add-accommodation-package", {
        method: "POST",
        body: formData
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
          Swal.fire({
            title: "Good job!",
            text:"Pacakge Added Successfully",
            icon: "success"
          });
          this.Package = {     
            id: "",     
            packageNum: "",     
            packageName: "",     
            PackgeDetailsArray: [],     
            price: "",     
            availableQty: "",     
            image: null 
          };
          console.log("check3");
        })
        .catch((error) => {
          console.error("Error uploading package:", error);

        });

    } else if (this.selectedPackage === "DayOut") {
      fetch("http://localhost:8080/day-out/add-day-out-package", {
        method: "POST",
        body: formData
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
          Swal.fire({
            title: "Good job!",
            text:"Pacakge Added Successfully",
            icon: "success"
          });
          this.Package = {     
            id: "",     
            packageNum: "",     
            packageName: "",     
            PackgeDetailsArray: [],     
            price: "",     
            availableQty: "",     
            image: null 
          };
        })
        .catch((error) => {
          console.error("Error uploading package:", error);

        });
    } else if (this.selectedPackage === "MenuOptions") {
      fetch("http://localhost:8080/menu-option/add-menu-option-package", {
        method: "POST",
        body: formData
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
          
          Swal.fire({
            title: "Good job!",
            text:"Pacakge Added Successfully",
            icon: "success"
          });
          this.Package = {     
            id: "",     
            packageNum: "",     
            packageName: "",     
            PackgeDetailsArray: [],     
            price: "",     
            availableQty: "",     
            image: null 
          };
        })
        .catch((error) => {
          console.error("Error uploading package:", error);

        });
      }
    


  }

  onImageUpload(event: any, imageField: string) {
    const file = event.target.files[0];  
    if (file) {
      this.Package[imageField] = file; 
    }
  }

  

}
