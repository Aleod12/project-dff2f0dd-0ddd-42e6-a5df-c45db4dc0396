/** Only one video plays on the page: call when a video starts, all others pause. */
export function pauseOtherVideos(current: HTMLVideoElement | null) {
  if (typeof document === "undefined") return;
  document.querySelectorAll("video").forEach((v) => {
    if (v !== current && !v.paused) v.pause();
  });
}
