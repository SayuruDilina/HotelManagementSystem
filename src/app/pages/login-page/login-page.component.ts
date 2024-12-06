import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { BasicauthService } from '../../basicauth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent  {

public username:string="";
public password:string="";


constructor(private router:Router,private authService:BasicauthService){}

    authentication(){
    if(this.username=="Admin" && this.password=="Admin1234"){
        this.router.navigate(['/dashboard']);
        this.authService.setAuth(this.username,this.password);
        console.log(this.username,this.password);
        
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect Username Or Password",
       });
    }
  }

}
