import { Injectable } from '@angular/core';
import { IUserSettings } from './user-settings';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  postUserSettingsForm(userSettings: IUserSettings) : Observable<IUserSettings>{
    const url = " http://localhost:8080/api/user";
    return this.http.post<IUserSettings>(url, userSettings);
  }
}
