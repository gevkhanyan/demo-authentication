import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

    private headers = new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        });

    constructor(private http: HttpClient) {

    }

    _login(userData) {
        return this.http.post(environment.api_url + '/login', userData);
    }

    _signUp(userData) {
        return this.http.post(environment.api_url + '/sign-up', userData);
    }

    _getToken(email) {
        return this.http.post(environment.api_url + '/get-token', email);
    }

    _resetPassword(data, id) {
        return this.http.put(environment.api_url + '/reset-password/' + id, data);
    }

    _checkToken(data, id) {
        return this.http.post(environment.api_url + '/check-token/' + id, data, {headers: this.headers});
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
