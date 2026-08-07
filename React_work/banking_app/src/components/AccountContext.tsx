import {
  createContext,
  useContext,
} from "react";

import type { BankState } from "./types.ts";


export interface AccountContextType extends BankState {

  credit: () => void;

  debit: () => void;

  transferMoney: (
    accountNumber: string,
    receiverName: string,
    amount: number
  ) => boolean;

  clearError: () => void;
}


export const AccountContext =
  createContext<
    AccountContextType | undefined
  >(undefined);


export function useAccount(): AccountContextType {

  const context =
    useContext(AccountContext);


  if (!context) {

    throw new Error(
      "useAccount must be used inside AccountProvider"
    );
  }


  return context;
}