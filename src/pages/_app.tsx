import { type AppType } from "next/app";
import "~/styles/globals.css";
import { NextIntlProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { Provider } from "react-redux";
import store from "~/store/store";
import { ToastProvider } from "~/context/AppDesignContext";
import { QueryClient, QueryClientProvider } from "react-query";

const MyApp: AppType<{
  messages?: AbstractIntlMessages;
}> = ({ Component, pageProps: { messages, ...pageProps } }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastProvider>
          <NextIntlProvider messages={messages}>
            <Component {...pageProps} />
          </NextIntlProvider>
        </ToastProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
