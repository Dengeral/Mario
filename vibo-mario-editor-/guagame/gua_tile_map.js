class GuaTileMap {
     constructor(game) {
          this.game = game
          this.offsetX = 10
          //8 x 5
          this.tiles = [
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1,
              2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1,
              3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1,
              4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 1,
              4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              //
              4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              //
              4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              //
              4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
          ]
          this.th = 15
          //TODO, tw 应该是一个整数
          this.tw = this.tiles.length / this.th
          this.tileImages = [
              '0',
              GuaImage.new(game, 'b2'),
              GuaImage.new(game, 'b3'),
              GuaImage.new(game, 'b4'),
              GuaImage.new(game, 'b1'),
          ]
          this.tileSize = 32
     }
     static new(...args) {
         return new this(...args)
     }
     onTheGround(i, j) {

         let index = i * this.th + j
         let tile = this.tiles[index]
         // log('index tile', tile, index, i, j)
         return tile != 0
     }
     update() {
         this.offsetX -= 1

     }
     draw() {
         let h = this.th
         let offsetIndex = Math.abs(parseInt(this.offsetX / this.tileSize))
         let numberOfTiles = h * (12 + 1)
         if (offsetIndex + numberOfTiles < this.tiles.length) {
             numberOfTiles = this.tiles.length
         }
         for (var i = offsetIndex; i < numberOfTiles; i++) {
             let index = this.tiles[i]
             if (index != 0) {
                 let x = Math.floor(i / h) * this.tileSize
                 x += this.offsetX
                 let y = (i % h) * this.tileSize
                 let image = this.tileImages[index]
                 this.game.context.drawImage(image.texture, x, y)
             }
         }
     }
}
