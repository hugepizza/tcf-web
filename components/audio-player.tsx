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

// Custom CSS to override the default styles
import "./audio-player-styles.css";

interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayerWrapper({ audioUrl }: AudioPlayerProps) {
  const playerRef = useRef<any>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  // 当播放速度状态或音频源变化时更新实际的播放速度
  useEffect(() => {
    if (playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.playbackRate = playbackRate;
    }
  }, [playbackRate, audioUrl]);

  // 播放速度变化
  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (playerRef.current && playerRef.current.audio.current) {
      playerRef.current.audio.current.playbackRate = rate;
    }
  };

  return (
    <div className="shadow-none bg-white border border-gray-200 rounded-lg overflow-hidden">
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

      <div className="flex justify-center p-1">
        <Tabs
          value={playbackRate.toString()}
          onValueChange={(value) => handleSpeedChange(parseFloat(value))}
          defaultValue="1"
          className="rounded-none"
        >
          <TabsList>
            {[0.2, 0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
              <TabsTrigger
                key={rate}
                value={rate.toString()}
                className="min-w-[50px]"
              >
                {rate}x
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
