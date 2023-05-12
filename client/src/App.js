import React from "react";
import { Parent } from "./parent";
import { Child } from "./child";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Parent />} />
          <Route path="/child" element={<Child />} />
        </Routes>
      </Router>
    </div>
  );
};
