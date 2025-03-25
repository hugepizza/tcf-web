"use client";

import { useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

// Custom CSS to override the default styles
import "./audio-player-styles.css";

interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayerMinimum({ audioUrl }: AudioPlayerProps) {
  const playerRef = useRef<any>(null);

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
      />
    </div>
  );
}
