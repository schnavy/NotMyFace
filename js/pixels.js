class PixelFace{

  constructor(num) {
    this.rectWidth = detection[num]["box"]["width"];
    this.pixelPosX = detection[num]["box"]["topLeft"]["x"];
    this.pixelPosY = detection[num]["box"]["topLeft"]["y"] - rectWidth / 3;
    this.rectHeight = detection[num]["box"]["height"];


    this.roundWidth = int(this.rectWidth / raster) * raster;
    this.pixelWidth = int(this.roundWidth / raster);
    this.pixel = ctx.getImageData(this.pixelPosX, this.pixelPosY, this.roundWidth, this.roundWidth * 1.5);
    this.row = this.roundWidth * 4;

  }
  show(){
    for (j = 0; j < raster * 1.4; j++) {
      let randomValue2 = round(random(80));

      for (i = 0; i < raster; i++) {

        let randomValue = round(random(500));

        let r = pixel["data"][n];
        let g = pixel["data"][n + 1];
        let b = pixel["data"][n + 2];


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

  }

}
