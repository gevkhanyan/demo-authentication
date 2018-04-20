import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    email: string;
    errorAlert: boolean = false;
    emailError: boolean = false;

    constructor(private auth: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }

    submit() {
        this.auth._getToken({email: this.email}).subscribe((res: any) => {
            if (!res.error) {
                localStorage.setItem('resetToken', res.data.token);
                localStorage.setItem('user_id', res.data.id);
                this.router.navigate(['/new-password']);
            } else {
                this.errorAlert = true;
            }
        });
    }

    validate(email: any) {
        if (email) {
            if (!this.auth.validateEmail(email)) {
                this.emailError = true;
            } else {
                this.emailError = false;
            }
        }
    }

}
