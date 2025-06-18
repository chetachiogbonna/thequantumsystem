import React from 'react'

function Loader() {
  return (
    <div>
        <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse-sequence-1"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse-sequence-2"></div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse-sequence-3"></div>
        </div>

      <style jsx>{`
        @keyframes pulse-sequence-1 {
          0%, 66.67%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          33.33% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        @keyframes pulse-sequence-2 {
          0%, 33.33%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          66.67% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        @keyframes pulse-sequence-3 {
          0%, 33.33%, 66.67% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        .animate-pulse-sequence-1 {
          animation: pulse-sequence-1 0.5s ease-in-out infinite;
        }

        .animate-pulse-sequence-2 {
          animation: pulse-sequence-2 0.5s ease-in-out infinite;
        }

        .animate-pulse-sequence-3 {
          animation: pulse-sequence-3 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Loader