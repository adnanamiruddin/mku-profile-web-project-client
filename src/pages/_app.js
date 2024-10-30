import MainLayout from "@/components/MainLayout";
import store from "@/redux/store";
import { Provider } from "react-redux";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
}
