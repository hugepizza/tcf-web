"use client";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayerWrapper({ audioUrl }: AudioPlayerProps) {
  return (
    <AudioPlayer
      src={audioUrl}
      style={{ borderRadius: "10px", overflow: "hidden" }}
      autoPlay={true}
      autoPlayAfterSrcChange={true}
      progressJumpStep={5}
    />
  );
}
