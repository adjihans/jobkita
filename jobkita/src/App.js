import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";

const App = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Routes />
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default App;
