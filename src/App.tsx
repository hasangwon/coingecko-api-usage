// "use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Scrap from "./pages/Scrap";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scrap" element={<Scrap />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
