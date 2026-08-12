import React, { useEffect, useState } from "react";

function formatCurrency(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function AccountDetails({ accounts, loading, selectedId, onSelect }) {
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Access the server from your application (json-server reading db.json)
    fetch("/accounts/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          console.log("Fetched account from server:", data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.warn("Falling back to local account data:", error.message);
          setFetchError(error.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <p className="empty-state">Loading accounts…</p>;
  }

  if (!accounts.length) {
    return <p className="empty-state">No accounts found.</p>;
  }

  return (
    <div>
      {fetchError && (
        <p className="empty-state" style={{ padding: "0 0 12px", textAlign: "left" }}>
          Live account service unavailable — showing local data.
        </p>
      )}
      <div className="account-list">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={`account-card${account.id === selectedId ? " is-selected" : ""}`}
            onClick={() => onSelect(account.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(account.id);
            }}
          >
            <span className="type">{account.type}</span>
            <div className="name">{account.name}</div>
            <div className="balance">{formatCurrency(account.balance)}</div>
            <div className="number">{account.accountNumber}</div>
          </div>
        ))}
      </div>
    </div>
  );
}