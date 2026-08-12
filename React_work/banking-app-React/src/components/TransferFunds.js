import React, { useState, useEffect } from "react";
import { transferFunds } from "../api";

export default function TransferFunds({ accounts, onTransferComplete }) {
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (accounts.length >= 2 && !fromAccountId && !toAccountId) {
      setFromAccountId(accounts[0].id);
      setToAccountId(accounts[1].id);
    }
  }, [accounts, fromAccountId, toAccountId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setSubmitting(true);
    try {
      await transferFunds({ fromAccountId, toAccountId, amount });
      setStatus({ type: "success", message: `Transfer of $${Number(amount).toFixed(2)} complete.` });
      setAmount("");
      onTransferComplete && onTransferComplete();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  if (accounts.length < 2) {
    return <p className="empty-state">You need at least two accounts to transfer funds.</p>;
  }

  return (
    <form className="transfer-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="fromAccount">From</label>
        <select
          id="fromAccount"
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.accountNumber})
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="toAccount">To</label>
        <select
          id="toAccount"
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.accountNumber})
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="amount">Amount (USD)</label>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      {status && (
        <div className={`form-message ${status.type}`}>{status.message}</div>
      )}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Transferring…" : "Transfer funds"}
      </button>
    </form>
  );
}
