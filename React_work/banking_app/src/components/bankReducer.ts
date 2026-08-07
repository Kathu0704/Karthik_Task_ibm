import type { Transaction, BankState } from "./types.ts";

export type BankAction =
  | {
      type: "CREDIT";
      amount: number;
    }
  | {
      type: "DEBIT";
      amount: number;
    }
  | {
      type: "TRANSFER";
      accountNumber: string;
      receiverName: string;
      amount: number;
    }
  | {
      type: "ERROR";
      message: string;
    }
  | {
      type: "CLEAR_ERROR";
    };


const createTransaction = (
  type: "credit" | "debit",
  description: string,
  amount: number
): Transaction => ({
  id: Date.now(),
  type,
  description,
  amount,
  date: new Date().toLocaleString(),
});


export const initialBankState: BankState = {
  balance: 10000,

  transactions: [
    {
      id: 1,
      type: "credit",
      description: "Initial Balance",
      amount: 10000,
      date: new Date().toLocaleString(),
    },
  ],

  error: "",
};


export function bankReducer(
  state: BankState,
  action: BankAction
): BankState {

  switch (action.type) {

    case "CREDIT": {

      const transaction = createTransaction(
        "credit",
        "Amount Credited",
        action.amount
      );

      return {
        ...state,

        balance: state.balance + action.amount,

        transactions: [transaction, ...state.transactions],

        error: "",
      };
    }


    case "DEBIT": {

      if (action.amount > state.balance) {

        return {
          ...state,

          error: `Insufficient balance! Available balance is ₹${state.balance.toLocaleString(
            "en-IN"
          )}.`,
        };
      }


      const transaction = createTransaction(
        "debit",
        "Amount Debited",
        action.amount
      );


      return {
        ...state,

        balance: state.balance - action.amount,

        transactions: [transaction, ...state.transactions],

        error: "",
      };
    }


    case "TRANSFER": {

      if (!/^\d{9}$/.test(action.accountNumber)) {

        return {
          ...state,

          error: "Account number must contain exactly 9 digits.",
        };
      }


      if (!/^[A-Za-z ]+$/.test(action.receiverName.trim())) {

        return {
          ...state,

          error: "Receiver name should contain only characters.",
        };
      }


      if (!Number.isFinite(action.amount) || action.amount <= 0) {

        return {
          ...state,

          error: "Please enter a valid amount.",
        };
      }


      if (action.amount > state.balance) {

        return {
          ...state,

          error: `Insufficient balance! Available balance is ₹${state.balance.toLocaleString(
            "en-IN"
          )}.`,
        };
      }


      const transaction = createTransaction(
        "debit",
        `Transfer to ${action.receiverName}`,
        action.amount
      );


      return {
        ...state,

        balance: state.balance - action.amount,

        transactions: [transaction, ...state.transactions],

        error: "",
      };
    }


    case "ERROR":

      return {
        ...state,
        error: action.message,
      };


    case "CLEAR_ERROR":

      return {
        ...state,
        error: "",
      };


    default:

      return state;
  }
}
