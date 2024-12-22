import React, { useState } from 'react';
import { Loader2, Play, HelpCircle, Send, Terminal, AlertCircle } from 'lucide-react';
import { executeCode } from '../../api'; // Added the missing import

const Output = ({ editorRef, language, value }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [advicePrompt, setAdvicePrompt] = useState("");
  const [adviceOutput, setAdviceOutput] = useState("");
  const [isAdviceLoading, setIsAdviceLoading] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      setShowAdvice(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setOutput(['An error occurred while running the code.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdviceSubmit = async () => {
    if (!advicePrompt.trim()) {
      return;
    }

    try {
      setIsAdviceLoading(true);
      const response = await fetch("http://127.0.0.1:5000/help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Code:\n${value}\n\nQuestion (GIVE REALLY SHORT ANSWER): ${advicePrompt}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAdviceOutput(data.message || "No response received");
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdviceOutput("Failed to get advice. Please try again.");
    } finally {
      setIsAdviceLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdviceSubmit();
    }
  };

  return (
    <div className="h-screen w-1/2 bg-gray-900 border-l border-violet-500/20">
      <div className="h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-violet-300">Output Console</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={runCode}
              disabled={isLoading}
              className="px-4 py-2 bg-violet-600/40 text-violet-100 font-medium rounded-lg
                border border-violet-500/30 hover:bg-violet-500/40 transition-colors 
                disabled:bg-gray-800/40 disabled:border-gray-700/30 disabled:text-gray-500 
                disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              Run Code
            </button>
            <button
              onClick={() => setShowAdvice(!showAdvice)}
              className="px-4 py-2 bg-gray-800/40 text-violet-100 font-medium rounded-lg
                border border-violet-500/30 hover:bg-violet-500/40 transition-colors
                flex items-center gap-2"
            >
              {showAdvice ? <Terminal className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
              {showAdvice ? 'Show Output' : 'Get Advice'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        {showAdvice ? (
          <div className="flex-1 flex flex-col">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Ask for advice about your code..."
                value={advicePrompt}
                onChange={(e) => setAdvicePrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-3 bg-gray-800/40 text-violet-100 border border-violet-500/30 rounded-lg 
                  focus:border-violet-400 focus:outline-none transition-colors placeholder-violet-400/50"
              />
              <button
                onClick={handleAdviceSubmit}
                disabled={isAdviceLoading || !advicePrompt.trim()}
                className="px-6 py-2 bg-violet-600/40 text-violet-100 font-medium rounded-lg
                  border border-violet-500/30 hover:bg-violet-500/40 transition-colors 
                  disabled:bg-gray-800/40 disabled:border-gray-700/30 disabled:text-gray-500 
                  disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAdviceLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Ask
              </button>
            </div>
            <div className="flex-1 bg-gray-800/40 rounded-lg border border-violet-500/20 p-4 overflow-y-auto">
              <pre className="text-violet-100 whitespace-pre-wrap font-mono">
                {adviceOutput || "Ask a question about your code to get advice..."}
              </pre>
            </div>
          </div>
        ) : (
          <div className={`flex-1 bg-gray-800/40 rounded-lg border ${isError ? 'border-red-500/50' : 'border-violet-500/20'} p-4 overflow-y-auto`}>
            {isError && (
              <div className="flex items-center gap-2 mb-4 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span>Error occurred while running the code</span>
              </div>
            )}
            {output ? (
              <pre className={`font-mono ${isError ? 'text-red-400' : 'text-violet-100'}`}>
                {output.join('\n')}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-violet-400/50">
                <span>Click "Run Code" to see the output here</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Output;