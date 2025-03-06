// components/LoadingSpinner.tsx
"use client";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-[200px]">
      <style jsx global>
        {`.loading-spinners_rotateSlow {
            animation: loading-spinners_rotate 3s linear infinite;
          }
          @keyframes loading-spinners_rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }`}
      </style>
      <svg 
        className="h-6 w-6 text-black dark:text-white loading-spinners_rotateSlow" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;