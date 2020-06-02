import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }


  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value.email, this.loginForm.value.password);
    }
  }

}
