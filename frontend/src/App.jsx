import KikiSection from "./components/KikiSection"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/HomePage"
import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/LiveEditor/CodeEditor";
import ChatPage from "./components/ChatPage"
import SideBar from './components/SideBar';

function App() {
  return (
    <div>

      <BrowserRouter>
      <SideBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kiki-section" element={<KikiSection />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/editor" element={
            <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
              <CodeEditor />
            </Box>
          } />
          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App;
