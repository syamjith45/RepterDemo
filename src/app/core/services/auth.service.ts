import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = 'https://localhost:7078/api/Auth'; 
  constructor(private http:HttpClient) {
   }

   getUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}`)
   }

   getUserId(): any {
    const userId = localStorage.getItem('UserId');
    
    if (userId) { // Check if the value is not null
        return JSON.parse(userId);
    }
    
    return null; // Or handle the null case as needed
}

   register(user:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`,user);
   }

   login(credentials:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,credentials).pipe(
      map((response:any)=>{
        debugger
        if (response && response.token && response.userId) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem(`UserId`,response.userId)
        }
        return response;
      })
    )
   }

   logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('UserId');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
