import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'register', title: 'Register', component: RegisterComponent },
    { path: 'login', title: 'Login', component: LoginComponent }
];
