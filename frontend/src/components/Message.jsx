import { Sphere, Text } from '@react-three/drei'
import { Brain } from 'lucide-react'
import React from 'react'

const Message = () => {
  return (
    <>
          {/* KiKi's Hint Box */}
          <div className="absolute bottom-0 right-0 w-72 bg-violet-900/20 border border-violet-500/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <Brain className="w-6 h-6 text-violet-400 flex-shrink-0 animate-pulse" />
              <div>
                <h4 className="text-violet-300 font-semibold mb-1">KiKi's Hint</h4>
                <p className="text-gray-300 text-sm">
                  Complete each level to earn stars and unlock new challenges. 
                  I'll guide you through best practices along the way!
                </p>
              </div>
            </div>
          </div>
    </>
  )
}

export default Message
