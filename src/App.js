import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import DCandidates from './components/candidate/DCandidates';
import DAuthenticationForm from './components/authentication/DAuthenticationForm';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Container maxWidth="lg">
          <DAuthenticationForm />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
