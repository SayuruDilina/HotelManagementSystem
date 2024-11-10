import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { OtherComponent } from './pages/other/other.component';

export const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    },
    {
        path: "packages",
        component: PackagesComponent
    },
    {
        path: "order-details",
        component: OrderDetailsComponent
    },
    {
        path: "employees",
        component: EmployeesComponent
    },
    {
        path: "other",
        component: OtherComponent
    }
];
