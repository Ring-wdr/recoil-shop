import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { NavBar } from './components/NavBar';
import { RouteArr } from './link/Link';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <NavBar />
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
      </Router>
    </RecoilRoot>
  );
}
