import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoadingScreen from "./component/LoadingScreen";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";

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
            <Route path="/home" element={<Home />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/post" element={<CreateBlog />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
