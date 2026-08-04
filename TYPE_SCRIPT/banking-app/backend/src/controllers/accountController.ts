import { Request, Response } from "express";
import * as accountService from "../services/accountService";
 
export const getAllAccounts = (_req: Request, res: Response) => {
  res.json(accountService.getAccounts());
};
 
export const depositAmount = (req: Request, res: Response) => {
  const { id, amount } = req.body;
  const account = accountService.deposit(id, amount);
  account ? res.json(account) : res.status(404).send("Account not found");
};
 
export const withdrawAmount = (req: Request, res: Response) => {
  const { id, amount } = req.body;
  const account = accountService.withdraw(id, amount);
  account ? res.json(account) : res.status(400).send("Insufficient funds");
};