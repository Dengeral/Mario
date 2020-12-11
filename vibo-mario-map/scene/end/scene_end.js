class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function(){
            var start = SceneTitle.new(game)
            game.replaceScene(start)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('游戏结束,按 r 返回标题页面', 100, 200)
    }
}
