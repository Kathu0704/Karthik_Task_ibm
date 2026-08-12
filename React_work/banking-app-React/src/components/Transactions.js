import React, { useEffect, useState } from "react";
import { getTransactions } from "../api";

function formatCurrency(value) {
  const formatted = Math.abs(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return value < 0 ? `-${formatted}` : `+${formatted}`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Transactions({ accountId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accountId) return;
    let isMounted = true;
    setLoading(true);
    getTransactions(accountId).then((data) => {
      if (isMounted) {
        setTransactions(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [accountId]);

  if (!accountId) {
    return <p className="empty-state">Select an account to see its transactions.</p>;
  }

  if (loading) {
    return <p className="empty-state">Loading transactions…</p>;
  }

  if (!transactions.length) {
    return <p className="empty-state">No transactions yet for this account.</p>;
  }

  return (
    <div>
      {transactions.map((t) => (
        <div className="transaction-row" key={t.id}>
          <div>
            <div className="desc">{t.description}</div>
            <div className="date">{formatDate(t.date)}</div>
          </div>
          <div className={`amount ${t.amount < 0 ? "negative" : "positive"}`}>
            {formatCurrency(t.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}
