import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      networkMode: "offlineFirst",
      onError(error) {
        console.error(error);
      },
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
          // Check if the browser is online
          const isOnline = navigator.onLine;

          // Allow dehydrating if online, otherwise, don't dehydrate
          return isOnline;
        },
      },
    }}
  >
    <RouterProvider router={router} />
  </PersistQueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
