import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { OtherComponent } from './pages/other/other.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashCompComponent } from './pages/dash-comp/dash-comp.component';

export const routes: Routes = [
    {
        path:"",
        component:LoginPageComponent
   
    },
    {
        path:"dashboard",
        component:DashCompComponent,
        children:[
            {
                path:"",
                component:DashboardComponent
            },
            {
                path:"order-details",
                component:OrderDetailsComponent
            },
            {
                path:"package-details",
                component:PackagesComponent
            },
            {
                path:"employee-registration",
                component:EmployeesComponent
            },
            {
                path:"other-details",
                component:OtherComponent
            }
        ]
    }

];
