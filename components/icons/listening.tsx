import * as React from 'react';
import type { SVGProps } from 'react';

export function Listening({ 
  width = 16,
  height = 16,
  stroke = "#8C8C8C",
  ...props 
}: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path 
        d="M7.00244 10V11.3333M9.33577 5.33333V13.3333M11.6691 7.33333V11.3333M14.0024 8.66666V10" 
        stroke={stroke} 
        strokeWidth="1.33333" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M2.00244 3.85186V2.66667H4.66911M4.66911 2.66667H7.33577V3.85186M4.66911 2.66667V8.00001M4.66911 8.00001H3.78021M4.66911 8.00001H5.55799" 
        stroke={stroke} 
        strokeWidth="1.33333" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
