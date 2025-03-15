import React from "react";
import Home from "./pages/Home";
import { ListProvider } from "./context/ListContext";
import "./styles.css";

const App: React.FC = () => {
  return (
    <ListProvider>
      <div className="container-fluid">
        <Home />
      </div>
    </ListProvider>
  );
};

export default App;
