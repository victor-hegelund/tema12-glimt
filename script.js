/* ---------------------------------- */
// KODE: https://codepen.io/shshaw/pen/9e810322d70c306de2d18237d0cb2d78
/* ---------------------------------- */

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0,
    },
    {
      currentTime: video.duration || 1,
    }
  );
});

/* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);

/* ---------------------------------- */

let videos = document.querySelectorAll(".video-square");

videos.forEach((video) =>
  ScrollTrigger.create({
    trigger: video,
    start: "top bottom",
    end: "bottom top",
    onEnter: () => video.play(),
  })
);

let videoAppelsin = document.querySelector(".video-square-appelsin");
let videoBGAppelsin = document.querySelector(".video-bg-appelsin");
videoAppelsin.addEventListener("ended", bgAppelsin);

let videoBear = document.querySelector(".video-square-bear");
let videoBGBear = document.querySelector(".video-bg-bear");
videoBear.addEventListener("ended", bgBear);

let videoLime = document.querySelector(".video-square-lime");
let videoBGLime = document.querySelector(".video-bg-lime");
videoBear.addEventListener("ended", bgLime);

function bgAppelsin() {
  console.log("Appelsin");
  videoAppelsin.classList.add("fade-out");
  videoBGAppelsin.classList.add("video-bg-appelsi");
}

function bgBear() {
  console.log("Bær");
  videoBear.classList.add("fade-out");
  videoBGBear.classList.add("video-bg-baer");
}

function bgLime() {
  console.log("Lime");
  videoLime.classList.add("fade-out");
  videoBGLime.classList.add("video-bg-baer");
}
