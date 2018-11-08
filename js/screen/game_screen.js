var playGame = function(){}
var LoadingText;
playGame.prototype = {
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image("rock", "rock.png");
        game.load.image("block", "block.png");
        game.load.image("player", "ball.png");
        game.load.spritesheet('leha','img/sprite.png',96,96)
	game.load.image("bg","img/BG.png");
    game.load.image("CERESIT","img/CERESIT.png");
    game.load.image("TEX","img/TEX.png");
    game.load.image("FUGEN","img/FUGEN.png");
    },
    create: function(){
        this.sps = [];
        this.money = 16000;
        this.currentTime = 0;

	
	   this.bg = game.add.sprite(0,0,"bg");
	   this.bg1 = game.add.sprite(288,0,"bg");

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.leha = game.add.sprite(150,150,'leha');
        this.leha.anchor.set(0.5);
        this.leha.animations.add('right', [ 1, 2, 3], 5, true);
        this.leha.animations.add('left',[ 4, 5, 6 ],true);
        this.leha.animations.add('non', [ 0 ], 20, true);
        this.leha.animations.play('non',5,true);
        game.physics.enable(this.leha,Phaser.Physics.ARCADE);
	   this.leha.body.setSize(75,30,12,65);
        this.leha.body.gravity.y = gameOptions.playerGravity;
        //this.leha.body.collideWorldBounds = true;
        this.leha.body.bounce.setTo(0.2, 0.2);
        this.leha.body.collideWorldBounds = true;

        game.time.events.loop(Phaser.Timer.SECOND, this.tick,this);
        game.time.events.loop(Phaser.Timer.SECOND, this.my_timer,this);
        
        this.ground = game.add.sprite(0,288,'block');
        game.physics.enable(this.ground,Phaser.Physics.ARCADE);
        this.ground.body.setSize(600,3,0,0); 
        this.ground.body.immovable = true;
        //ground.body.immovable = true; 

        this.score = 0;
        this.scoreText = game.add.text(5,5,
            'spaseno : '+ this.score,
        {
            font: '12px "Press Start 2P"',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        this.moneyText = game.add.text(5,30,
            'zarplata : '+ this.money,
        {
            font: '12px "Press Start 2P"',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });

        this.timeText = game.add.text(game.world.width/2,20,
            'Vremy tresu4ki : '+ this.currentTime,
        {
            font: '12px "Press Start 2P"',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        this.timeText.anchor.setTo(0.5);

    },
    tick: function() {
        game.camera.shake(0.005, 500);
        this.currentTime ++;
        this.timeText.setText('Vremy tresu4ki : '+ this.currentTime);
    },
    my_timer: function() {
        time++;
        if(time == 2) {
            time = 0;
            var sp;
            var i = game.rnd.integerInRange(1, 3);
            var xRandom = game.rnd.integerInRange(30, 550);
            var yRandom = game.rnd.integerInRange(-60,-650);
            if(i == 1) {
                sp = game.add.sprite(xRandom, yRandom, "TEX");
            } else if(i == 2) {
                sp = game.add.sprite(xRandom, yRandom, "CERESIT");
            } else {
                sp = game.add.sprite(xRandom, yRandom, "FUGEN");
            }
            game.physics.enable(sp,Phaser.Physics.ARCADE);
            sp.anchor.set(0.5);
            sp.body.gravity.y = game.rnd.integerInRange(200, 550);
            //sp.body.collideWorldBounds = true;
            sp.body.setSize(25,25,34,71);
            //console.info(sp.body.y);
            this.sps.push(sp);

        }
        
    },
    moveLeha: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.leha.body.velocity.x = 100;
    }
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.leha.body.velocity.x = -100;
    }
    },
    update:function(){
        this.leha.body.velocity.x *=0.98;
	if(this.leha.body.velocity.x<5 && this.leha.body.velocity.x>-5 ) {
		//console.info(this.leha.body.velocity.x);
		this.leha.animations.play('non');
	}
	if(this.leha.body.velocity.x>5) {
		this.leha.animations.play('right',5,true);
	} else if(this.leha.body.velocity.x<-5) {
        this.leha.animations.play('left',5,true);
    }

    //Коллизии 
        game.physics.arcade.collide(this.leha, this.ground, null, null, this);
        for(var i = 0; i< this.sps.length; i++) {
            if(this.sps[i].body!=null) {
                if(this.sps[i].body.velocity.y>400) {
                    this.sps[i].body.velocity.y = 400;
                }
            }
            game.physics.arcade.collide(this.ground, this.sps[i], this.collisionHandlerGround, null, this);
            game.physics.arcade.collide(this.leha, this.sps[i], this.collisionHandler, null, this);
        }
        this.moveLeha();



    },
    collisionHandler : function(obj,sprite) {
        this.score++;
        //console.info("collide");
        sprite.destroy(true);
        this.scoreText.setText('spaseno : '+ this.score);
    },
    collisionHandlerGround : function(obj1,sprite) {
        this.money -=250;
        this.moneyText.setText("zarplata : "+ this.money);
        var t = game.add.text(30,30,
            '-250p',
        {
            font: '10px "Press Start 2P"',
            fill: '#FF3333',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        sprite.destroy(true);

        game.add.tween(t).to( { y: 60 }, 1000, Phaser.Easing.Bounce.Out, true);
        var tw = game.add.tween(t).to({
        alpha: 0
    }, 1000, Phaser.Easing.Linear.None, true);
        tw.onComplete.add(function() {
        t.destroy(true);
}, this);
    },
	render: function() {
		//game.debug.bodyInfo(this.leha, 32, 32);
        game.debug.body(this.leha);
		game.debug.body(this.ground);
        for(var i = 0; i< this.sps.length; i++) {
            game.debug.body(this.sps[i])
        }
	}

}
var text;