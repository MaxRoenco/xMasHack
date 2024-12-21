import { useRef, useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]); // Initialize based on the default language.

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]); // Sync value with selected language snippet.
  };

  // Ensure value is always synced when the language changes (optional safeguard).
  useEffect(() => {
    setValue(CODE_SNIPPETS[language]);
  }, [language]);

  return (
    <Box w="full">
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language === "react" ? "javascript" : language}
            value={value} // Use value instead of defaultValue for two-way binding.
            onMount={onMount}
            onChange={(value) => setValue(value || "")} // Update state when editor content changes.
          />
        </Box>
        <Output editorRef={editorRef} language={language} value={value} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
