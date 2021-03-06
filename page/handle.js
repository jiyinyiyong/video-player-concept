// Generated by CoffeeScript 1.4.0
var log, q;

q = function(id) {
  return document.querySelector(id);
};

log = function() {
  return console.log.apply(console, arguments);
};

window.onload = function() {
  var current, length, play, player, stop, timeline, video, volume, width;
  video = q("#video");
  player = q("#player");
  timeline = q("#timeline");
  stop = q("#step");
  volume = q("#volume");
  current = q("#current");
  length = q("#length");
  play = q("#play");
  video.loop = true;
  width = video.clientWidth;
  player.style.width = "" + width + "px";
  video.addEventListener("timeupdate", function(playing) {
    var all, now, percent;
    now = video.currentTime;
    all = video.duration;
    percent = now / all * 100;
    step.style.width = "" + percent + "%";
    current.innerText = video.currentTime.toFixed();
    return length.innerText = video.duration.toFixed();
  });
  timeline.onclick = function(click) {
    var base, before, percent, whole, x;
    x = click.x;
    base = timeline.offsetLeft + timeline.offsetParent.offsetLeft;
    whole = timeline.clientWidth;
    before = x - base;
    percent = before / whole * 100;
    log(x, base, before, whole, percent);
    video.currentTime = video.duration * percent / 100;
    return step.style.width = "" + percent + "%";
  };
  current.onmousewheel = function(scroll) {
    var delta, value;
    delta = scroll.wheelDelta / 60;
    value = (Number(current.innerText)) + delta;
    if (value < 0) {
      value = 0;
    } else if (value > video.duration) {
      value = video.duration;
    }
    return video.currentTime = value;
  };
  volume.onmousewheel = function(scroll) {
    var delta, value;
    delta = scroll.wheelDelta / 120;
    value = (Number(volume.innerText)) + delta;
    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }
    volume.innerText = String(value);
    video.volume = value / 100;
    return localStorage.volume = String(value);
  };
  (function() {
    var value;
    if (localStorage.volume != null) {
      value = Number(localStorage.volume);
      video.volume = value / 100;
      return volume.innerText = String(value);
    }
  })();
  volume.onclick = function(click) {
    if (video.muted) {
      video.muted = false;
      return volume.className = "";
    } else {
      video.muted = true;
      return volume.className = "muted";
    }
  };
  play.onclick = function() {
    if (video.paused) {
      video.play();
      return play.innerText = "Pause";
    } else {
      video.pause();
      return play.innerText = "Play";
    }
  };
  return control.onmousewheel = function(scroll) {
    return scroll.returnValue = false;
  };
};
