import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/ui/loading";
import useConnectionStatus from "./hooks/use-connection-status";
import { syncOfflineChanges } from "./services/sync";
import Navbar from "./components/layouts/navbar";
import { Container } from "./components/layouts/container";

const Home = React.lazy(() => import("./pages/home"));
const Watched = React.lazy(() => import("./pages/watched"));
const Detail = React.lazy(() => import("./pages/detail"));

function App() {
  const isOnline = useConnectionStatus();

  React.useEffect(() => {
    if (isOnline) {
      syncOfflineChanges().catch((error) =>
        console.error("Error syncing offline changes:", error)
      );
    }
  }, [isOnline]);
  return (
    <Container>
      <Navbar />
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
        <Route>
          <Route
            element={
              <React.Suspense fallback={<Loading />}>
                <Detail />
              </React.Suspense>
            }
            path="/detail"
          />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
