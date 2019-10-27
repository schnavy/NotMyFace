const video = document.getElementById('video');

Promise.all([
  faceapi.nets.ageGenderNet.loadFromUri('/models'),
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)



function startVideo() {
  navigator.getUserMedia({
      video: {}
    },
    stream => video.srcObject = stream,
    err => console.error(err)
  )

}
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = {
    width: video.width,
    height: video.height
  }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    let detection = await faceapi.detectAllFaces(video,
      new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

    let resizedDetections = faceapi.resizeResults(detection, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    console.log(detection);
    console.log(detection[0]["detection"]["_box"]);

    function setup() {
      let x = detection[0]["detection"]["_box"]["topLeft"]["x"];
      let y = detection[0]["detection"]["_box"]["topLeft"]["y"];
      let width = detection[0]["detection"]["_box"]["width"];
      let height = detection[0]["detection"]["_box"]["height"];
      createCanvas(800, 600)
      fill(0,0,0)
      noStroke()
      rect(x, y, width*1.5, height*1.5)
    }
    setup()


  }, 100)

})
