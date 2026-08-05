import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BankService } from '../bank.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  account = '';
  password = '';
  message = '';

  constructor(
    private bank: BankService,
    private router: Router
  ) {}


  login() {

    if(this.bank.login(this.account, this.password)) {

      this.router.navigate(['/dashboard']);

    }
    else {

      this.message = "Invalid Login";

    }

  }

}