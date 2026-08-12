import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BalanceController.css";

function BalanceController() {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    if (error) {
      setError("");
    }
  };

  const validateAmount = (value) => {
    const parsed = Number(value);
    if (!value || Number.isNaN(parsed)) {
      return "Please enter a valid amount.";
    }
    if (parsed <= 0) {
      return "Amount must be greater than zero.";
    }
    return "";
  };

  const runTransaction = (type) => {
    const validationError = validateAmount(amount);
    if (validationError) {
      setError(validationError);
      return;
    }

    const amountNumber = Number(amount);
    if (type === "WITHDRAW" && amountNumber > balance) {
      setError("Insufficient balance for this withdrawal.");
      return;
    }

    dispatch({
      type,
      payload: amountNumber,
    });

    setAmount("");
    setError("");
  };

  return (
    <section className="balance-controller">
      <div className="balance-controller__header">
        <h2>Balance Controller</h2>
        <p className="balance-controller__hint">
          Enter the amount you want to deposit or withdraw.
        </p>
      </div>

      <div className="balance-controller__form">
        <label htmlFor="amount" className="balance-controller__label">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="balance-controller__input"
        />
      </div>

      {error && <div className="balance-controller__error">{error}</div>}

      <div className="balance-controller__actions">
        <button
          type="button"
          className="balance-controller__button balance-controller__button--deposit"
          onClick={() => runTransaction("DEPOSIT")}
        >
          Deposit
        </button>
        <button
          type="button"
          className="balance-controller__button balance-controller__button--withdraw"
          onClick={() => runTransaction("WITHDRAW")}
        >
          Withdraw
        </button>
      </div>

      <p className="balance-controller__balance">
        Current balance: <strong>₹{balance.toLocaleString()}</strong>
      </p>
    </section>
  );
}

export default BalanceController;