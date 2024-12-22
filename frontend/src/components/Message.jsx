import React, { useState, useEffect } from 'react';
import { Brain, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Message = ({ tips = [] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const formatTips = (tips) => {
    return tips.map((tip, index) => {
      if (typeof tip === 'string') {
        return {
          title: `Tip ${index + 1}`,
          description: tip,
        };
      }
      return {
        title: tip.title || `Tip ${index + 1}`,
        description: tip.description || tip,
      };
    });
  };

  const formattedTips = formatTips(tips);

  const currentTip = formattedTips[currentStep];
  const hasNextStep = currentStep < formattedTips.length - 1;
  const hasPrevStep = currentStep > 0;

  const handleNext = () => {
    if (hasNextStep) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (hasPrevStep) setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    // Reset visibility and step index when new tips are added
    if (tips.length > 0) {
      setIsVisible(true);
      setCurrentStep(0);
    }
  }, [tips]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setIsVisible(false);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep]);

  return (
    <AnimatePresence>
      {isVisible && formattedTips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-[50px] right-[220px] w-80 bg-violet-900/30 border border-violet-500/40 rounded-lg p-4 backdrop-blur-md shadow-lg"
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-violet-900/30 rounded-t-lg overflow-hidden">
            <motion.div
              className="h-full bg-violet-500"
              initial={{ width: '0%' }}
              animate={{
                width: `${((currentStep + 1) / formattedTips.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-violet-300 hover:text-violet-100 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="relative mt-1">
              <Brain className="w-6 h-6 text-violet-400 flex-shrink-0 animate-pulse" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-violet-400 rounded-full animate-ping opacity-75" />
            </div>

            {/* Content */}
            <div className="flex-1 min-h-[80px]">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-violet-300 font-semibold">KiKi's Hint</h4>
                <span className="text-xs text-violet-400">
                  {currentStep + 1}/{formattedTips.length}
                </span>
              </div>

              {/* Tip Content */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-gray-300 text-sm"
              >
                {currentTip.description}
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-3">
                <button
                  onClick={handlePrev}
                  disabled={!hasPrevStep}
                  className={`p-1 rounded transition-colors ${
                    hasPrevStep
                      ? 'text-violet-300 hover:text-violet-100 hover:bg-violet-800/50'
                      : 'text-violet-700 cursor-not-allowed'
                  }`}
                  title="Previous tip"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={!hasNextStep}
                  className={`p-1 rounded transition-colors ${
                    hasNextStep
                      ? 'text-violet-300 hover:text-violet-100 hover:bg-violet-800/50'
                      : 'text-violet-700 cursor-not-allowed'
                  }`}
                  title="Next tip"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Message;
