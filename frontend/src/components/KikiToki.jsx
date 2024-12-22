import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Copy,
  ChevronUp,
  ChevronDown,
  Brain,
  Code,
  Terminal,
  Cpu,
  Database
} from 'lucide-react';


const FloatingIcon = ({ icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1],
      y: [0, -20, 0]
    }}
    transition={{
      duration: 5,
      delay,
      repeat: Infinity,
    }}
    className="absolute text-purple-500/10"
  >
    <Icon size={32} />
  </motion.div>
);

const solutions = [
  {
    id: 1,
    title: "Implementing Binary Search",
    difficulty: "Medium",
    tags: ['algorithms', 'searching', 'python'],
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`,
    explanation: "Binary search is an efficient algorithm that reduces search space by half in each step. Time complexity: O(log n).",
    likes: 1234,
    comments: 89
  },
  {
    id: 2,
    title: "Recursive Binary Search",
    difficulty: "Medium",
    tags: ['recursion', 'algorithms', 'python'],
    code: `def binary_search_recursive(arr, target, left, right):
    if left > right:
        return -1
        
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)`,
    explanation: "A recursive implementation of binary search that breaks down the problem into smaller subproblems.",
    likes: 892,
    comments: 45
  },
  {
    id: 3,
    title: "Binary Search with Custom Comparator",
    difficulty: "Hard",
    tags: ['advanced', 'algorithms', 'python'],
    code: `def binary_search_with_comparator(arr, target, comparator):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        comparison = comparator(arr[mid], target)
        
        if comparison == 0:
            return mid
        elif comparison < 0:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1`,
    explanation: "Advanced implementation supporting custom comparison logic for complex data structures.",
    likes: 567,
    comments: 32
  },
  {
    id: 4,
    title: "Binary Search with Duplicates",
    difficulty: "Hard",
    tags: ['optimization', 'algorithms', 'python'],
    code: `def binary_search_leftmost(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid
            right = mid - 1
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return result`,
    explanation: "Modified binary search that finds the leftmost occurrence of a target value in a sorted array with duplicates.",
    likes: 743,
    comments: 56
  }
];

const comments = [
  {
    id: 1,
    user: "Alex Chen",
    avatar: "/api/placeholder/32/32",
    content: "Great explanation! The time complexity analysis really helped.",
    likes: 24,
    timestamp: "2h ago"
  },
  {
    id: 2,
    user: "Sarah Kim",
    avatar: "/api/placeholder/32/32",
    content: "Could you explain how this would work with duplicate elements?",
    likes: 18,
    timestamp: "4h ago"
  },
  {
    id: 3,
    user: "Mike Johnson",
    avatar: "/api/placeholder/32/32",
    content: "The recursive implementation is so clean and elegant!",
    likes: 15,
    timestamp: "5h ago"
  }
];
const KikiToki = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState({});
    const [newComment, setNewComment] = useState("");
  
    const handleSwipe = (direction) => {
      if (direction === 'up' && currentIndex < solutions.length - 1) {
        setCurrentIndex(curr => curr + 1);
      } else if (direction === 'down' && currentIndex > 0) {
        setCurrentIndex(curr => curr - 1);
      }
    };
  
    const handleLike = () => {
      setLikes(prev => ({
        ...prev,
        [currentIndex]: !prev[currentIndex]
      }));
    };
  
    const handleAddComment = () => {
      if (newComment.trim()) {
        setNewComment("");
      }
    };
  
    const currentSolution = solutions[currentIndex];
  
    return (
      <div className="relative min-h-screen w-full max-w-lg mx-auto bg-[#0A0118]">
        {/* Decorative Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(128,90,213,0.12),transparent_50%)]" />
          <FloatingIcon icon={Code} delay={0} />
          <FloatingIcon icon={Terminal} delay={1} />
          <FloatingIcon icon={Cpu} delay={2} />
          <FloatingIcon icon={Database} delay={3} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent" />
        </div>
  
        {/* Main Container */}
        <div className="relative min-h-screen flex flex-col">
          {/* Top Navigation Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 z-50 bg-[#0A0118]/80 backdrop-blur-lg border-b border-purple-500/10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
          >
            <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Brain className="w-8 h-8 text-purple-400" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  KikiTok
                </span>
              </div>
              <div className="px-3 py-1 bg-purple-500/10 rounded-full text-purple-300 text-sm font-medium">
                {currentIndex + 1}/{solutions.length}
              </div>
            </div>
          </motion.div>
  
          {/* Main Content Area */}
          <div className="flex-1 mt-16 pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="p-4"
              >
                {/* Content Card */}
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/10 shadow-xl">
                  {/* Title Section */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-purple-200">
                      {currentSolution.title}
                    </h2>
                    <span className="px-3 py-1 bg-purple-600/20 rounded-full text-purple-300 text-sm font-medium">
                      {currentSolution.difficulty}
                    </span>
                  </div>
  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentSolution.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-purple-500/10 rounded-full text-sm text-purple-300">
                        #{tag}
                      </span>
                    ))}
                  </div>{/* Code Section */}
                <div className="relative mb-6 group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-gray-900 rounded-lg p-4 font-mono text-sm text-purple-200 overflow-x-auto">
                    <pre>{currentSolution.code}</pre>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {currentSolution.explanation}
                </p>

                {/* Author Section */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <Brain className="w-7 h-7 text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-purple-200 block">KiKi</span>
                    <span className="text-sm text-gray-400">AI Senior Developer</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fixed Navigation Controls */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-purple-500/20 backdrop-blur rounded-full text-purple-300 hover:bg-purple-500/30 transition-colors"
            onClick={() => handleSwipe('down')}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-purple-500/20 backdrop-blur rounded-full text-purple-300 hover:bg-purple-500/30 transition-colors"
            onClick={() => handleSwipe('up')}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Fixed Interaction Buttons */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-purple-500/20 backdrop-blur rounded-full text-white hover:bg-purple-500/30 transition-all flex flex-col items-center"
            onClick={handleLike}
          >
            <Heart className={likes[currentIndex] ? 'text-red-500 fill-red-500' : ''} />
            <span className="text-xs mt-1">{currentSolution.likes}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-purple-500/20 backdrop-blur rounded-full text-white hover:bg-purple-500/30 transition-all flex flex-col items-center"
            onClick={() => setShowComments(true)}
          >
            <MessageCircle />
            <span className="text-xs mt-1">{currentSolution.comments}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-purple-500/20 backdrop-blur rounded-full text-white hover:bg-purple-500/30 transition-all"
          >
            <Share2 />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-purple-500/20 backdrop-blur rounded-full text-white hover:bg-purple-500/30 transition-all"
          >
            <Bookmark />
          </motion.button>
        </div>{/* Comments Drawer */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-0 bg-[#0A0118]/95 backdrop-blur-xl z-50"
            >
              <div className="max-w-lg mx-auto h-full p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-purple-200">Comments</h3>
                  <button 
                    onClick={() => setShowComments(false)}
                    className="p-2 hover:bg-purple-500/20 rounded-full transition-colors"
                  >
                    <ChevronDown className="w-6 h-6 text-purple-300" />
                  </button>
                </div>

{/* Comments List */}
<div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-purple-500/10 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {/* <Avatar className="w-8 h-8 border border-purple-500/20">
                          <img src={comment.avatar} alt={comment.user} />
                        </Avatar> */}
                        <div className="flex-1">
                          <h4 className="text-purple-200 font-medium">{comment.user}</h4>
                          <span className="text-xs text-purple-300">{comment.timestamp}</span>
                        </div>
                        <button className="text-purple-300 text-sm flex items-center gap-1">
                          <Heart className="w-4 h-4" /> {comment.likes}
                        </button>
                      </div>
                      <p className="text-purple-100">{comment.content}</p>
                    </div>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0A0118]/80 backdrop-blur-lg border-t border-purple-500/10">
                  <div className="max-w-lg mx-auto flex gap-2">
                    {/* <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-purple-500/10 border-purple-500/30 text-purple-100 placeholder-purple-300/50"
                    /> */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddComment}
                      className="p-2 bg-purple-500 rounded-full text-white disabled:opacity-50"
                      disabled={!newComment.trim()}
                    >
                      <ChevronUp className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default KikiToki;