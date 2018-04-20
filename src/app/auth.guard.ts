import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './services/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService) {

    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (localStorage.getItem('token')) {
            let userId = localStorage.getItem('user_id');
            return this.authService._checkToken({}, userId).map((res: any) => {
                // console.log(res);
                if (!res.error) {
                    if (state.url.indexOf('/login') >= 0
                        || state.url.indexOf('/sign-up') >= 0
                        || state.url.indexOf('/reset-password') >= 0
                        || state.url.indexOf('/new-password') >= 0
                        || state.url === '/') {
                        this.router.navigate(['/']);
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_id');
                    this.router.navigate(['/login']);
                    return false;
                }
            });
        } else {
            if (state.url.indexOf('/dashboard') >= 0 || state.url === '/') {
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }
    }
}
