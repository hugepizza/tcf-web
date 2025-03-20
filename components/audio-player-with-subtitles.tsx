"use client";

import { useRef, useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ArrowPathRoundedSquareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
} from "@/components/core/disclosure";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import "./audio-player-styles.css";

// Custom CSS to override the default styles

interface AudioPlayerProps {
  audioUrl: string;
  subtitleUrl?: string;
}

interface Subtitle {
  id: number;
  start: number;
  end: number;
  text: string;
  translation?: string;
  timestamp?: string;
}

export function AudioPlayerWithSubtitles({
  audioUrl,
  subtitleUrl,
}: AudioPlayerProps) {
  const playerRef = useRef<any>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const subtitleContainerRef = useRef<HTMLDivElement>(null);
  const [isSubtitleOpen, setIsSubtitleOpen] = useState(true);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);

  // 客户端挂载检测
  useEffect(() => {
    setMounted(true);
  }, []);

  // 当播放速度状态或音频源变化时更新实际的播放速度
  useEffect(() => {
    if (playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.playbackRate = playbackRate;
    }
  }, [playbackRate, audioUrl]);

  // 加载字幕
  useEffect(() => {
    if (!subtitleUrl || !mounted) return;

    console.log("加载字幕:", subtitleUrl);

    fetch(subtitleUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("获取字幕内容长度:", data.length);
        const parsedSubtitles = parseSRT(data);
        console.log(`解析出${parsedSubtitles.length}条字幕`);
        if (parsedSubtitles.length > 0) {
          console.log("首条字幕示例:", parsedSubtitles[0]);
        }
        setSubtitles(parsedSubtitles);
      })
      .catch((error) => {
        console.error("加载字幕失败:", error);
        setError(`加载字幕失败: ${error.message}`);
      });
  }, [subtitleUrl, mounted]);

  // 解析SRT字幕 - 处理双语字幕
  const parseSRT = (srtContent: string): Subtitle[] => {
    try {
      // 处理不同的换行符格式
      const normalizedContent = srtContent
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n");
      const blocks = normalizedContent.split("\n\n").filter(Boolean);

      return blocks
        .map((block, index): Subtitle | null => {
          const lines = block.split("\n").filter(Boolean);

          // 尝试解析序号
          let id = index + 1;
          try {
            if (!isNaN(parseInt(lines[0]))) {
              id = parseInt(lines[0]);
            }
          } catch (e) {
            console.warn("无法解析序号:", lines[0]);
          }

          // 查找时间戳行
          let timestampLine = "";
          let textStartIndex = 0;

          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(" --> ")) {
              timestampLine = lines[i];
              textStartIndex = i + 1;
              break;
            }
          }

          if (!timestampLine) {
            console.error("找不到时间戳:", block);
            return null;
          }

          // 解析时间戳
          const [startTime, endTime] = timestampLine.split(" --> ");
          const start = timeToSeconds(startTime.trim());
          const end = timeToSeconds(endTime.trim());
          const timestamp = formatTimeMMSS(start);

          // 获取字幕文本和翻译
          const textLines = lines.slice(textStartIndex);
          let text = "";
          let translation = "";

          // 如果有多行，尝试检测是否为双语字幕
          if (textLines.length >= 2) {
            // 检测第一行是否为非中文，第二行是否为中文
            const isFirstLineNonChinese =
              !/[\u4e00-\u9fa5]/.test(textLines[0]) &&
              /[a-zA-Z]/.test(textLines[0]);
            const isSecondLineChinese = /[\u4e00-\u9fa5]/.test(textLines[1]);

            if (isFirstLineNonChinese && isSecondLineChinese) {
              text = textLines[0];
              translation = textLines[1];
            } else {
              // 如果不是明确的双语格式，则所有行都视为文本
              text = textLines.join(" ");
            }
          } else if (textLines.length === 1) {
            text = textLines[0];
          }

          return {
            id,
            start,
            end,
            text,
            translation: translation || undefined,
            timestamp: timestamp || undefined,
          };
        })
        .filter((s): s is Subtitle => s !== null)
        .sort((a, b) => a.start - b.start);
    } catch (error) {
      console.error("解析字幕错误:", error);
      return [];
    }
  };

  // 将SRT时间格式转换为秒
  const timeToSeconds = (timeString: string): number => {
    try {
      // 处理毫秒分隔符 , 或 .
      const normalizedTime = timeString.replace(",", ".");

      const parts = normalizedTime.split(":");
      if (parts.length !== 3) {
        return 0;
      }

      const [hours, minutes, secondsAndMs] = parts;
      let seconds = 0,
        milliseconds = 0;

      if (secondsAndMs.includes(".")) {
        const [secs, ms] = secondsAndMs.split(".");
        seconds = parseInt(secs);
        milliseconds = parseInt(ms) / (ms.length === 3 ? 1000 : 100);
      } else {
        seconds = parseInt(secondsAndMs);
      }

      return (
        parseInt(hours) * 3600 + parseInt(minutes) * 60 + seconds + milliseconds
      );
    } catch (error) {
      console.error("解析时间错误:", timeString, error);
      return 0;
    }
  };

  // 格式化时间为 MM:SS 格式
  const formatTimeMMSS = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // 更新当前字幕
  const updateSubtitle = (currentTime: number) => {
    if (!subtitles.length) return;

    // 查找当前时间对应的字幕
    const subtitle = subtitles.find(
      (sub) => currentTime >= sub.start && currentTime <= sub.end
    );

    if (subtitle && (!currentSubtitle || subtitle.id !== currentSubtitle.id)) {
      setCurrentSubtitle(subtitle);

      // 滚动到当前字幕
      if (subtitleContainerRef.current) {
        const element = document.getElementById(`subtitle-${subtitle.id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    } else if (!subtitle && currentSubtitle) {
      setCurrentSubtitle(null);
    }
  };

  // 点击字幕跳转到对应时间点
  const jumpToSubtitle = (subtitle: Subtitle) => {
    if (playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.currentTime = subtitle.start;
      playerRef.current.audio.current.play();
    }
  };

  // 处理时间更新
  const handleListen = () => {
    if (playerRef.current && playerRef.current.audio.current) {
      const currentTime = playerRef.current.audio.current.currentTime;
      setCurrentTime(currentTime);
      updateSubtitle(currentTime);
    }
  };

  // 播放速度变化
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.playbackRate = rate;
    }
  };

  if (!mounted) {
    return (
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 text-center">
          <p className="text-gray-500">加载播放器中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-none bg-white border border-gray-200 rounded-lg overflow-hidden max-w-[400px]">
      <AudioPlayer
        ref={playerRef}
        src={audioUrl}
        className="rounded-lg overflow-hidden shadow-none custom-audio-player"
        style={{
          boxShadow: "none",
          background: "none",
        }}
        autoPlay={true}
        autoPlayAfterSrcChange={true}
        progressJumpStep={5}
        showSkipControls={false}
        showJumpControls={false}
        listenInterval={100}
        onListen={handleListen}
        customIcons={{
          play: <PlayCircleIcon className="w-10 h-10 text-gray-500" />,
          pause: <PauseCircleIcon className="w-10 h-10 text-gray-500" />,
          loop: (
            <ArrowPathRoundedSquareIcon className="w-6 h-6 text-gray-400" />
          ),
          loopOff: (
            <ArrowPathRoundedSquareIcon className="w-6 h-6 text-gray-400 opacity-50" />
          ),
          volume: <SpeakerWaveIcon className="w-6 h-6 text-gray-400" />,
          volumeMute: <SpeakerXMarkIcon className="w-6 h-6 text-gray-400" />,
        }}
      />

      {/* 播放速度选择和字幕按钮 */}
      <div className="flex flex-col gap-2 p-1 w-full">
        {/* 顶部控制栏 */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
            className={`flex items-center justify-center px-4 py-1.5 rounded-full transition-colors duration-200 ${isSpeedMenuOpen
                ? "bg-red-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
          >
            {playbackRate}x
            <ChevronUpIcon
              className={`w-4 h-4 ml-1 transition-transform duration-200 ${isSpeedMenuOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {subtitleUrl && (
            <div
              onClick={() => setIsSubtitleOpen(!isSubtitleOpen)}
              className={`inline-flex items-center gap-2 text-sm px-4 py-1.5 rounded-full transition-colors duration-200 cursor-pointer ${isSubtitleOpen
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              <span>精听</span>
              <ChevronUpIcon
                className={`w-4 h-4 transition-transform duration-200 ${isSubtitleOpen ? "rotate-180" : ""
                  }`}
              />
            </div>
          )}
        </div>

        {/* 速度选择按钮组 */}
        {isSpeedMenuOpen && (
          <div className="flex flex-wrap gap-2 px-1">
            {[0.2, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2.0].map((rate) => (
              <button
                key={rate}
                onClick={() => handleSpeedChange(rate)}
                className={`px-3 py-1.5 rounded-full text-sm ${playbackRate === rate
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        )}

        {/* 字幕显示区域 */}
        {subtitleUrl && (
          <Disclosure open={isSubtitleOpen} onOpenChange={setIsSubtitleOpen}>
            <DisclosureContent>
              <div
                ref={subtitleContainerRef}
                className="max-h-[400px] overflow-y-auto px-2 py-2"
              >
                {error ? (
                  <p className="text-red-500 text-sm p-4 text-center">{error}</p>
                ) : subtitles.length === 0 ? (
                  <p className="text-gray-400 p-4 text-center">加载字幕中...</p>
                ) : (
                  <div className="space-y-3">
                    {subtitles.map((subtitle) => (
                      <div
                        key={subtitle.id}
                        id={`subtitle-${subtitle.id}`}
                        className={`py-3 px-3 rounded-lg transition-colors duration-200 cursor-pointer hover:bg-gray-50 ${currentTime >= subtitle.start &&
                            currentTime <= subtitle.end
                            ? "bg-orange-50"
                            : ""
                          }`}
                        onClick={() => jumpToSubtitle(subtitle)}
                      >
                        <div className="text-gray-400 text-xs mb-1.5">
                          {subtitle.timestamp}
                        </div>
                        <div
                          className={`text-[15px] leading-relaxed ${currentTime >= subtitle.start &&
                              currentTime <= subtitle.end
                              ? "text-orange-600 font-medium"
                              : "text-gray-700"
                            }`}
                        >
                          {subtitle.text}
                        </div>
                        {subtitle.translation && (
                          <div
                            className={`text-[14px] mt-1.5 leading-relaxed ${currentTime >= subtitle.start &&
                                currentTime <= subtitle.end
                                ? "text-orange-500"
                                : "text-gray-500"
                              }`}
                          >
                            {subtitle.translation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DisclosureContent>
          </Disclosure>
        )}
      </div>
    </div>
  );
}
