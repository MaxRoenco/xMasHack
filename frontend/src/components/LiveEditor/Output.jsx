import { useState } from "react";
import { Box, Button, Text, Input, VStack, useToast } from "@chakra-ui/react";
import { executeCode } from "../../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [advicePrompt, setAdvicePrompt] = useState("");
  const [adviceOutput, setAdviceOutput] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      setShowAdvice(false); // Switch back to output view when running code
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdviceSubmit = () => {
    // This will be implemented later by you
    console.log("Advice prompt:", advicePrompt);
  };

  return (
    <Box w="50%" maxW="50%" overflow="hidden">
      <VStack spacing={4} align="stretch" h="100%">
        <Text fontSize="lg">Output</Text>

        <Box>
          <Button
            variant="outline"
            colorScheme="green"
            mr={4}
            isLoading={isLoading}
            onClick={runCode}
          >
            Run Code
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => setShowAdvice(!showAdvice)}
          >
            {showAdvice ? "Show Output" : "Get Advice"}
          </Button>
        </Box>

        {showAdvice ? (
          <Box w="100%" overflow="hidden">
            <Input
              placeholder="Ask for advice about your code..."
              value={advicePrompt}
              onChange={(e) => setAdvicePrompt(e.target.value)}
              mb={2}
              w="100%"
            />
            <Button
              colorScheme="blue"
              size="sm"
              onClick={handleAdviceSubmit}
              mb={4}
            >
              Submit
            </Button>
            <Box
              height="60vh"
              p={2}
              color={isError ? "red.400" : ""}
              border="1px solid"
              borderRadius={4}
              borderColor={isError ? "red.500" : "#333"}
              overflowY="auto"
              w="100%"
            >
              {'Click "Run Code" to see the output here'}
            </Box>
          </Box>
        ) : (
          <Box
            height="75vh"
            p={2}
            color={isError ? "red.400" : ""}
            border="1px solid"
            borderRadius={4}
            borderColor={isError ? "red.500" : "#333"}
            overflowY="auto"
            w="100%"
          >
            {output
              ? output.map((line, i) => <Text key={i}>{line}</Text>)
              : 'Click "Run Code" to see the output here'}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Output;