var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
           window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // log(Number(k), k)
            // blocks = loadLevel(game, Number(k))
            // log(blocks)
        }
   })
   //控制速度
   document.querySelector('#id-input-speed').addEventListener('input', function(event){
       var input = event.target
       // log(event, input.value)
       window.fps = Number(input.value)
   })
}
const ajax = request => {
    let r = new XMLHttpRequest()
    r.open('GET', request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}
var __main = function() {

   var images = {
       //背景
       //flappy bird images
       bg: 'bird/bg.png',
       pipe: 'bird/pipe.png',
       ground: 'bird/ground.png',


       b1: 'tiles/block1.png',
       b2: 'tiles/block2.png',
       b3: 'tiles/block3.png',
       b4: 'tiles/block4.png',
   }

   let request = {
       // url: 'mario.nes',
       url: 'Super-Mario-Bros.nes',
       callback(r) {
           window.bytes = new Uint8Array(r)
           log('mario file', window.bytes.length)
           var game = GuaGame.instance(30, images, function(g){
               // var s = Scene.new(g)
               // var s = SceneTitle.new(g)
               var s = SceneEditor.new(g)
               g.runWithScene(s)
           })
           enableDebugMode(game, true)

           // log('bytes', bytes)
           // drawNes(bytes)
           // let step = 0
           // let bytesPerBlock = 16
           // let tilesPerSprite = 8
           // let bytesPerSprite = bytesPerBlock * tilesPerSprite
           // setInterval(function(){
           //   let offset = tileOffset + step * bytesPerSprite
           //   drawSprite(bytes.slice(offset))
           //   if(window.paused) {
           //        // 暂停
           //
           //   } else {
           //       step++
           //       step %= 6
           //   }
           // }, 1000)
       },
   }
   ajax(request)


}

__main()
