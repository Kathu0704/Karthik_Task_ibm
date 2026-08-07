import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import {
  useAccount,
} from "./AccountContext";

import "./Transfer_Detail.css";

interface TransferDetailProps {
  onBack: () => void;
}


function Transfer_Detail({
  onBack,
}: TransferDetailProps) {

  const {
    balance,
    transferMoney,
    error,
    clearError,
  } = useAccount();


  // ==================================
  // useState
  // ==================================

  const [
    accountNumber,
    setAccountNumber,
  ] = useState("");


  const [
    receiverName,
    setReceiverName,
  ] = useState("");


  const [
    amount,
    setAmount,
  ] = useState("");


  // ==================================
  // useId
  // ==================================

  const accountId =
    useId();

  const nameId =
    useId();

  const amountId =
    useId();


  // ==================================
  // useRef
  // ==================================

  const accountInputRef =
    useRef<HTMLInputElement>(null);


  const timerRef =
    useRef<number | null>(null);


  // ==================================
  // useEffect
  // ==================================

  useEffect(() => {

    // Focus account input
    accountInputRef.current?.focus();


    return () => {

      if (
        timerRef.current !== null
      ) {

        window.clearTimeout(
          timerRef.current
        );
      }

    };

  }, []);


  // ==================================
  // Handle transfer
  // ==================================

  const handleTransfer = () => {

    const transferAmount =
      Number(amount);


    const success =
      transferMoney(
        accountNumber,
        receiverName,
        transferAmount
      );


    if (success) {

      setAccountNumber("");

      setReceiverName("");

      setAmount("");


      timerRef.current =
        window.setTimeout(() => {

          alert(
            "Amount transferred successfully!"
          );

          onBack();

        }, 100);
    }

  };


  return (

    <div className="dashboard-container">

      <div className="transfer-form-card">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>


        <h1>
          Transfer Money
        </h1>


        <p>
          Available Balance:
          {" "}
          <strong>
            ₹
            {balance.toLocaleString(
              "en-IN"
            )}
          </strong>
        </p>


        {error && (

          <div className="error-message">

            ⚠️ {error}

          </div>

        )}


        {/* ACCOUNT NUMBER */}

        <div className="form-group">

          <label htmlFor={accountId}>

            Receiver Account Number

          </label>


          <input
            ref={accountInputRef}

            id={accountId}

            type="text"

            maxLength={9}

            placeholder="Enter 9 digit account number"

            value={accountNumber}

            onChange={event => {

              setAccountNumber(
                event.target.value
              );

              clearError();

            }}
          />


          <small>

            Account number must contain
            exactly 9 digits.

          </small>

        </div>


        {/* RECEIVER NAME */}

        <div className="form-group">

          <label htmlFor={nameId}>

            Receiver Name

          </label>


          <input
            id={nameId}

            type="text"

            placeholder="Enter receiver name"

            value={receiverName}

            onChange={event => {

              setReceiverName(
                event.target.value
              );

              clearError();

            }}
          />


          <small>

            Only characters are allowed.

          </small>

        </div>


        {/* AMOUNT */}

        <div className="form-group">

          <label htmlFor={amountId}>

            Amount to Transfer

          </label>


          <input
            id={amountId}

            type="number"

            min="1"

            placeholder="Enter amount"

            value={amount}

            onChange={event => {

              setAmount(
                event.target.value
              );

              clearError();

            }}
          />


          {amount &&
            Number(amount) >
              balance && (

            <small className="insufficient-text">

              ⚠️ Insufficient balance.

              {" "}

              Available:
              {" "}
              ₹
              {balance.toLocaleString(
                "en-IN"
              )}

            </small>

          )}

        </div>


        {/* BUTTON */}

        <button
          className="transfer-submit-button"

          onClick={handleTransfer}

          disabled={
            !accountNumber ||
            !receiverName ||
            !amount ||
            Number(amount) <= 0 ||
            Number(amount) > balance
          }
        >

          Transfer Money

        </button>

      </div>

    </div>
  );
}


export default Transfer_Detail;