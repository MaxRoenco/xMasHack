import TomSection from "./components/TomSection"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProjectRoadmap from "./components/ProjectRoadmap ";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roadmap" element={<ProjectRoadmap />} />
          <Route path="/tom-section" element={<TomSection />} />
          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
