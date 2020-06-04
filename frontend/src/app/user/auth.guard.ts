import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}

    canActivate() {
        const isAuth = this.userService.getIsAuth();
        if (!isAuth) {
            this.router.navigate(['login']);
        }
        return isAuth;
    }
}