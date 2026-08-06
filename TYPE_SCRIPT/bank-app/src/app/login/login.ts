import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BankService } from '../services/bank';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(
    private bank: BankService,
    private router: Router
  ) {}

  login(acc: string, pwd: string): void {

    this.bank.getUsers().subscribe({

      next: (users: any) => {

        const user = users.find((u: any) =>
          u.accountNumber === acc &&
          u.password === pwd
        );

        if (user) {

          this.bank.currentUser = user;

          alert("Login Successful");

          this.router.navigate(['/dashboard']);

        } else {

          alert("Invalid Account Number or Password");

        }

      },

      error: (err) => {

        console.error(err);

        alert("Unable to connect to the server.");

      }

    });

  }

}