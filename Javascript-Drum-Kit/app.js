const keys = document.querySelectorAll(".key");
const sounds = document.querySelectorAll("audio[data-key]");

const elementsByKeys = {};

keys.forEach((item) => {
  const currentKey = item.dataset.key;
  elementsByKeys[currentKey] = {};
});

const addItems = (array, keyToSet) => {
  array.forEach((item) => {
    const currentKey = item.dataset.key;
    elementsByKeys[currentKey][keyToSet] = item;
  });
};

addItems(keys, "element");
addItems(sounds, "sound");

const removeTransitionEffect = ({target}) => {
  target.classList.remove("playing");
};

const playSound = ({keyCode}) => {
  const currentItem = elementsByKeys[keyCode];
  if (currentItem) {
    const { element, sound } = currentItem;
    sound.currentTime = 0;
    sound.play();

    element.classList.add("playing");
    element.addEventListener("transitionend", removeTransitionEffect);
  };
};

window.addEventListener("keydown", playSound);