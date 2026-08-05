import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginFormComponent {

  loginForm = new FormGroup({

    username: new FormControl('', [
      Validators.required
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])

  });


  login() {

    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      alert("Login Successful");
    }
    else{
      alert("Please enter valid details");
    }

  }

}