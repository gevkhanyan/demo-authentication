import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userData: any = {email: '', password: ''};
    errorAlert: boolean = false;
    emptyEmail: boolean = false;
    emailError: boolean = false;
    passwordErr: boolean = false;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }

    login() {
        if (this.userData.password === '') {
            this.passwordErr = true;
        } else {
            this.passwordErr = false;
        }
        this.authService._login(this.userData).subscribe((res: any) => {
            // console.log(res);
            if (!res.error) {
                localStorage.setItem('user_id', res.data.id);
                localStorage.setItem('token', res.data.token);
                window.location.pathname = '/';
            } else {
                this.errorAlert = true;
            }
        });
    }

    validate(email: any) {
        if (email) {
            this.emptyEmail = false;
            if (!this.authService.validateEmail(email)) {
                this.emailError = true;
            } else {
                this.emailError = false;
            }
        } else {
            this.emptyEmail = true;
        }
    }
}
