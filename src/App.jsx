import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";

import Home from "./pages/Home";
import InnerPage from "./pages/InnerPage";

const pages = [
  {
    path: "/about",
    title: "WE BELIEVE LEGACY DESERVES AUTHORITY.",
    subtitle:
      "Discover our philosophy, approach and belief in building digital authority for businesses with something meaningful to say.",
  },
  {
    path: "/work",
    title: "WORK THAT BUILDS RECOGNITION.",
    subtitle:
      "Explore selected brand transformations, digital experiences and strategic projects.",
  },
  {
    path: "/capabilities",
    title: "THE ARCHITECTURE OF AUTHORITY.",
    subtitle:
      "Strategy, identity, digital experiences, public relations, discoverability and growth infrastructure.",
  },
  {
    path: "/public-relations",
    title: "BE SEEN IN THE RIGHT ROOMS.",
    subtitle:
      "Strategic communications and media visibility that support a brand's reputation and recognition.",
  },
  {
    path: "/book-a-call",
    title: "LET'S TALK ABOUT YOUR NEXT MARKET POSITION.",
    subtitle:
      "Tell us about your business, your current position and where you want your brand to go.",
  },
  {
    path: "/contact",
    title: "EVERYTHING STARTS WITH A CONVERSATION.",
    subtitle:
      "Connect with our team in Mohali or New Delhi, India.",
  },
  {
    path: "/work/triveni",
    title: "TRIVENI",
    subtitle: "Brand presence and positioning.",
  },
  {
    path: "/work/inne",
    title: "INNE",
    subtitle: "Elevator engineering and digital experience.",
  },
  {
    path: "/work/handa-bangales",
    title: "HANDA BANGALES",
    subtitle: "Brand launch, awareness and market entry.",
  },
  {
    path: "/work/aesthetic-homez",
    title: "AESTHETIC HOMEZ",
    subtitle: "Manufacturer brand positioning and digital presence.",
  },
  {
    path: "/work/precision-metallurgy",
    title: "PRECISION METALLURGY",
    subtitle: "B2B visibility and digital positioning.",
  },
  {
    path: "/work/hcs-homes",
    title: "HCS HOMES",
    subtitle: "Architecture-focused visibility and engagement.",
  },
];

function App() {
  return (
    <BrowserRouter>
      <>
        <Preloader />
        <SmoothScroll>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            {pages.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={
                  <InnerPage
                    title={page.title}
                    subtitle={page.subtitle}
                  />
                }
              />
            ))}

            <Route
              element={
                <InnerPage
                  title="PAGE NOT FOUND."
                  subtitle="The page you are looking for could not be found."
                />
              }
              path="*"
            />
          </Routes>

          <Footer />
        </SmoothScroll>
      </>
    </BrowserRouter>
  );
}

export default App;