import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAccounts } from "../api";

export default function Home() {
  const [totalBalance, setTotalBalance] = useState(null);
  const [accountCount, setAccountCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    getAccounts().then((accounts) => {
      if (!isMounted) return;
      const total = accounts.reduce((sum, a) => sum + a.balance, 0);
      setTotalBalance(total);
      setAccountCount(accounts.length);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow" style={{ color: "#e9c979" }}>
          Welcome back
        </span>
        <h1>Your money, laid out clearly.</h1>
        <p>
          Check balances, review recent activity, and move funds between your
          accounts in a few clicks — all in one simple dashboard.
        </p>
        <div className="hero-stats">
          <div>
            <strong>
              {totalBalance === null
                ? "…"
                : totalBalance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
            </strong>
            <span>Total balance</span>
          </div>
          <div>
            <strong>{accountCount || "…"}</strong>
            <span>Active accounts</span>
          </div>
        </div>
      </section>

      <div className="feature-grid">
        <div className="card">
          <h3>View account details</h3>
          <p>See balances and account numbers for checking and savings at a glance.</p>
        </div>
        <div className="card">
          <h3>Track transactions</h3>
          <p>Every deposit, purchase, and transfer, sorted by most recent first.</p>
        </div>
        <div className="card">
          <h3>Transfer funds</h3>
          <p>Move money between your own accounts instantly, with balance checks built in.</p>
        </div>
      </div>

      <p style={{ marginTop: 32 }}>
        <Link to="/accounts" className="btn-primary" style={{ textDecoration: "none", display: "inline-block" }}>
          Go to your accounts →
        </Link>
      </p>
    </main>
  );
}
