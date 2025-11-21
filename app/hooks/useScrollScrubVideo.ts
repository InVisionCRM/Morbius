import { useEffect, useRef, useState } from "react";
import { clamp } from "../utils/math";

type Options = {
  fadeStart?: number;
  fadeRange?: number;
  revealStart?: number;
  revealRange?: number;
};

export function useScrollScrubVideo({
  fadeStart = 0.8,
  fadeRange = 0.2,
  revealStart = 0.92,
  revealRange = 0.08,
}: Options = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const desiredTimeRef = useRef(0);
  const pendingSeekRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }

      setProgress(clamp(-rect.top / totalScrollable));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 8;
      setVideoDuration(duration);
      video.pause();
      video.currentTime = 0;
      desiredTimeRef.current = 0;
    };

    const handleCanPlayThrough = () => {
      setVideoReady(true);
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    if (video.readyState >= 3) {
      handleCanPlayThrough();
    } else {
      video.addEventListener("canplaythrough", handleCanPlayThrough);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, []);

  useEffect(() => {
    if (!videoReady || !videoDuration) return;

    desiredTimeRef.current = progress * videoDuration;

    if (pendingSeekRef.current === null) {
      pendingSeekRef.current = requestAnimationFrame(() => {
        pendingSeekRef.current = null;
        const video = videoRef.current;
        if (!video) return;
        const targetTime = desiredTimeRef.current;
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime;
        }
      });
    }
  }, [progress, videoDuration, videoReady]);

  useEffect(() => {
    return () => {
      if (pendingSeekRef.current !== null) {
        cancelAnimationFrame(pendingSeekRef.current);
        pendingSeekRef.current = null;
      }
    };
  }, []);

  const fadeToBlack = clamp((progress - fadeStart) / fadeRange);
  const textReveal = clamp((progress - revealStart) / revealRange);

  return {
    sectionRef,
    videoRef,
    progress,
    fadeToBlack,
    textReveal,
    videoDuration,
    videoReady,
  };
}
