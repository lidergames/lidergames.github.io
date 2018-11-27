var slashScreen = function() {}
var textArray = ["БРАВЫЙ ГРУЗЧИК ЛЁХА",
        "идёт землятресение!",
        "только бравый грузчик Лёха",
        "может спасти Компанию от убытков",
        "поймав падающие краски и смеси.",
        "за каждую разбитую, его штрафуют",
        "на 250р :D"];
var button;
var actionOnClick = function() {
        console.info("click");
    var tw = game.add.tween(button).to({
        alpha: 0
        }, 500, Phaser.Easing.Linear.None, true);
            tw.onComplete.add(function() {
                game.state.start('PlayGame', true, true);
            });
}
slashScreen.prototype = {
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.spritesheet('button','/games/game_alex/img/button.png',96,24);
     },

    create: function() {
        this.textLogo = [];
        
        this.tt = 10;
        this.idx = 0;
        game.stage.backgroundColor = bg_color;

        this.timerT = game.add.text(game.world.width/2,game.world.height-50,
            'ДО НАЧАЛА : '+ this.tt,
        {
            font: '12px "Press Start 2P"',
            fill: text_color,
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        this.timerT.anchor.setTo(0.5);
        game.time.events.loop(Phaser.Timer.SECOND, this.tick,this);
    
     },	
     
     tick: function() {
        this.tt--;
        if(this.tt<=0) {
            var tw = game.add.tween(this.timerT).to({
        alpha: 0
        }, 500, Phaser.Easing.Linear.None, true);
            tw.onComplete.add(function() {
                button = game.add.button(game.world.centerX , game.world.height - 50 - 12, 'button', actionOnClick, this, 2, 1, 0);
                button.anchor.setTo(0.5);
                button.scale.setTo(1.5);
            });
        }

        this.timerT.setText('ДО НАЧАЛА : '+ this.tt);

        if(this.idx<textArray.length) {
            var line = game.add.text(game.world.width/2, 64 + this.idx * 22, textArray[this.idx],  {
            font: '18px "Press Start 2P"',
            fill: text_color,
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
            line.anchor.setTo(0.5);
            line.alpha = 0.1;
            this.textLogo.push(line);
            game.add.tween(line).to({
        alpha: 1
        }, 1500, Phaser.Easing.Linear.None, true);
        }
        this.idx++;
     },
update : function() {}
}