import {
  useEffect,
  useReducer,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  AccountContext,
} from "./AccountContext";

import {
  bankReducer,
  initialBankState,
} from "./bankReducer.ts";


// Load state from localStorage
function getInitialState() {

  try {

    const savedState =
      localStorage.getItem(
        "bankingState"
      );

    if (savedState) {

      return JSON.parse(
        savedState
      );
    }

  } catch {

    console.log(
      "Unable to load saved banking state."
    );
  }


  return initialBankState;
}


export function AccountProvider({
  children,
}: {
  children: ReactNode;
}) {

  // ==================================
  // useReducer
  // ==================================

  const [
    state,
    dispatch,
  ] = useReducer(
    bankReducer,
    undefined,
    getInitialState
  );


  // ==================================
  // useEffect
  // Save banking state
  // ==================================

  useEffect(() => {

    localStorage.setItem(
      "bankingState",
      JSON.stringify(state)
    );

  }, [state]);


  // ==================================
  // CREDIT
  // ==================================

  const credit = () => {

    dispatch({
      type: "CREDIT",
      amount: 100,
    });
  };


  // ==================================
  // DEBIT
  // ==================================

  const debit = () => {

    dispatch({
      type: "DEBIT",
      amount: 100,
    });
  };


  // ==================================
  // TRANSFER
  // ==================================

  const transferMoney = (
    accountNumber: string,
    receiverName: string,
    amount: number
  ): boolean => {

    // Validation before dispatch
    if (!/^\d{9}$/.test(accountNumber)) {

      dispatch({
        type: "ERROR",
        message:
          "Account number must contain exactly 9 digits.",
      });

      return false;
    }


    if (
      !/^[A-Za-z ]+$/.test(
        receiverName.trim()
      )
    ) {

      dispatch({
        type: "ERROR",
        message:
          "Receiver name should contain only characters.",
      });

      return false;
    }


    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {

      dispatch({
        type: "ERROR",
        message:
          "Please enter a valid amount.",
      });

      return false;
    }


    if (amount > state.balance) {

      dispatch({
        type: "ERROR",
        message:
          `Insufficient balance! Available balance is ₹${state.balance.toLocaleString(
            "en-IN"
          )}.`,
      });

      return false;
    }


    dispatch({
      type: "TRANSFER",

      accountNumber,

      receiverName,

      amount,
    });


    return true;
  };


  // ==================================
  // CLEAR ERROR
  // ==================================

  const clearError = () => {

    dispatch({
      type: "CLEAR_ERROR",
    });
  };


  return (

    <AccountContext.Provider
      value={{

        balance:
          state.balance,

        transactions:
          state.transactions,

        error:
          state.error,

        credit,

        debit,

        transferMoney,

        clearError,

      }}
    >

      {children}

    </AccountContext.Provider>
  );
}