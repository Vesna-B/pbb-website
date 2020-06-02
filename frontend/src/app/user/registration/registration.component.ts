import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService) { }

  registrationForm: FormGroup;

  ngOnInit() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]), 
      passwordConfirmation: new FormControl('', Validators.required)
    })
  }

  get firstName() { return this.registrationForm.get('firstName') }
  get lastName() { return this.registrationForm.get('lastName') }
  get email() { return this.registrationForm.get('email') }
  get password() { return this.registrationForm.get('password') }
  get passwordConfirmation() { return this.registrationForm.get('passwordConfirmation') }
  

  register() {
    if (this.registrationForm.valid) {
      this.userService.register(this.registrationForm.value);
    }
  }

}
