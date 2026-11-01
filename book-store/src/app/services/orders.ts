import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Orders {

  private apiURL = `${environment.apiURL}/orders`
  constructor(private http: HttpClient) { }

  // order for user

  getAllOrder(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/my?time=${Date.now()}`)
  }

  // order for admin
  getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}`)
  }

  updateOrder(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/${id}`,data)
  }

}
