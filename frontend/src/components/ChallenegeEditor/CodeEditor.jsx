import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { Loader2, Play, AlertCircle, CheckCircle2 } from 'lucide-react';
import KikiSection from "../KikiSection";
import Message from "../Message";

const CodingChallengeEditor = ({ currentChallenge }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  useEffect(() => {
    setValue(currentChallenge.startingCode);
  }, [currentChallenge]);

  const verifyOutput = (output) => {
    const expectedLines = currentChallenge.result.split('\n');
    const actualLines = output.trim().split('\n');
    
    if (expectedLines.length !== actualLines.length) return false;
    
    return expectedLines.every((expected, index) => 
      expected.trim() === actualLines[index].trim()
    );
  };

  const runCode = async () => {
    if (!editorRef.current) return;
    
    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      
      // Simulated code execution - replace with your actual executeCode function
      const sourceCode = editorRef.current.getValue();
      const result = await new Promise((resolve) => {
        try {
          let output = '';
          const originalLog = console.log;
          console.log = (...args) => {
            output += args.join(' ') + '\n';
          };
          
          eval(sourceCode);
          
          console.log = originalLog;
          resolve({ output });
        } catch (error) {
          resolve({ error: error.toString() });
        }
      });

      if (result.error) {
        setIsError(true);
        setOutput([result.error]);
        return;
      }

      const success = verifyOutput(result.output);
      setIsSuccess(success);
      setOutput(result.output.split('\n'));
      
    } catch (error) {
      console.error(error);
      setIsError(true);
      setOutput(['An error occurred while running the code.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-gray-900 text-white w-[96%] ml-[4%]">
      <div className="flex-1 flex">
        {/* Left Panel */}
        <div className="w-1/2 flex flex-col">
          {/* Instructions */}
          <div className="p-4 border-b border-violet-500/20">
            <h2 className="text-lg font-semibold text-violet-300 mb-2">Challenge Instructions:</h2>
            <p className="text-violet-100">{currentChallenge.instructions}</p>
          </div>
          
          {/* Editor */}
          <div className="flex-1 relative">
            <Editor
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
              className="h-full"
              theme="vs-dark"
              language={currentChallenge.language}
              value={value}
              onMount={onMount}
              onChange={(newValue) => setValue(newValue || "")}
            />
          </div>
        </div>
        <KikiSection isSuccess={isSuccess} className="right-[-12%] top-[25%]"/>
        <Message tips={['Please specify the topic or purpose of the text, so I can tailor it to your needs within 100 characters!', '2', '3']}/>
        {/* Output Panel */}
        <div className="h-screen w-1/2 bg-gray-900 border-l border-violet-500/20">
          <div className="h-full flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-violet-300">Output</h2>
              <button
                onClick={runCode}
                disabled={isLoading}
                className="px-4 py-2 bg-violet-600/40 text-violet-100 font-medium rounded-lg
                  border border-violet-500/30 hover:bg-violet-500/40 transition-colors 
                  disabled:bg-gray-800/40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Run Code
              </button>
            </div>

            <div className={`flex-1 bg-gray-800/40 rounded-lg border 
              ${isError ? 'border-red-500/50' : isSuccess ? 'border-green-500/50' : 'border-violet-500/20'} 
              p-4 overflow-y-auto`}
            >
              {isError && (
                <div className="flex items-center gap-2 mb-4 text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <span>Error occurred while running the code</span>
                </div>
              )}
              {isSuccess && (
                <div className="flex items-center gap-2 mb-4 text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Challenge completed successfully!</span>
                </div>
              )}
              {output ? (
                <pre className={`font-mono ${
                  isError ? 'text-red-400' : 
                  isSuccess ? 'text-green-400' : 
                  'text-violet-100'
                }`}>
                  {output.join('\n')}
                </pre>
              ) : (
                <div className="flex items-center justify-center h-full text-violet-400/50">
                  <span>Click "Run Code" to see the output here</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingChallengeEditor;