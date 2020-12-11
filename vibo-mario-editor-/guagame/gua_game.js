//瓜
class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        //events
        var self = this
        window.addEventListener('keydown', event => {
            self.keydowns[event.key] = 'down'
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = 'up'
        })
        this.init()
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        // log('drawImage', img.texture, img.x, img.y)
        this.context.drawImage(img.texture, img.x, img.y)
    }
    // update
    update() {
        this.scene.update()
    }
    //drawImage
    draw() {
        this.scene.draw()
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
      // log(window.fps)
      //events
      var g = this
      var actions = Object.keys(g.actions)
      for (var i = 0; i < actions.length; i++) {
           var key = actions[i]
           var status = g.keydowns[key]
           if(status == 'down') {
            //如果按键被按下,调用注册的action
                g.actions[key]('down')
            } else if (status == 'up') {
                g.actions[key]('up')
                //删除掉这个key的状态
                g.keydowns[key] = null
           }
       }
       //update
      g.update()
      //clear
      g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
      //draw
      g.draw()
      setTimeout(function(){
         g.runloop()
      }, 1000/window.fps)
    }
    textureByName(name) {
        var g = this
        // log('image by name', g.images)
        var img = g.images[name]
        return img
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        //开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(scene) {
        this.runCallback(this)
    }
    init() {
        var g = this
        var loads = []
        //预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
             let name = names[i]
             var path = g.images[name]
             let img = new Image()
             img.src = path
             img.onload = function() {
                  //存入个.images中
                  g.images[name] = img
                  //所有图片载入成功之后,调用run
                  loads.push(1)
                  // log('tupian')
                  if (loads.length === names.length) {
                     // log('tupian')
                      g.__start()
                  }
             }
        }
    }
}
