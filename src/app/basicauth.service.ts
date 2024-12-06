import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasicauthService {

  public username: string="";
  public password: string="";

  public setAuth(username:string ,password:string){
      this.username=username;
      this.password=password;
  }

  
}
