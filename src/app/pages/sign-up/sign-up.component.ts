import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    emailSent: boolean = false;
    emailAddress: string;
    emptyEmail: boolean = false;
    emailError: boolean = false;
    passwordMatch: boolean = false;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {

    }

    signUp() {
        const userData = {
            fullname: this.fullName,
            username: this.username,
            password: this.password,
            email: this.email,
        };
        this.authService._signUp(userData).subscribe(res => {
            console.log(res);
            this.emailSent = true;
            this.emailAddress = this.email;
        });
    }

    passConfirmPassMatch() {
        if (this.password !== this.confirmPassword) {
            this.passwordMatch = true;
        } else {
            this.passwordMatch = false;
        }
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
