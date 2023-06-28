import { Routes } from "./src/routes";

import { AccountProvider } from "./src/contexts/AccountFormContext";

export default function App() {
  return (
    <AccountProvider>
      <Routes />
    </AccountProvider>
  );
}

