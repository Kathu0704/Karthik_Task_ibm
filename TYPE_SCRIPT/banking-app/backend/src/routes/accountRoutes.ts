import type { Account } from "../models/account";
 
let account: Account = {
    id: 101,
    accountHolderName: "KATHUS",
    accountNumber: "ACC1001",
    balance: 50000
};
 
export function getAccount(): Account {
    return account;
}
 
export function getAccounts(): Account[] {
    return [account];
}
 
export function deposit(id: number, amount: number): Account | undefined {
    if (id !== account.id) {
        return undefined;
    }
 
    account.balance += amount;
    return account;
}
 
export function withdraw(id: number, amount: number): Account | undefined {
    if (id !== account.id) {
        return undefined;
    }
 
    if (amount > account.balance) {
        return undefined;
    }
 
    account.balance -= amount;
    return account;
}
 