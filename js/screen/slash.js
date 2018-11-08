var slashScreen = function() {}
slashScreen.prototype = {
    preload: function(){ },
    create: function() {
        this.tt = 20;
        game.stage.backgroundColor = '#FFFFFF';
        LoadingText = game.add.text(game.world.width/2,game.world.height/2,
            'LEXA I ZEMLETRESU4KA!\nИДЕТ ЗЕМЛЯТРЕСЕНИЕ!\nИ ТОЛЬКО ЛЁХА МОЖЕТ СПАСТИ\nЛИДЕР ОТ РАЗОРЕНИЯ, ПОЙМАВ\nВСЕ ПАДАЮЩИЕ СМЕСИ И КРАСКИ\nза каждую разбитую, его штрафуют\nна 250р :D',
        {
            font: '16px "Press Start 2P"',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        LoadingText.anchor.setTo(0.5,0.5);

        var tween = game.add.tween(LoadingText).to({
        alpha: 0
    }, this.tt*1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function() {
        game.state.start('PlayGame', false, false);
}, this);

    this.timerT = game.add.text(game.world.width/2,game.world.height-50,
            'ДО НАЧАЛА : '+ this.tt,
        {
            font: '12px "Press Start 2P"',
            fill: '#F04E28',
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
            game.add.tween(this.timerT).to({
        alpha: 0
    }, 500, Phaser.Easing.Linear.None, true);
        }
        this.timerT.setText('ДО НАЧАЛА : '+ this.tt);
     },
update : function() {}

}