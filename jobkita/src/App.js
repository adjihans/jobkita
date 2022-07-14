import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
const App = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <ToastContainer position="top-right" autoClose={500} closeOnClick />
          <Routes />
        </Router>
      </ApolloProvider>
    </div>
  );
};

export default App;
