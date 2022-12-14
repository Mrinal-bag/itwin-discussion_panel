import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";



const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer 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`,
  },
});
// const client = ...



root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();