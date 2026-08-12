# Nimbus Bank — React Banking Demo

A small demo banking dashboard built with React and React Router. All data
(accounts, transactions, transfers) is mocked in `src/api.js` and lives in
memory, so no backend is required.

## Setup

```bash
npm install
npm start
```

The app runs at http://localhost:3000.

## Structure

```
src/
├── components/
│   ├── AccountDetails.js   # Selectable account cards
│   ├── Transactions.js     # Transaction list for the selected account
│   └── TransferFunds.js    # Form to move money between accounts
├── pages/
│   ├── Home.js              # Landing page with total balance summary
│   ├── Accounts.js          # Combines the three components above
│   └── About.js             # Static info page
├── App.js                   # Router + navbar/footer shell
├── index.js                 # React entry point
├── index.css                # Global styles / design tokens
└── api.js                   # Mock API (accounts, transactions, transfer)
```

## Notes

- Refreshing the page resets all data back to the initial mock state.
- To connect a real backend, replace the functions in `src/api.js` with
  `fetch`/`axios` calls — the rest of the app doesn't need to change.
