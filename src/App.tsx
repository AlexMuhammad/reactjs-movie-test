import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/ui/loading";
import useConnectionStatus from "./hooks/use-connection-status";
import { syncOfflineChanges } from "./services/sync";

const Home = React.lazy(() => import("./pages/home"));
const Watched = React.lazy(() => import("./pages/watched"));

function App() {
  const isOnline = useConnectionStatus();

  React.useEffect(() => {
    if (isOnline) {
      syncOfflineChanges().catch((error) =>
        console.error("Error syncing offline changes:", error)
      );
    }
  }, [isOnline])
  return (
    <>
      <h3>Network Status: {isOnline ? "Online" : "Offline"}</h3>
      <Routes>
        <Route>
          <Route
            element={
              <React.Suspense fallback={<Loading />}>
                <Home />
              </React.Suspense>
            }
            path="/"
          />
        </Route>
        <Route>
          <Route
            element={
              <React.Suspense fallback={<Loading />}>
                <Watched />
              </React.Suspense>
            }
            path="/watched"
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
