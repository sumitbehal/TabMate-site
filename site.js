const previewVideo = document.querySelector(".preview-video");

if (previewVideo) {
  const playlist = (previewVideo.dataset.playlist || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  let currentIndex = Math.max(0, playlist.indexOf(previewVideo.getAttribute("src") || ""));

  const applyPlayback = () => {
    previewVideo.playbackRate = 1;
    previewVideo.defaultPlaybackRate = 1;
  };

  applyPlayback();
  previewVideo.loop = playlist.length < 2;
  previewVideo.addEventListener("loadedmetadata", applyPlayback);

  if (playlist.length > 1) {
    previewVideo.addEventListener("ended", () => {
      currentIndex = (currentIndex + 1) % playlist.length;
      previewVideo.src = playlist[currentIndex];
      previewVideo.load();
      previewVideo.play().catch(() => {});
    });
  }
}
