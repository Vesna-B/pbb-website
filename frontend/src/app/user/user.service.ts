import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    console.log(user);
    this.http.post<{ message: string }>('http://localhost:3000/users', user)
      .subscribe(response => {
        console.log(response.message);
        this.router.navigate(['login']);
      });
  }


  login(email: string, password: string) {
    this.http.post('http://localhost:3000/users/login', { email: email, password: password })
      .subscribe(response => {
        console.log(response);
      });
  }

  
}
