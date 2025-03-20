"use client";
import React, { useState } from 'react';
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/core/disclosure";
import { BookOpen } from "lucide-react";

interface AnalysisData {
  examPointAnalysis: string;
  textAnalysis: string;
  answerAnalysis: string;
  distractorAnalysis: string;
}

const AnalysisVisualizer = ({ data }: { data: AnalysisData }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="bg-gray-50 rounded-lg p-1 m-2">
        <Disclosure open={isOpen} onOpenChange={setIsOpen}>
          <DisclosureTrigger>
            <div className="text-sm h-8 font-medium text-gray-500 flex items-center justify-between px-2 cursor-pointer">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                解题分析
              </div>
              <span className="text-xs text-gray-400">
                {isOpen ? "收起" : "展开"}
              </span>
            </div>
          </DisclosureTrigger>
          
          <DisclosureContent>
            {/* Exam Point Analysis */}
            <div className="bg-white rounded-md p-2 border-gray-200 border mb-1">
              <div className="text-sm font-medium text-gray-500 mb-1 text-left">
                考点分析：
              </div>
              <div className="text-sm text-gray-800 whitespace-pre-line text-left">
                {data.examPointAnalysis}
              </div>
            </div>

            {/* Text Analysis */}
            <div className="bg-white rounded-md p-2 border-gray-200 border mb-1">
              <div className="text-sm font-medium text-gray-500 mb-1 text-left">
                原文分析：
              </div>
              <div className="text-sm text-gray-800 whitespace-pre-line text-left">
                {data.textAnalysis}
              </div>
            </div>

            {/* Answer Analysis */}
            <div className="bg-white rounded-md p-2 border-gray-200 border mb-1">
              <div className="text-sm font-medium text-gray-500 mb-1 text-left">
                答案分析：
              </div>
              <div className="text-sm text-gray-800 whitespace-pre-line text-left">
                {data.answerAnalysis}
              </div>
            </div>

            {/* Distractor Analysis */}
            <div className="bg-white rounded-md p-2 border-gray-200 border">
              <div className="text-sm font-medium text-gray-500 mb-1 text-left">
                干扰项分析：
              </div>
              <div className="text-sm text-gray-800 whitespace-pre-line text-left">
                {data.distractorAnalysis}
              </div>
            </div>
          </DisclosureContent>
        </Disclosure>
      </div>
    </div>
  );
};

export default AnalysisVisualizer; 