import { Component } from '@angular/core';
import { HeaderComponent } from "../../common/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dash-comp',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet],
  templateUrl: './dash-comp.component.html',
  styleUrl: './dash-comp.component.css'
})
export class DashCompComponent {

}
