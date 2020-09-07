import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string; 
  private isAdmin = false;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private usersListener = new Subject<User[]>();
  users: User[];

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsersListener() {
    return this.usersListener.asObservable();
  }


  getUsers() {
    this.http.get<{ users: User[] }>('http://localhost:3000/users')
      .subscribe(response => {
        this.users = response.users;
        this.usersListener.next(this.users);
      })
  }

  deleteUser(id: string) {
    this.http.delete('http://localhost:3000/users/' + id)
      .subscribe(response => {
        console.log(response);
      })
  }


  register(user: any) {
    console.log(user);
    this.http.post<{ message: string }>('http://localhost:3000/users', user)
      .subscribe(response => {
        console.log(response.message);
        this.router.navigate(['login']);
      });
  }


  login(email: string, password: string) {
    this.http.post<{ token: string, expiresIn: number, userType: string, message: string }>('http://localhost:3000/users/login', { email: email, password: password })
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          if (response.userType == 'admin') {
            this.isAdmin = true;
          }
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          const userType = response.userType;
          this.saveAuthData(token, expirationDate, userType);
          this.router.navigate(['earthing-graph']);
        }
      },
      error => {
        alert(error.error.message);
      });
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      if (authInformation.type == 'admin') {
        this.isAdmin = true;
      }
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }


  logout() {
    this.token = null;
    this.isAdmin = false;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['login']);
  }


  private setAuthTimer(duration: number) {
    console.log("Setting timer " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, type: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('type', type);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('type');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const type = localStorage.getItem('type');
    if (!token || !expirationDate || !type) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      type: type
    }
  }

  
}
