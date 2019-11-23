const video = document.getElementById('video');
//console.log(faceapi.nets)
Promise.all([
  // faceapi.nets.ageGenderNet.loadFromUri('/models'),
  faceapi.nets.tinyFaceDetector.loadFromUri('/models')
  // faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  // faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia({
      video: {}
    },
    stream => video.srcObject = stream,
    err => console.error(err)
  )

}



video.addEventListener('play', function() {
  const canvas = faceapi.createCanvasFromMedia(video)
  // canvas erstellen (passiert schon bei p5)
  // document.body.append(canvas)
  // const displaySize = {
  //   width: video.width,
  //   height: video.height
  // }
  // faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    let detection = await faceapi.detectAllFaces(video,
      new faceapi.TinyFaceDetectorOptions())
    // .withFaceLandmarks().withFaceExpressions()

    // let resizedDetections = faceapi.resizeResults(detection, displaySize)
    // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)


    // p5 setuo nur für tinyFaceDetector
    let rectWidth = [];
    let pixelPosX = [];
    let pixelPosY = [];

    let n = 0;
    let raster = 10;
    let mode = 1;

    function setup() {

      noStroke();
      createCanvas(video.width, video.height);


for (var f = 0; f < detection.length; f++) {

      rectWidth.push(detection[f]["box"]["width"]);
      pixelPosX.push(detection[f]["box"]["topLeft"]["x"]);
      pixelPosY.push(detection[f]["box"]["topLeft"]["y"] - rectWidth / 3);


// let pixelPosX = mouseX;
      // let pixelPosY = mouseY;
      // let rectHeight = detection["0"]["box"]["height"];
      console.log(rectWidth.length);
      let roundWidth = [];
      let pixelWidth = [];

      roundWidth[f] = int(rectWidth[f] / raster) * raster;
      pixelWidth[f] = int(roundWidth[f] / raster);
      let row = roundWidth[f] * 4;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, video.width, video.height);
      var pixel = ctx.getImageData(pixelPosX[f], pixelPosY[f], roundWidth[f], roundWidth[f] * 1.5);

      //MODE 1
      if (mouseX >= 20 && mouseX <= width - 20 && mouseY >= 20 && mouseY <= height - 20) {
        background(230, 0, 0);
        textSize(200);
        fill(255);
        text('NOT', 0, 155);
        text('IN MY', 75, 310);
        text('FACE', 0, 465);
      }




      if (mode === 1) {
        for (j = 0; j < raster * 1.4; j++) {
          let randomValue2 = round(random(80));

          for (i = 0; i < raster; i++) {

            let randomValue = round(random(500));

            let r = pixel["data"][n];
            let g = pixel["data"][n + 1];
            let b = pixel["data"][n + 2];

            // if (randomValue === 1 || randomValue2 == 1) {
            //   r = 255;
            //   g = 0;
            //   b = random(100);
            // }
            if (randomValue === 1 || randomValue2 == 1) {
              r = random(255);
              g = random(255);
              b = random(255);
            }

            let x = pixelPosX[f] + (pixelWidth[f] * i);
            let y = pixelPosY[f] + (pixelWidth[f] * j);

            fill(r, g, b);
            stroke(r, g, b);
            rect(x, y, pixelWidth[f], pixelWidth[f]);

            n = n + (pixelWidth[f] * 4);
          }
          n = (n + pixelWidth[f] * row) - roundWidth[f] * 4;

        }

        //MODE 2

      } else if (mode === 2) {

        for (j = 0; j < rectWidth * 1.4; j++) {
          for (i = 0; i < rectWidth; i++) {


            let r = pixel["data"][n];
            let g = pixel["data"][n + 1];
            let b = pixel["data"][n + 2];


            let x = pixelPosX[f] + (pixelWidth * i);
            let y = pixelPosY[f] + (pixelWidth * j);

            fill(r, g, b);
            stroke(r, g, b);


            n = n+4;
          }

        }

      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);


    }
    }
    setup()



  }, 100)

})

function draw() {}
