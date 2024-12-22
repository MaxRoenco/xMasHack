import KikiSection from "./components/KikiSection"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/HomePage"
import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/LiveEditor/CodeEditor";
import ChallengeEditor from "./components/ChallenegeEditor/CodeEditor";
import ChatPage from "./components/ChatPage"
import SideBar from './components/SideBar';
import ProjectRoadmap from "./components/ProjectRoadmap"
import { Terminal } from 'lucide-react';
import KikiTok from "./components/KikiToki"

const challenges = [
{
  title: "Even Number Checker",
  optimal: "const isEven = num => !(num%2);",
  startingCode: `const isEven = num => // write your code here 
  
  
  
// test cases (do not modify) 
console.log(isEven(5));
console.log(isEven(3));
console.log(isEven(2));
console.log(isEven(10));
console.log(isEven(14));`,
  instructions: "Complete this function that should return true if the number is even and false if the number is odd.",
  result: "false\nfalse\ntrue\ntrue\ntrue",
  language: "javascript",
  status: "completed",
  stars: 3,
  icon: Terminal,
},
{
  title: "Sum Array",
  optimal: "const sumArray = arr => arr.reduce((a,b) => a+b, 0);",
  startingCode: `const sumArray = arr => // write your code here 
  
  
  
// test cases (do not modify) 
console.log(sumArray([1,2,3]));
console.log(sumArray([5,-2,4]));
console.log(sumArray([0]));`,
  instructions: "Create a function that takes an array of numbers and returns their sum.",
  result: "6\n7\n0",
  language: "javascript",
  status: "completed",
  stars: 3,
  icon: Terminal,
},
{
  title: "Reverse String",
  optimal: "const reverseString = str => str.split('').reverse().join('');",
  startingCode: `const reverseString = str => // write your code here 
  
  
  
// test cases (do not modify) 
console.log(reverseString('hello'));
console.log(reverseString('world'));
console.log(reverseString('JavaScript'));`,
  instructions: "Write a function that reverses a given string.",
  result: "olleh\ndlrow\ntpircsavaJ",
  language: "javascript",
  status: "completed",
  stars: 2,
  icon: Terminal,
},
{
  title: "Factorial Finder",
  optimal: "const factorial = n => (n === 0 ? 1 : n * factorial(n - 1));",
  startingCode: `const factorial = n => // write your code here 
  
  
  
// test cases (do not modify) 
console.log(factorial(5));
console.log(factorial(3));
console.log(factorial(0));`,
  instructions: "Implement a function to calculate the factorial of a number.",
  result: "120\n6\n1",
  language: "javascript",
  status: "completed",
  stars: 4,
  icon: Terminal,
},
{
  title: "Palindrome Checker",
  optimal: "const isPalindrome = str => str === str.split('').reverse().join('');",
  startingCode: `const isPalindrome = str => // write your code here 
  
  
  
// test cases (do not modify) 
console.log(isPalindrome('racecar'));
console.log(isPalindrome('hello'));
console.log(isPalindrome('madam'));`,
  instructions: "Write a function to check if a string is a palindrome.",
  result: "true\nfalse\ntrue",
  language: "javascript",
  status: "completed",
  stars: 3,
  icon: Terminal,
},
{
  title: "FizzBuzz",
  optimal: `const fizzBuzz = n => {
for (let i = 1; i <= n; i++) {
  console.log(i % 3 === 0 && i % 5 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : i);
}
};`,
  startingCode: `const fizzBuzz = n => {
// write your code here

}

// test cases (do not modify) 
fizzBuzz(15);`,
  instructions: "Implement the FizzBuzz logic: for multiples of 3 print 'Fizz,' for multiples of 5 print 'Buzz,' and for multiples of both 3 and 5 print 'FizzBuzz.' Otherwise, print the number.",
  result: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
  language: "javascript",
  status: "completed",
  stars: 4,
  icon: Terminal,
},
{
  title: "Find Maximum",
  optimal: "const findMax = arr => Math.max(...arr);",
  startingCode: `const findMax = arr => // write your code here 
  
  
  
// test cases (do not modify) 
console.log(findMax([1, 2, 3]));
console.log(findMax([-1, -2, -3]));
console.log(findMax([5, 10, 15]));`,
  instructions: "Create a function that returns the maximum number from an array.",
  result: "3\n-1\n15",
  language: "javascript",
  status: "completed",
  stars: 2,
  icon: Terminal,
},
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
          <Route path="/kikitok" element={<KikiTok />} />
          <Route path="/editor" element={
            <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
              <CodeEditor />
            </Box>
          } />
          
          {/* Dynamic challenge routes */}
          {challenges.map((challenge, i) => (
            <Route 
              key={i+1}
              path={`/challenges/${i+1}`}
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