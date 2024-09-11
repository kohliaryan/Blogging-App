import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoadingScreen from "./component/LoadingScreen";

// Lazy load the components
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Landing = lazy(() => import("./pages/Landing"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen></LoadingScreen>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            {/* <Route path="/blog/:id" element={<Blog />} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
