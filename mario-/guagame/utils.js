var e = sel => document.querySelector(sel)
// var log = function(s) {
//
//     e('#id-text-log').value += '\n' + s
// }

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

const rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.image.width + o.x) {
            log('xiangzuang')
            return true
          }
    }
    return false
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end-start+1)
    return Math.floor(n + start)
}
//const变量 不可被修改
