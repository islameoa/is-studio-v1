import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../assets/constants';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  registerComponent:boolean = false;
  loginComponent:boolean = false;

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    return this.http.post(Constants.SERVER_URL + '/auth/register', userData);
  }
}


