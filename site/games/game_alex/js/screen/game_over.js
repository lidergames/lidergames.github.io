gameOver = function() { };
gameOver.prototype = {
	preload: function() {
		game.load.spritesheet('button','img/button.png',96,24);
	},
	create: function() {
		game.stage.backgroundColor = bg_color;
		this.game_over_text = this.text('Лёха остался без ЗП.\nИ теперь ему грустно.',
			game.world.width/2,
			30,
			18);
		this.game_over_text.anchor.setTo(0.5);
		this.score_text = this.text('Под вашим контролем, Лёха\nпродержался : '+ score +" мин.",
			game.world.width/2,
			game.world.height/2,
			20);
		this.score_text.anchor.setTo(0.5);

		this.repeat_text = this.text('попробовать снова?',
			game.world.width/2,
			game.world.height/2+56,
			22);
		this.repeat_text.anchor.setTo(0.5);

		this.repeat_button = game.add.button(game.world.centerX, game.world.height - 25, 'button', actionOnClick, this, 2, 1, 0);
        this.repeat_button.anchor.setTo(0.5);
        this.repeat_button.scale.setTo(2);
	},
	update: function() {},
	text: function(text,x,y,size) {
    	return game.add.text(x,y,
            text,
        {
            font: size+'px "Press Start 2P"',
            fill: text_color,
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });

	}
}
function actionOnClick() {
	game.state.start('PlayGame', false, false);
}
