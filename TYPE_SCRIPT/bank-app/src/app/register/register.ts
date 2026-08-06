import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BankService } from '../services/bank';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {


  constructor(
    private bank: BankService,
    private router: Router
  ){}


  register(accountNumber:string, password:string, amount:string){


    const balance = Number(amount);


    if(!accountNumber || !password || balance<=0){

      alert("Enter valid details");
      return;

    }


    const user = {

      accountNumber: accountNumber,
      password: password,
      balance: balance

    };


    this.bank.registerUser(user)
    .subscribe(()=>{


      alert("Account Created Successfully");


      this.router.navigate(['/login']);


    });


  }

}