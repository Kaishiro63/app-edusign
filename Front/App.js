
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import { Route } from "./src/components/Route";

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}
