import { useState } from "react";
import AppRoutes from "./Routes";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";

function App() {
  const [account, setAccount] = useState(null);
  return <Provider store={store}>
    <AppRoutes account={account} setAccount={setAccount} />
  </Provider>
}

export default App;
