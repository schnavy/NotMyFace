const video = document.getElementById('video');
console.log(faceapi.nets)
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

    let n = 0;
    let raster = 10;

    function setup() {

      noStroke();
      createCanvas(video.width, video.height);

      if (mouseX >= 20 && mouseX <= width - 20 && mouseY >= 20 && mouseY <= height - 20) {
        background(230,0,0);
        textSize(200);
        text('NOT', 0, 155);
        text('IN MY', 75, 310);
        text('FACE', 0, 465);

      }

      let rectWidth = detection["0"]["box"]["width"];
      let pixelPosX = detection["0"]["box"]["topLeft"]["x"];
      let pixelPosY = detection["0"]["box"]["topLeft"]["y"] - rectWidth/3;
      // let pixelPosX = mouseX;
      // let pixelPosY = mouseY;
      // let rectHeight = detection["0"]["box"]["height"];
      console.log(detection);

      let roundWidth = int(rectWidth / raster) * raster;
      let pixelWidth = int(roundWidth / raster);
      let row = roundWidth * 4;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, video.width, video.height);
      var pixel = ctx.getImageData(pixelPosX, pixelPosY, roundWidth, roundWidth * 1.5);

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

          let x = pixelPosX + (pixelWidth * i);
          let y = pixelPosY + (pixelWidth * j);

          fill(r, g, b);
          stroke(r, g, b);
          rect(x, y, pixelWidth, pixelWidth);

          n = n + (pixelWidth * 4);
        }
        n = (n + pixelWidth * row) - roundWidth * 4;

      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);


    }
    setup()



  }, 100)

})

function draw() {}
