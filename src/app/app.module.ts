import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AlertModule} from 'ngx-alerts';
import {routes} from './app.router';


import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {NewPasswordComponent} from './pages/new-password/new-password.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';


import {AuthService} from './services/auth.service';
import {AuthGuard} from './auth.guard';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignUpComponent,
        DashboardComponent,
        ResetPasswordComponent,
        NewPasswordComponent
    ],
    imports: [
        routes,
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        AlertModule.forRoot({maxMessages: 5, timeout: 5000})
    ],
    providers: [
        AuthGuard,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
