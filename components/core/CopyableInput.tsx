'use client'

import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Copy, Check } from "lucide-react" // 需要安装 lucide-react

interface CopyableInputProps {
  value: string
  className?: string
}

export default function CopyableInput({ value, className }: CopyableInputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className="relative">
      <Input
        className={className}
        disabled
        value={value}
      />
      <button
        onClick={handleCopy}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-gray-100 transition-colors"
        title={copied ? '已复制' : '复制'}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-500" />
        )}
      </button>
    </div>
  )
}