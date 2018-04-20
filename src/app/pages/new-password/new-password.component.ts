import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

    newPassword: string;
    confirmNewPassword: string;
    successMessage: boolean = false;
    errorMessage: boolean = false;
    passwordMatch: boolean = false;

    constructor(private auth: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        if (!localStorage.getItem('user_id') || !localStorage.getItem('resetToken')) {
            this.router.navigate(['/login']);
        }
    }

    changePassword() {
        let user_id = localStorage.getItem('user_id');
        let token = localStorage.getItem('resetToken');
        let userNewPass = {
            token: token,
            password: this.newPassword
        };
        if (this.confirmNewPassword !== this.newPassword) {
            this.passwordMatch = true;
        }
        if (user_id && token) {
            this.auth._resetPassword(userNewPass, user_id)
                .subscribe((res: any) => {
                    if (!res.error) {
                        // console.log(res);
                        this.successMessage = true;
                        localStorage.removeItem('resetToken');
                        localStorage.removeItem('user_id');
                    } else {
                        this.errorMessage = true;
                        localStorage.removeItem('resetToken');
                        localStorage.removeItem('user_id');
                        console.log(res.message);
                    }

                });
        }

    }
}
