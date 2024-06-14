import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/ui/loading";

const Home = React.lazy(() => import("./pages/home"));
const Watched = React.lazy(() => import("./pages/watched"));

function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route
            element={
              <React.Suspense fallback={<Loading/>}>
                <Home />
              </React.Suspense>
            }
            path="/"
          />
        </Route>
        <Route>
          <Route
            element={
              <React.Suspense fallback={<Loading/>}>
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
