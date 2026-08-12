import React, { useEffect, useState, useCallback } from "react";
import { getAccounts } from "../api";
import AccountDetails from "../components/AccountDetails";
import Transactions from "../components/Transactions";
import TransferFunds from "../components/TransferFunds";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAccounts = useCallback(() => {
    setLoading(true);
    getAccounts().then((data) => {
      setAccounts(data);
      setLoading(false);
      setSelectedId((current) => current || (data[0] && data[0].id));
    });
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  return (
    <main className="page">
      <div className="page-header">
        <span className="eyebrow">Accounts</span>
        <h1>Your accounts</h1>
        <p>Select an account to see its recent transactions, or transfer funds below.</p>
      </div>

      <AccountDetails
        accounts={accounts}
        loading={loading}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <div className="card" style={{ marginTop: 28 }}>
        <h3>Recent transactions</h3>
        <Transactions accountId={selectedId} />
      </div>

      <div className="card">
        <h3>Transfer funds</h3>
        <TransferFunds accounts={accounts} onTransferComplete={loadAccounts} />
      </div>
    </main>
  );
}
