import TomSection from "./components/TomSection"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tom-section" element={<TomSection />} />
          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
