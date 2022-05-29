import React from "react";
import "./App.css";
import BillingEntry from "./Components/BillingEntry/BillingEntry";
import Invoice from "./Components/Invoice/Invoice";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<BillingEntry />} />
          <Route path="invoice" exact element={<Invoice />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
