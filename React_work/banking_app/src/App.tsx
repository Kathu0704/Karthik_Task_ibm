import {
  useCallback,
  useState,
} from "react";

import {
  AccountProvider,
} from "./components/Accounts";

import Dashboard from "./components/Dashboard";

import Transfer_Detail from
  "./components/Transfer_Detail";

import {
  ThemeProvider,
} from "./components/ThemeContext";


function App() {

  const [
    page,
    setPage,
  ] = useState<
    "dashboard" | "transfer"
  >("dashboard");


  const goToTransfer =
    useCallback(() => {

      setPage("transfer");

    }, []);


  const goToDashboard =
    useCallback(() => {

      setPage("dashboard");

    }, []);


  return (

    <ThemeProvider>

      <AccountProvider>

        {page === "dashboard" ? (

          <Dashboard
            onTransfer={
              goToTransfer
            }
          />

        ) : (

          <Transfer_Detail
            onBack={
              goToDashboard
            }
          />

        )}

      </AccountProvider>

    </ThemeProvider>
  );
}


export default App;