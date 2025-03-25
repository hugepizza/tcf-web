'use client';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { TextMorph } from '@/components/core/text-morph';
import { useRouter, usePathname } from 'next/navigation';

export function Selector() {
  const router = useRouter();
  const pathname = usePathname();
  const TRANSITION = {
    type: 'spring',
    stiffness: 280,
    damping: 18,
    mass: 0.3,
  };

  const options = [
    { label: '阅读', path: '/resources/reading/by-suite' },
    { label: '听力', path: '/resources/listening/by-suite' }
  ];

  // 根据当前路径设置初始选中值
  const initialValue = pathname.includes('/reading') ? '阅读' : '听力';
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const label = '科目';

  const handleSelect = (value: string, path: string) => {
    setSelectedValue(value);
    router.push(path);
  };

  return (
    <div className='flex items-center justify-center px-0 sm:px-6 py-24 sm:py-32 lg:px-8'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            layout='size'
            className='overflow-hidden rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-[#f9f9f9]'
            transition={TRANSITION}
          >
            <motion.div
              layout='preserve-aspect'
              className='inline-flex items-center gap-1'
              transition={TRANSITION}
            >
              <span className='text-[#5d5d5d]'>{label}</span>
              <TextMorph>{selectedValue}</TextMorph>
              <ChevronDown className='h-4 w-4 text-[#b4b4b4]' />
            </motion.div>
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='shadow-sm'>
          {options.map((option) => (
            <DropdownMenuItem 
              key={option.label} 
              onClick={() => handleSelect(option.label, option.path)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
