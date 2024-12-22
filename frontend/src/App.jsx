import KikiSection from "./components/KikiSection"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/HomePage"
import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/LiveEditor/CodeEditor";
import ChallengeEditor from "./components/ChallenegeEditor/CodeEditor";
import ChatPage from "./components/ChatPage"
import SideBar from './components/SideBar';
import ProjectRoadmap from "./components/ProjectRoadmap"
import { Star, Lock, Code, Brain, Keyboard, Mouse, Monitor, Command, FileCode, Globe, Database, Terminal, Sparkles } from 'lucide-react';

const challenges = [{
  id: 1,
  title: "Even Number Checker",
  startingCode: "const isEven = num => // write your code here \n\n\n\n\n // test cases (do not modify) \n console.log(isEven(5));console.log(isEven(3));console.log(isEven(2));console.log(isEven(10));console.log(isEven(14));",
  instructions: "Complete this function that should return true if the number is even and false if the number is odd.",
  result: "false\nfalse\ntrue\ntrue\ntrue",
  language: "javascript",
  status: "completed",
  stars: 3,
  icon: Terminal,
},
{
  id: 2,
  title: "Sum Array",
  startingCode: "const sumArray = arr => // write your code here \n\n\n\n\n // test cases (do not modify) \n console.log(sumArray([1,2,3]));console.log(sumArray([5,-2,4]));console.log(sumArray([0]));",
  instructions: "Create a function that takes an array of numbers and returns their sum.",
  result: "6\n7\n0",
  language: "javascript",
  status: "completed",
  stars: 3,
  icon: Terminal,
},
// Add more challenges here...
];

// Component to render challenge page with consistent styling
const ChallengePageWrapper = ({ challenge }) => (
  <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
    <ChallengeEditor currentChallenge={challenge} />
  </Box>
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <SideBar/> {/* Pass challenges to SideBar for navigation */}
        <Routes>
          {/* Static routes */}
          <Route path="/" element={<Home />} />
          <Route path="/kiki-section" element={<KikiSection />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/roadmap" element={<ProjectRoadmap challenges={challenges}/>} />
          <Route path="/editor" element={
            <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
              <CodeEditor />
            </Box>
          } />
          
          {/* Dynamic challenge routes */}
          {challenges.map(challenge => (
            <Route 
              key={challenge.id}
              path={`/challenges/${challenge.id}`}
              element={<ChallengePageWrapper challenge={challenge} />}
            />
          ))}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;