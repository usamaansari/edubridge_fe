"use client";

import { useRef, useState } from "react";
import { PlayCircle } from "lucide-react";

type VideoPlayerProps = {
  title: string;
  src?: string;
  poster?: string;
  durationMin?: number;
  onComplete?: () => void;
};

const speeds = [0.75, 1, 1.25, 1.5, 2];

export function VideoPlayer({ title, src, poster, durationMin, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [speed, setSpeed] = useState(1);

  if (!src) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,#1e3a8a_0%,#0f172a_70%)] text-white">
        <PlayCircle className="size-14 opacity-90" strokeWidth={1.25} />
        <div className="text-center">
          <p className="font-heading text-lg font-semibold">{title}</p>
          {durationMin ? (
            <p className="mt-1 text-sm text-white/60">{durationMin} min lecture</p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-black">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        className="aspect-video w-full"
        onEnded={onComplete}
      >
        <track kind="captions" />
      </video>
      <div className="flex items-center justify-end gap-1 bg-neutral-950 px-3 py-2">
        {speeds.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setSpeed(s);
              if (videoRef.current) videoRef.current.playbackRate = s;
            }}
            className={
              s === speed
                ? "rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-black"
                : "rounded-md px-2 py-0.5 text-xs text-white/70 hover:text-white"
            }
          >
            {s}×
          </button>
        ))}
      </div>
    </div>
  );
}
