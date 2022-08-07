import Player from "@vimeo/player";
const throttle = require("lodash.throttle");
const iframe = document.querySelector("iframe");
const player = new Player(iframe);

const currentTime = localStorage.getItem("videoplayer-current-time");

if (currentTime) {
  player.setCurrentTime(currentTime);
}
player.on("timeupdate", throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(
    "videoplayer-current-time",
    JSON.stringify(data.seconds)
  );
}
