var Paddle = function(game) {
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 15,
    // }
    o.x = 100
    o.y = 250
    o.speed = 15

    var paddle = o
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(paddle.x - paddle.speed)
        // log('paddle', paddle.x - paddle.speed, speed)
    }
    o.moveRight = function() {
        o.move(paddle.x + paddle.speed)
    }
    o.moveUp = function() {
       this.y -= this.speed
    }
    o.moveDown = function() {
       this.y += this.speed
    }
    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    o.collide = function(ball) {
        // if (ball.y + ball.image.height > o.y) {
        //     if (ball.x > o.x && ball.x < o.image.width + o.x) {
        //         log('xiangzuang')
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        if (aInb(a.x , b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)){
            if (aInb(a.y , b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    return o
}
