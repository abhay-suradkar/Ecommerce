
import React from "react";
import AppNavigator from "./src/AppNavigator";
import { Provider } from "react-redux";
import store from "./src/Redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}
export default App;
