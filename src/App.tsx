import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { RouteArr } from "./link/Link";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Layout>
          <Routes>
            {RouteArr.map(([key, path, SingleRoute]) => (
              <Route
                key={key}
                path={path}
                element={
                  <Suspense fallback={<div>Loading</div>}>
                    <SingleRoute />
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </RecoilRoot>
  );
}
