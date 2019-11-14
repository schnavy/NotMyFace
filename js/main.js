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



    function setup() {
      createCanvas(video.width, video.height);
      noStroke()
      let pixelPosX = detection["0"]["box"]["topLeft"]["x"];
      let pixelPosY = detection["0"]["box"]["topLeft"]["y"] - 70;
      // let pixelPosX = mouseX;
      // let pixelPosY = mouseY;
      let rectWidth = detection["0"]["box"]["width"];
      // let rectHeight = detection["0"]["box"]["height"];
      let roundWidth = Math.ceil(rectWidth / 10) * 10;

      let n = 0;
      let yOff = 0;
      let raster = 10;
      let pixelWidth = Math.ceil(roundWidth / raster);
      let row = roundWidth * 4;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, video.width, video.height);
      var pixel = ctx.getImageData(pixelPosX, pixelPosY, roundWidth, roundWidth * 1.5);
      console.log(n);


      for (j = 0; j < raster * 1.5; j++) {

        for (i = 0; i < raster; i++) {

          let r = pixel["data"][n];
          let g = pixel["data"][n + 1];
          let b = pixel["data"][n + 2];

          let x = pixelPosX + (pixelWidth * i);
          let y = pixelPosY + (pixelWidth * j);

          fill(r, g, b);
          rect(x, y, pixelWidth, pixelWidth);

          n = n + (pixelWidth * 4);
        }
        n = (n + (pixelWidth) * row) - roundWidth * 4;

      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    }
    setup()



  }, 100)

})

function draw() {}
