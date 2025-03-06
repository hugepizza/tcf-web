import React, { useState, useRef, InputHTMLAttributes, ChangeEvent } from 'react';

interface InputBorderSpotlightProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBorderSpotlight: React.FC<InputBorderSpotlightProps> = ({ 
  value, 
  onChange, 
  className = '', 
  ...props 
}) => {
  const divRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div className="relative w-full">
      <input
        {...props}
        value={value}
        onChange={onChange}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`h-12 w-full cursor-default rounded-xl border border-gray-300 bg-white p-3.5 text-gray-900 transition-colors duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${className}`}
      />
      <input
        ref={divRef}
        disabled
        style={{
          border: "1px solid rgb(79 70 229)", // indigo-600
          opacity,
          WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
        aria-hidden="true"
        className="border-indigo-600 pointer-events-none absolute left-0 top-0 z-10 h-12 w-full cursor-default rounded-xl border bg-[transparent] p-3.5 opacity-0 transition-opacity duration-500 placeholder:select-none"
      />
    </div>
  );
};

export default InputBorderSpotlight;