import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./common/header/header.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { initFlowbite } from 'flowbite';
import { LoginPageComponent } from "./pages/login-page/login-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'admin-front-end';

  ngOnInit(): void {
    initFlowbite();
  }
}
