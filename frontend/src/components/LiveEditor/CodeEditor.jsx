import { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_VERSIONS, CODE_SNIPPETS } from "../../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
  };

  useEffect(() => {
    setValue(CODE_SNIPPETS[language]);
  }, [language]);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-gray-900 text-white w-[96%] ml-[4%]">
      <div className="flex-1 flex">
        {/* Left Panel */}
        <div className="w-1/2 flex flex-col">
          {/* Language Selector */}
          <div className="p-4 border-b border-violet-500/20">
            <div className="mb-2 text-lg text-violet-300">Language:</div>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => onSelect(e.target.value)}
                className="w-48 px-4 py-2 bg-gray-800 border border-violet-500/30 rounded-lg
                  text-violet-100 focus:border-violet-400 focus:outline-none appearance-none cursor-pointer"
              >
                {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
                  <option key={lang} value={lang}>
                    {lang} ({version})
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
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
              language={language === "react" ? "javascript" : language}
              value={value}
              onMount={onMount}
              onChange={(newValue) => setValue(newValue || "")}
            />
          </div>
        </div>

        {/* Output Panel */}
        <Output 
          editorRef={editorRef} 
          language={language} 
          value={value}
        />
      </div>
    </div>
  );
};

export default CodeEditor;