"use client";
import React, { useState } from 'react';
import grammarData from './test35-33.json';
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/core/disclosure";
import { Languages } from "lucide-react";

interface Component {
  text: string;
  type: string;
  label: string;
  color: string;
  description: string;
}

interface Sentence {
  fullText: string;
  components: Component[];
}

interface GrammarData {
  originalText: string;
  sentences: Sentence[];
}

const GrammarVisualizer = () => {
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const data: GrammarData = grammarData;
  
  // Map original text to highlighted spans
  const renderOriginalText = () => {
    const originalText = data.originalText;
    const sentences = data.sentences;
    let result = [];
    let lastIndex = 0;
    
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const sentenceIndex = originalText.indexOf(sentence.fullText, lastIndex);
      
      if (sentenceIndex > lastIndex) {
        // Add text before the sentence
        result.push(
          <span key={`pre-${i}`} className="text-gray-800">
            {originalText.substring(lastIndex, sentenceIndex)}
          </span>
        );
      }
      
      // Add the sentence with highlight
      result.push(
        <span 
          key={`sentence-${i}`} 
          className={`cursor-pointer whitespace-pre-wrap break-words ${selectedSentence === i ? 'bg-blue-100 rounded' : ''}`}
          onClick={() => setSelectedSentence(selectedSentence === i ? null : i as unknown as null)}
        >
          {sentence.fullText}
        </span>
      );
      
      lastIndex = sentenceIndex + sentence.fullText.length;
    }
    
    // Add remaining text if any
    if (lastIndex < originalText.length) {
      result.push(
        <span key="remaining" className="text-gray-800">
          {originalText.substring(lastIndex)}
        </span>
      );
    }
    
    return result;
  };

  const getBackgroundColorClass = (color: string) => {
    return `${color} dark:bg-gray-800/10`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="bg-gray-50 rounded-lg p-1 m-2">
        <Disclosure open={isOpen} onOpenChange={setIsOpen}>
          <DisclosureTrigger>
            <div className="text-sm h-8 font-medium text-gray-500 flex items-center justify-between px-2 cursor-pointer">
              <div className="flex items-center gap-1">
                <Languages className="w-4 h-4" />
                语法分析
              </div>
              <span className="text-xs text-gray-400">
                {isOpen ? "收起" : "展开"}
              </span>
            </div>
          </DisclosureTrigger>
          
          <DisclosureContent>
            <div className="bg-white rounded-md p-2 border-gray-200 border">
              <div className="text-sm font-medium text-gray-500 mb-1 text-left">
                原文：
              </div>
              <div className="text-sm text-gray-500 whitespace-pre-line text-left">
                {renderOriginalText()}
              </div>
            </div>

            {selectedSentence !== null ? (
              <div className="bg-white rounded-md p-2 mt-1 border-gray-200 border">
                <div className="text-sm font-medium text-gray-500 mb-1 text-left">
                  句子分析：
                </div>
                <div className="mt-4 flex flex-wrap items-start justify-start gap-2">
                  {data.sentences[selectedSentence].components.map((component, componentIndex) => (
                    <span 
                      key={componentIndex}
                      className={`${getBackgroundColorClass(component.color)} word-group relative rounded-md p-1 pl-2 pr-2 font-medium min-w-8 ${selectedComponent === componentIndex ? 'bg-opacity-90' : ''}`}
                      onClick={() => setSelectedComponent(selectedComponent === componentIndex ? null : componentIndex as unknown as null)}
                    >
                      <span 
                        className="relative block before:content-[attr(data-subject)] before:font-normal before:absolute before:top-[-14px] before:left-1 before:text-[10px] before:leading-[12px] before:text-gray-500 before:bg-white before:px-1 before:py-0.5 before:rounded before:border before:border-gray-200 before:whitespace-nowrap"
                        data-subject={component.label}
                      >
                        <span className="relative block leading-[24px] cursor-pointer hover:text-blue-500 break-words whitespace-normal text-left text-sm">
                          {component.text}
                        </span>
                      </span>
                    </span>
                  ))}
                </div>

                {selectedComponent !== null && selectedComponent < data.sentences[selectedSentence].components.length ? (
                  <div className="mt-4 space-y-4 text-left">
                    <div className="space-y-2">
                      <div className={`${getBackgroundColorClass(data.sentences[selectedSentence].components[selectedComponent].color)} px-3 py-1.5 rounded-md text-sm inline-block`}>
                        {data.sentences[selectedSentence].components[selectedComponent].label}
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        {data.sentences[selectedSentence].components[selectedComponent].text}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-500 border-t pt-3">
                      <div className="flex gap-2">
                        <span className="font-medium text-gray-500 shrink-0">类型</span>
                        <span className="text-left text-gray-800">{data.sentences[selectedSentence].components[selectedComponent].type}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-medium text-gray-500 shrink-0">说明</span>
                        <span className="text-left text-gray-800">{data.sentences[selectedSentence].components[selectedComponent].description}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="bg-white rounded-md p-2 mt-1 border-gray-200 border">
                <div className="text-sm text-gray-500">点击原文中的句子以查看详细分析</div>
              </div>
            )}
          </DisclosureContent>
        </Disclosure>
      </div>
    </div>
  );
};

export default GrammarVisualizer;