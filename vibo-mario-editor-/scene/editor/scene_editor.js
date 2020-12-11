class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        // var label = GuaLabel.new(game, 'hello from gua')
        // this.addElement(label)

        // bg
        // var bg = GuaImage.new(game, "bg")
        // this.addElement(bg)

        // tile map
        let map = GuaTileMap.new(game)
        this.addElement(map)
        map.x = 30
        map.y = 30

        this.map = map
        //mario
        let mario = GuaNesSprite.new(game, map)
        this.addElement(mario)
        mario.x = 100
        mario.y = 100

        this.mario = mario


        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        // this.skipCount--
        // var offset = -5
        // if (this.skipCount == 0) {
        //     this.skipCount = 4
        //     offset = 15
        // }
        super.update()
        //地面移动
        // for (var i = 0; i < 30; i++) {
        //     var g = this.grounds[i]
        //     g.x += offset
        //
        // }
    }
    setupInputs() {
        // log('move')

        var self = this
        var b = this.mario
        let playerSpeed = 2
        self.game.registerAction('a', function (keyStatus) {
            b.move(-playerSpeed, keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(playerSpeed, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            b.jump()
        })
    }
}
