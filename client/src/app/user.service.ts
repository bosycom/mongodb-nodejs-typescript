import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { IUser } from './interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {  }

  getUsers() : Observable<IUser[]> {
    return this.http.get<IUser[]>("http://localhost:8080/api/user").pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if(err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code : ${err.status} and error message ${err.message}`;
    }

    console.log(errorMessage);
    return throwError(errorMessage)
  }
}
