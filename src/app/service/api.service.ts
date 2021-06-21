import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs/index';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient ) {
  }

  uploadfile(userdetails:any) {
    return this.httpClient.post<any>('http://localhost:8218/readInventory/add',userdetails);
    
   }

}
