import { getAccount, deposit, withdraw } from "./services/accountService";
 
const accountId = 101;
 
console.log("Initial Account:");
console.log(getAccount());
 
console.log("After Deposit:");
console.log(deposit(accountId, 1000));
 
console.log("After Withdraw:");
console.log(withdraw(accountId, 5000));