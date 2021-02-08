
function main() {
  var CVD; //return of Canvas2DDisplay
  const video = document.getElementById('JVideo');

  let n = 0;
  let raster = 10;

  JEEFACEFILTERAPI.init({
    canvasId: 'JVideo',
    NNCpath: '../dist/', //root of NNC.json file
    callbackReady: function(errCode, spec) {
      if (errCode) {
        console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
        return;
      }

      console.log('INFO : JEEFACEFILTERAPI IS READY');
      CVD = JEEFACEFILTERAPI.Canvas2DDisplay(spec);
      CVD.ctx.strokeStyle = 'yellow';
      console.log(CVD);
    }, //end callbackReady()

    //called at each render iteration (drawing loop)

    callbackTrack: function(detectState) {
      if (detectState.detected > 0.6) {
        //draw a border around the face

        let faceCoo = CVD.getCoordinates(detectState);
        CVD.ctx.drawImage(video, 0, 0, video.width, video.height);
        let pixel = CVD.ctx.getImageData(faceCoo.x, faceCoo.y, faceCoo.w, faceCoo.h);
        CVD.ctx.clearRect(0, 0, CVD.canvas.width, CVD.canvas.height);

        let roundW = Math.ceil(faceCoo.w);
        let roundH = Math.ceil(faceCoo.h);

        let pixelW = Math.ceil(roundW / raster);





        for (var i = 0; i < raster; i++) {
          for (var j = 0; j < raster; j++) {
            let r = pixel["data"][n];
            let g = pixel["data"][n + 1];
            let b = pixel["data"][n + 2];
            console.log(pixel);

            CVD.ctx.fillStyle = "rgb("+r+", "+g+", "+b+")";
            let x = faceCoo.x + (pixelW * i);
            let y = faceCoo.y + (pixelW * j);


            CVD.ctx.fillRect(x, y, pixelW, pixelW);

            n = n + (pixelW * 4);


          }
          n = (n + pixelW * roundW*4) - roundW * 4;

        }


        CVD.update_canvasTexture();



      }

      CVD.draw();
    }   //end callbackTrack()

  }); //end JEEFACEFILTERAPI.init call
}
//end main()
