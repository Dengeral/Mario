class GuaNesSprite {
    constructor(game) {
        this.game = game
        this.tileOffset = 32784
        this.data = window.bytes.slice(this.tileOffset)
        //为了省事,在这里hard code 一套动画
        this.animations= {
            bird: [],
        }

        // this.animationName = 'bird'
        // this.texture = this.frames()[0]
        this.pixelWidth = 2
        this.rowsOfSprite = 4
        this.cloumnsOfSprite = 2
        this.w = this.pixelWidth * this.cloumnsOfSprite * 8
        this.h = this.pixelWidth * this.rowsOfSprite * 8
        this.frameIndex = 0
        this.frameCount = 4
        //
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        //重力和加速度
        this.gy = 10
        this.vy = 0
        //加速和摩擦
        this.vx = 0
        this.mx = 0

    }
    static new(game) {
        return new this(game)
    }

    drawBlock(context, data, x, y, pixelWidth) {
        const colors = [
            'white',
            '#FE1000',
            '#FFB010',
            '#AA3030',
        ]
        let w = pixelWidth
        let h = pixelWidth
        for (let i = 0; i < 8; i++) {
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
                // j里面是一条线 8 bites per line
                // 在j循环里面,每次画一个像素点
                //78 69
                //0100 1110  0100 0101
                let c1 = (p1 >> (7 - j)) & 0b00000001
                let c2 = (p2 >> (7 - j)) & 0b00000001

                let pixel = (c2 << 1) + c1
                if (pixel == 0) {
                    continue
                }
                // log(pixel,'pixel')

                // log(pixel, 'pixel')
                let color = colors[pixel]
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)
            }
        }
    }

    drawSprite() {
        let bytesPerBlock = 16

        let dataOffset = this.frameIndex * bytesPerBlock * 8
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        let pixelsPerBlock = 8
        let pixelWidth = this.pixelWidth
        let blockSize = pixelsPerBlock * pixelWidth
        let offset = 0
        for (var i = 0; i < this.rowsOfSprite; i++) {
            for (var j = 0; j < this.cloumnsOfSprite; j++) {
              let x = j * blockSize
              let y = i * blockSize
              let pixels = data.slice(offset)
              this.drawBlock(context, pixels, x, y, this.pixelWidth)
              offset += 16
            }
        }
    }

    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        // this.rotation = -45
    }
    update() {
        // 更新x加速和摩擦
        this.vx += this.mx
        //说明摩擦力已经把速度降至 0 以下, 停止摩擦
        if (this.vx * this.mx > 0) {
             this.vx = 0
             this.mx = 0
        } else {
             this.x += this.vx
        }
        //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 100
        if (this.y > h) {
            this.y = h
        }
        //
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 4
            this.frameIndex++
            this.frameIndex %= 3
            // this.frameIndex = (this.frameIndex + 1) % this.frames().length
            // this.texture = this.frames()[this.frameIndex]
            // this.texture = this.frames[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2 , this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        // var alpha = context.globalAlpha
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2 , -h2)

        //draw mario
        this.drawSprite()

        context.restore()
        }
    move(x, keyStatus) {
        this.flipX = (x < 0)
        // this.x += x
        let s = 0.5 * x
        if (keyStatus == 'down') {
            this.vx += s
            this.mx = -s/2
        } else {

        }
        // log('event', keyStatus)
        // var animationNames = {
        //     down: 'bird',
        //     up: 'bird',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
        // if (keyStatus == 'down') {
        //     this.changeAnimation('death')
        // } else if (keyStatus == 'up') {
        //     this.changeAnimation('flying')
        // }
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
