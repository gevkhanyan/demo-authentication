import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';

import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {NewPasswordComponent} from './pages/new-password/new-password.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';


export const router: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'new-password',
        component: NewPasswordComponent,
        canActivate: [AuthGuard]
    }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
