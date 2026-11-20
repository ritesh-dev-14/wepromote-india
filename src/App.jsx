import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";

import Home from "./pages/Home";
import About from "./pages/About";
import {
  BookCallPage,
  CapabilitiesPage,
  ContactPage,
  NotFoundPage,
  ProjectDetailPage,
  PublicRelationsPage,
  WorkPage,
} from "./pages/BrandPages";

function App() {
  return (
    <BrowserRouter>
      <>
        <Preloader />
        <SmoothScroll>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectDetailPage />} />
            <Route path="/capabilities" element={<CapabilitiesPage />} />
            <Route path="/public-relations" element={<PublicRelationsPage />} />
            <Route path="/book-a-call" element={<BookCallPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
        </SmoothScroll>
      </>
    </BrowserRouter>
  );
}

export default App;