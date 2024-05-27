import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../../redux/store"; // Adjust the path to your store
import DashboardLayout from ".";

const WithReduxProvider = () => (
  <ReduxProvider store={store}>
    <DashboardLayout />
  </ReduxProvider>
);

export default WithReduxProvider;