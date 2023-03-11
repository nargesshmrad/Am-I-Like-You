//SET IMAGE
let state = 0;

// Classifier Variable
let classifierImage;
let classifierSound;

// Models URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/_24A3wse9/";

let soundModelURL = "https://teachablemachine.withgoogle.com/models/CLmc_piD2/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "big brother activated";
let labelSound = "listening";

let rabbitImg;
let bearImg;
let oceanImg;

function preload() {
  rabbitImg = loadImage("./assets/dog.jpg");
  bearImg = loadImage("./assets/moon.jpg");
  oceanImg = loadImage("./assets/ocean.jpg");

  //Image
  classifierImage = ml5.imageClassifier(imageModelURL + "model.json");

  //Sound
  classifierSound = ml5.soundClassifier(soundModelURL + "model.json");
}

function setup() {
  //background
  createCanvas(window.innerWidth, window.innerHeight);

  // Create the camera
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
  classifierSound.classify(gotAudioResult);
}

function draw() {
  background(0);
  // Draw the video
  //position of video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height / 2);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(labelSound, width / 2, height / 2);

  //STATEMACHINE

  if (state === 0) {
    // show the intro ---> clap
    image(rabbitImg, 0, 300, 300, 300);
    if (labelSound === "clap") {
      state = 1;
    }
  }

  if (state === 1) {
    //LION intro ---> delay
    image(bearImg, 0, 300, 300, 300);
    setTimeout(() => {
      state = 2;
    }, 5000);
  }

  if (state === 2) {
    // LION --> delay
    image(oceanImg, 0, 300, 300, 300);
    if (label === "yellow") {
      state = 0;
    }
  }
} //DRAW END

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifierImage.classify(flippedVideo, gotImageResult);
}

// When we get a result
function gotImageResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}

// When we get a result
function gotAudioResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  console.log(labelSound);

  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  const { confidence } = results[0];
  if (confidence > 0.75) {
    labelSound = results[0].label;
    console.log(labelSound);
  }
}
