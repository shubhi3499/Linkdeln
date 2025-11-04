import "@/styles/globals.css";
import { Provider } from "react-redux";   // ✅ you missed this import
import { store } from "@/config/redux/store"; // ✅ correct import for your store

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
