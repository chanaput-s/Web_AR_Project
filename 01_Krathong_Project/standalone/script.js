/**
 * Loy Krathong AR Mystery Storybook
 * Tap the 3D krathong to reveal each chapter of the story.
 */

const STORY_CHAPTERS = [
  {
    chapter: "Chapter I — The Floating Light",
    speaker: "A whisper from the river…",
    text:
      "On the night of the full moon, a lone krathong drifted back against the current — as if the water itself refused to let a wish go. Its candle still burns. Someone's hope never reached Phra Mae Khongkha.",
  },
  {
    chapter: "Chapter II — The Goddess Speaks",
    speaker: "Phra Mae Khongkha",
    text:
      "“Child of the riverbank, I am Phra Mae Khongkha. A wish was written on banana leaf and placed inside this krathong — but the name was washed away. Look closely: three lotus petals point toward the old spirit house by the canal.”",
  },
  {
    chapter: "Chapter III — The Lost Wish",
    speaker: "The wish, restored",
    text:
      "“May my grandmother's hands stay steady enough to weave one more krathong, and may our family gather by the water again.” The river glows. Phra Mae Khongkha smiles: “Some wishes return so they can be set free a second time — this time, by you.”",
  },
];

const ASSET_ROOT = "./assets";

const introScreen = document.getElementById("intro-screen");
const arScreen = document.getElementById("ar-screen");
const startButton = document.getElementById("start-ar");
const closeButton = document.getElementById("close-ar");
const trackingPill = document.getElementById("tracking-pill");
const trackingLabel = document.getElementById("tracking-label");
const arHelp = document.getElementById("ar-help");

const storyOverlay = document.getElementById("story-overlay");
const storyChapter = document.getElementById("story-chapter");
const storyProgress = document.getElementById("story-progress");
const storySpeaker = document.getElementById("story-speaker");
const storyText = document.getElementById("story-text");
const storyNextButton = document.getElementById("story-next");
const storyCloseButton = document.getElementById("story-close");

let currentChapter = 0;
let markerVisible = false;
let krathongReady = false;

function showIntro() {
  introScreen.classList.remove("hidden");
  arScreen.classList.add("hidden");
  hideStoryOverlay();
}

function showAr() {
  introScreen.classList.add("hidden");
  arScreen.classList.remove("hidden");
  resetStory();
}

function resetStory() {
  currentChapter = 0;
  hideStoryOverlay();
}

function hideStoryOverlay() {
  storyOverlay.classList.add("hidden");
}

function renderStoryChapter(index) {
  const chapter = STORY_CHAPTERS[index];
  if (!chapter) return;

  storyChapter.textContent = chapter.chapter;
  storyProgress.textContent = `${index + 1} / ${STORY_CHAPTERS.length}`;
  storySpeaker.textContent = chapter.speaker;
  storyText.textContent = chapter.text;

  const isFinal = index === STORY_CHAPTERS.length - 1;
  storyNextButton.textContent = isFinal ? "Make your wish" : "Continue";
  storyNextButton.classList.toggle("hidden", false);

  storyOverlay.classList.remove("hidden");
}

function revealNextChapter() {
  if (currentChapter >= STORY_CHAPTERS.length) return;
  renderStoryChapter(currentChapter);
  currentChapter += 1;
}

function onKrathongTapped(event) {
  event.stopPropagation();

  if (!markerVisible) return;

  if (currentChapter < STORY_CHAPTERS.length) {
    revealNextChapter();
    return;
  }

  renderStoryChapter(STORY_CHAPTERS.length - 1);
}

function setMarkerFound(found) {
  markerVisible = found;
  trackingPill.classList.toggle("is-found", found);
  trackingLabel.textContent = found ? "Marker found" : "Looking for marker";
  arHelp.classList.toggle("is-hidden", found);
}

function bindSceneEvents() {
  const marker = document.getElementById("krathong-marker");
  const krathong = document.getElementById("krathong-model");

  marker.addEventListener("markerFound", () => setMarkerFound(true));
  marker.addEventListener("markerLost", () => setMarkerFound(false));

  krathong.addEventListener("model-loaded", () => {
    krathongReady = true;
  });

  krathong.addEventListener("click", onKrathongTapped);
}

startButton.addEventListener("click", showAr);
closeButton.addEventListener("click", showIntro);

storyNextButton.addEventListener("click", () => {
  if (currentChapter >= STORY_CHAPTERS.length) {
    hideStoryOverlay();
    return;
  }
  hideStoryOverlay();
});

storyCloseButton.addEventListener("click", hideStoryOverlay);

document.addEventListener("DOMContentLoaded", () => {
  bindSceneEvents();
});
