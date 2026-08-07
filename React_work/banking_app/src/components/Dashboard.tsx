import {
  useCallback,
  useDeferredValue,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import "./Dashboard.css";
import {
  useAccount,
} from "./AccountContext";

import { useTheme } from "./useTheme.ts";

import { useBankingStats } from "./useBankingStats.ts";


interface DashboardProps {
  onTransfer: () => void;
}


function Dashboard({
  onTransfer,
}: DashboardProps) {

  const {
    balance,
    credit,
    debit,
    transactions,
    error,
  } = useAccount();


  const {
    theme,
    toggleTheme,
  } = useTheme();


  // ==================================
  // useTransition
  // ==================================

  const [
    isPending,
    startTransition,
  ] = useTransition();


  // ==================================
  // useDeferredValue
  // ==================================

  const [
    search,
    setSearch,
  ] = useState("");


  const deferredSearch =
    useDeferredValue(search);


  // ==================================
  // useRef
  // ==================================

  const balanceCardRef =
    useRef<HTMLDivElement>(null);


  // ==================================
  // useLayoutEffect
  // ==================================

  const [
    cardWidth,
    setCardWidth,
  ] = useState(0);


  useLayoutEffect(() => {

    if (
      balanceCardRef.current
    ) {

      const width =
        balanceCardRef.current
          .getBoundingClientRect()
          .width;

      setCardWidth(
        Math.round(width)
      );
    }

  }, [balance]);


  // ==================================
  // useMemo
  // ==================================

  const filteredTransactions =
    useMemo(() => {

      const searchText =
        deferredSearch
          .toLowerCase()
          .trim();


      if (!searchText) {

        return transactions;
      }


      return transactions.filter(
        transaction =>
          transaction.description
            .toLowerCase()
            .includes(searchText)
      );

    }, [
      transactions,
      deferredSearch,
    ]);


  // ==================================
  // Custom hook
  // ==================================

  const stats = useBankingStats(transactions);


  // ==================================
  // useMemo
  // ==================================

  const formattedBalance =
    useMemo(() => {

      return balance.toLocaleString(
        "en-IN"
      );

    }, [balance]);


  // ==================================
  // useCallback
  // ==================================

  const handleCredit =
    useCallback(() => {

      credit();

    }, [credit]);


  const handleDebit =
    useCallback(() => {

      debit();

    }, [debit]);


  // ==================================
  // useCallback + useTransition
  // ==================================

  const handleTransfer =
    useCallback(() => {

      startTransition(() => {

        onTransfer();

      });

    }, [
      onTransfer,
      startTransition,
    ]);


  return (

    <div className="dashboard-container">

      {/* HEADER */}

      <header className="dashboard-header">

        <div>

          <h1>
            MyBank
          </h1>

          <p>
            Personal Banking Dashboard
          </p>

        </div>


        <button
          onClick={toggleTheme}
          className="theme-button"
        >
          {theme === "light"
            ? "🌙 Dark Mode"
            : "☀️ Light Mode"}
        </button>

      </header>


      {/* BALANCE */}

      <div
        ref={balanceCardRef}
        className="card balance-card"
      >

        <div>

          <p>
            Available Balance
          </p>

          <h2>
            ₹{formattedBalance}
          </h2>

        </div>


        <div>

          <span>
            Account Status
          </span>

          <strong>
            ● Active
          </strong>

        </div>

      </div>


      {/* CARD WIDTH */}

      {cardWidth > 0 && (

        <small className="layout-info">

          Balance card width:
          {" "}
          {cardWidth}px

        </small>

      )}


      {/* ERROR */}

      {error && (

        <div className="error-message">

          ⚠️ {error}

        </div>

      )}


      {/* OPERATIONS */}

      <h2>
        Account Operations
      </h2>


      <div className="operations">

        <button
          onClick={handleCredit}
          className="credit-button"
        >

          ⬆️

          <strong>
            Credit ₹100
          </strong>

          <span>
            Add ₹100 to account
          </span>

        </button>


        <button
          onClick={handleDebit}
          className="debit-button"
        >

          ⬇️

          <strong>
            Debit ₹100
          </strong>

          <span>
            Deduct ₹100 from account
          </span>

        </button>

      </div>


      {/* TRANSFER */}

      <div className="transfer-card">

        <div>

          <h2>
            Transfer Money
          </h2>

          <p>
            Send money to another bank account.
          </p>

        </div>


        <button
          onClick={handleTransfer}
          disabled={isPending}
        >

          {isPending
            ? "Opening..."
            : "Transfer Money →"}

        </button>

      </div>


      {/* STATISTICS */}

      <div className="stats-grid">

        <div className="card">

          <h3>
            Total Credits
          </h3>

          <p className="credit-text">

            + ₹
            {stats.totalCredits.toLocaleString(
              "en-IN"
            )}

          </p>

        </div>


        <div className="card">

          <h3>
            Total Debits
          </h3>

          <p className="debit-text">

            - ₹
            {stats.totalDebits.toLocaleString(
              "en-IN"
            )}

          </p>

        </div>


        <div className="card">

          <h3>
            Transactions
          </h3>

          <p>
            {stats.transactionCount}
          </p>

        </div>

      </div>


      {/* TRANSACTION HISTORY */}

      <section>

        <div className="history-header">

          <h2>
            Transaction History
          </h2>


          <input
            type="search"
            placeholder="Search transactions..."
            value={search}
            onChange={event =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>


        <div className="transaction-list">

          {filteredTransactions.length ===
          0 ? (

            <p className="no-data">

              No transactions found.

            </p>

          ) : (

            filteredTransactions.map(
              transaction => (

                <div
                  key={transaction.id}
                  className="transaction"
                >

                  <div>

                    <span
                      className={
                        transaction.type ===
                        "credit"
                          ? "transaction-icon credit-icon"
                          : "transaction-icon debit-icon"
                      }
                    >

                      {transaction.type ===
                      "credit"
                        ? "⬆️"
                        : "⬇️"}

                    </span>

                  </div>


                  <div className="transaction-info">

                    <strong>
                      {transaction.description}
                    </strong>

                    <small>
                      {transaction.date}
                    </small>

                  </div>


                  <strong
                    className={
                      transaction.type ===
                      "credit"
                        ? "credit-text"
                        : "debit-text"
                    }
                  >

                    {transaction.type ===
                    "credit"
                      ? "+"
                      : "-"}{" "}

                    ₹
                    {transaction.amount.toLocaleString(
                      "en-IN"
                    )}

                  </strong>

                </div>

              )
            )

          )}

        </div>

      </section>

    </div>
  );
}


export default Dashboard;