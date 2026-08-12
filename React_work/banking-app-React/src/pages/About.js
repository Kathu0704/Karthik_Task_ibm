import React from "react";

export default function About() {
  return (
    <main className="page">
      <div className="page-header">
        <span className="eyebrow">About</span>
        <h1>About Nimbus Bank</h1>
        <p>
          Nimbus Bank is a demo project built to show how a small banking
          dashboard can be structured in React: pages, reusable components,
          and a mock API layer standing in for a real backend.
        </p>
      </div>

      <div className="about-grid">
        <div className="card">
          <h3>Why it exists</h3>
          <p>
            This project is a starting point for learning React routing,
            component composition, and simple state management with hooks —
            using a familiar, relatable subject.
          </p>
        </div>
        <div className="card">
          <h3>What's mocked</h3>
          <p>
            All account and transaction data lives in memory in{" "}
            <code>src/api.js</code>. There is no real bank, server, or
            persistence — refreshing the page resets everything.
          </p>
        </div>
        <div className="card">
          <h3>Built with</h3>
          <p>React, React Router, and plain CSS — no UI framework, so every
          style in the app is easy to trace and modify.</p>
        </div>
        <div className="card">
          <h3>Extending it</h3>
          <p>
            Swap the functions in <code>api.js</code> for real fetch calls to
            a backend, and the rest of the app — pages and components —
            can stay the same.
          </p>
        </div>
      </div>
    </main>
  );
}
