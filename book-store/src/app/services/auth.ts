import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';


export interface RegisterData {
  name: string,
  email: string,
  password: string,
  phone?: string,
  role?: "user" | "admin"
}

export interface LoginData {
  email: string,
  password: string
}

interface LoginResponse {
  msg?: string,
  token?: string,
  error?: string
}


@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiURL = `${environment.apiURL}/users`
  constructor(private http: HttpClient) { }


  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, data)
  }

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiURL}/login`, data
    ).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem("token", res.token);

          const role = this.decodeRole(res.token)
          if (role) {
            localStorage.setItem("role", role)
          }

        }
      })
    )
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}`)

  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`)
  }


  loggeOut(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token")
  }

  getRole(): string | null {
    return localStorage.getItem("role")
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }


  private decodeRole(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return payload.role ?? null
    } catch { return null; }
  }
}
