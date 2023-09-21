import ReactDOM from "react-dom/client";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ToastContainer } from "react-toastify";
import { MINUTE } from "@/utils";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      retry: Infinity,
      refetchOnReconnect: true,
      refetchInterval: 5 * MINUTE,
      cacheTime: Infinity,
    },
  },
});
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => {
          return !!query.state.data;
        },
      },
    }}
  >
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    <RouterProvider router={router} />
    <ToastContainer />
  </PersistQueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
