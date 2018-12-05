var playGame = function(){}
var LoadingText;
var gameOptions = {
    playerSpeed: 130,
    obfuscation: 1,
    playerJumpSpeed: {
        x: 30,
        y: -100
    },
    tileSize: 32,
    changeDirectionRange: 32,
    playerGravity: 400,
}
var time=0;
var score = 0;
var globalStage;
var cocomboText;
playGame.prototype = {
    preload: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.load.image("block", "game-alex-img/block.png");
        game.load.spritesheet('leha','game-alex-img/sprite.png',96,96)
	    game.load.image("bg","game-alex-img/BG1.png");
	    game.load.image("bg1","game-alex-img/BG.png");
        game.load.image("CERESIT","game-alex-img/CERESIT.png");
        game.load.image("TEX","game-alex-img/TEX.png");
        game.load.image("FUGEN","game-alex-img/FUGEN.png");
        game.load.image("triangle",'game-alex-img/triangle.png');
    },
    destroyAll: function() {
        this.stage.visible = false;
        this.stage0.visible = false;
        this.scoreText.visible = false;
        this.moneyText.visible = false;
        this.timeText.visible = false;
        this.t.visible = false;
    },
    create: function(){
        this.sps = [];
        this.money = 7000;
        this.currentTime = 0;
        this.stage0 = game.add.group(); // BG 
        this.stage = game.add.group(); // Леха и объекты 
        globalStage = this.stage;
	
	   this.bg = this.stage0.create(0,0,"bg");
	   this.bg1 = this.stage0.create(288,0,"bg1");

        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.leha = this.stage.create(150,150,'leha');
        this.leha.indexOnLayer = 10;
        this.leha.anchor.set(0.5);
        this.leha.animations.add('right', [ 1, 2, 3], 5, true);
        this.leha.animations.add('left',[ 4, 5, 6 ],true);
        this.leha.animations.add('non', [ 0 ], 20, true);
        this.leha.animations.play('non',5,true);
        game.physics.enable(this.leha,Phaser.Physics.ARCADE);
	   this.leha.body.setSize(75,20,12,75);//ВАЖНО
        this.leha.body.gravity.y = gameOptions.playerGravity;
        //this.leha.body.collideWorldBounds = true;
        this.leha.body.bounce.setTo(0.1, 0.2);
        this.leha.body.collideWorldBounds = true;

        game.time.events.loop(Phaser.Timer.SECOND, this.tick,this);
        game.time.events.loop(Phaser.Timer.SECOND, this.my_timer,this);
        
        this.ground = game.add.sprite(0,288,'block');
        game.physics.enable(this.ground,Phaser.Physics.ARCADE);
        this.ground.body.setSize(600,3,0,0); 
        this.ground.body.immovable = true;
        //ground.body.immovable = true; 

        this.cocomboSystemCreate();
    },
    cocomboSystemCreate: function() {
        this.createUIText();
        this.cocombo = [];
        this.cocombo[0] = 0;
        this.cocombo[1] = 4;

        this.cocombo_text = [];
        this.cocombo_text = ['',
            'не плохо',
            'хорошо',
            'молодец!',
            'отлично!',
            'великолепно!',
            'да кто ты такой?',
            'ты читер?!',
            'божественно!',
            'нет слов!',
            'заканчивай игру!',
            'це фантастично!',
            'вот это да',
            'Жи есть!',
            'не возможно',
            'упрямый!',
            'это нечто!',
            'могуществен!',
            'Ты знаешь создателя?',
            'Курва!',
            'божественно!',
            'нет слов!',
            'не возможно',
            'упрямый!',
            'это нечто!',
            'могуществен!',
            'теку',
            'пщщщщщщ',
            'осталось 2 комбо','ещё 1','Это финал!'//30
        ];
        this.cocombo_max = 0;
    },
    tick: function() {
        game.camera.shake(0.005, 500);
        this.currentTime ++;
        score = this.currentTime;
        this.timeText.setText('время игры : '+ this.currentTime);
    },
    my_timer: function() {
        time++;
        if(time == 2) {
            time = 0;
            var sp;
            var i = game.rnd.integerInRange(1, 3);

            var coff = 120 + this.cocombo_max*30;
            var x_min = game.world.centerX - coff;
            var x_max = game.world.centerX + coff;
            x_min = x_min<30 ? 30 : x_min;
            x_max = x_max> 550 ? 550 : x_max;
            var xRandom = game.rnd.integerInRange(x_min, x_max);


            var y_min = -130 + this.cocombo_max * 4;
            var y_max = -600 + this.cocombo_max * 13.5;
            var yRandom = game.rnd.integerInRange(-130,-650);
            if(i == 1) {
                sp = this.stage.create(xRandom, yRandom, "TEX");
            } else if(i == 2) {
                sp = this.stage.create(xRandom, yRandom, "CERESIT");
            } else {
                sp = this.stage.create(xRandom, yRandom, "FUGEN");
            }
            game.physics.enable(sp,Phaser.Physics.ARCADE);
            sp.anchor.set(0.5);
            sp.indexOnLayer = 1;
            sp.body.gravity.y = game.rnd.integerInRange(200, 550);
            //sp.body.collideWorldBounds = true;
            sp.body.setSize(25,25,34,71);
            sp.anchor.y = 1;
            //console.info(sp.body.y);
            this.sps.push(sp);
            this.stage.sort('indexOnLayer',Phaser.Group.SORT_ASCENDING);

            var triangleSprite = game.add.sprite(xRandom,45,"triangle");
            triangleSprite.anchor.set(0.5);
            var d = 500 /90 * yRandom;
            if(d<0) { d *=-1; }
            game.add.tween(triangleSprite).to({ y: 15 }, d, Phaser.Easing.Bounce.Out, true);
            var tw1 = game.add.tween(triangleSprite).to({ alpha: 0 }, d, Phaser.Easing.Linear.None, true);
            tw1.onComplete.add(function() {
                triangleSprite.destroy(true);
            });

            
        }
        
    },
    moveLeha: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || 
             game.input.activePointer.isDown && game.input.x>game.world.centerX) {
            this.leha.body.velocity.x = gameOptions.playerSpeed*gameOptions.obfuscation;
    }
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || 
             game.input.activePointer.isDown && game.input.x<game.world.centerX) {
            this.leha.body.velocity.x = (-gameOptions.playerSpeed)*gameOptions.obfuscation;
    }
    },
    update: function(){
        this.leha.body.velocity.x *=0.98;
	if(this.leha.body.velocity.x<5 && this.leha.body.velocity.x>-5 ) {
		//console.info(this.leha.body.velocity.x);
		this.leha.animations.play('non');
         this.leha.body.setSize(75,20,12,75);//ВАЖНО
	}
	if(this.leha.body.velocity.x>5) {
		this.leha.animations.play('right',5,true);
         this.leha.body.setSize(70,20,25,75);//ВАЖНО
	} else if(this.leha.body.velocity.x<-5) {
        this.leha.animations.play('left',5,true);
         this.leha.body.setSize(75,20,2,75);//ВАЖНО
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

        if(this.money<=0) {
            //this.destroyAll();
            game.state.start('GameOver', true, false);
        }

    },
    collisionHandler : function(obj,sprite) {
        this.score++;
        //console.info("collide");
        sprite.destroy(true);
        this.scoreText.setText('спасено : '+ this.score);
        this.cocombo[0] +=1;
        this.cocomboUpdate();
        createTextAndTween("x"+this.cocombo[0],
            sprite.x,
            sprite.y-10,
            sprite.x,
            sprite.y-35,
            15,700,'#FF0000', function() {}).angle = 35;
    },
    collisionHandlerGround : function(obj1,sprite) {
        this.money -=250;
        this.cocombo[0] = 0;
        this.moneyText.setText("зарплата : "+ this.money);
        this.t = createText('-250р',150,30,10,'#FF0000');
        sprite.body.destroy(true);

        game.add.tween(this.t).to( { y: 60 }, 1000, Phaser.Easing.Bounce.Out, true);
        var scTween = game.add.tween(sprite.scale).to ( { x : 1.5, y : 0.5 }, 100,Phaser.Easing.Bounce.Out,true );
        scTween.onComplete.add(function() {
            createParticles(sprite.x,sprite.y,10,globalStage);
            sprite.destroy(true);
        });
        var tw = game.add.tween(this.t).to({
        alpha: 0
    }, 1000, Phaser.Easing.Linear.None, true);
        tw.onComplete.add(function() {
        this.t.destroy(true);
}, this);
        
    },
	render: function() {
		//this.debug();
	},
    debug: function() {
        //game.debug.bodyInfo(this.leha, 32, 32);
        game.debug.body(this.leha);
        //game.debug.body(this.ground);
        for(var i = 0; i< this.sps.length; i++) {
            game.debug.body(this.sps[i])
       }
    },
    createUIText: function() {
        this.score = 0;
        this.scoreText = game.add.text(game.world.width/2,35,
            'спасено : '+ this.score,
        {
            font: '12px "Press Start 2P"',
            fill: text_color,
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        this.scoreText.anchor.x=0.5;
        this.scoreText.anchor.y=0.5;
        this.moneyText = game.add.text(5,20,
            'зарплата : '+ this.money,
        {
            font: '12px "Press Start 2P"',
            fill: text_color,
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        this.moneyText.anchor.x=0;
        this.moneyText.anchor.y=0.5;
        this.timeText = game.add.text(game.world.width/2,20,
            'время игры : '+ this.currentTime,
        {
            font: '12px "Press Start 2P"',
            fill: text_color,
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });
        this.timeText.anchor.setTo(0.5);

        cocomboText = game.add.text(game.world.width-5,20,
                    'премия : 0',
                {
                    font: '12px "Press Start 2P"',
                    fill: text_color,
                    stroke: '#000000',
                    strokeThickness: 3,
                    align: 'center'
                });
        
        cocomboText.anchor.x = 1;
        cocomboText.anchor.y = 0.5;
    },
    cocomboUpdate: function() {
        if((this.cocombo[0] % this.cocombo[1]) == 0 ) {
            var result = (this.cocombo[0] / this.cocombo[1])
            if(this.cocombo_max<result) {
                this.cocombo_max = result;
                gameOptions.playerSpeed +=25;
                var text_premiya = createTextAndTween('+'+100+'р.',
                game.world.width-50,25,
                game.world.width-50,5,
                12,
                1000,'#08dd08',function() {
                    cocomboText.setText('премия : '+result*100+'р.')
                });
            }

            var idx = result < 30 ? result : 29;
            var txt = createText(this.cocombo_text[idx],
                game.world.width / 2,
                288 / 2,
                25,'#FF0000');
            txt.anchor.setTo(0.5);
            txt.angle = rnd(0,1) == 1 ?  35 : -35;
            txt.scale.setTo(2);
            game.add.tween(txt).to( { angle : 360+txt.angle }, 400, Phaser.Easing.Bounce.Out, true);
            game.add.tween(txt.scale).to({ x:1, y:1 },400,Phaser.Easing.Bounce.Out, true);
            game.add.tween(txt).to({
        alpha: 0
    }, 1300, Phaser.Easing.Linear.None, true).onComplete.add(function() {
        txt.destroy(true);
        }, this);
        }
    }

}
var text;
function rnd(min,max) {
    return  game.rnd.integerInRange(min, max);
}
function createText(text,x,y,size,color) {
    return game.add.text(x,y,
            text,
        {
            font: size+'px "Press Start 2P"',
            fill: color,
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        });

}
function createTextAndTween(text,from_x,from_y,to_x,to_y,size,time,color,onComplete1) {
    var txt = createText(text,from_x,from_y,size,color);
    game.add.tween(txt).to( { y: to_y }, time, Phaser.Easing.Bounce.Out, true);
    var tw = game.add.tween(txt).to({ alpha: 0 },
            time, Phaser.Easing.Linear.None, true);
    tw.onComplete.add(function() {
        onComplete1();
        txt.destroy(true);
    }, this);
    return txt;
}
var particles = [];
function createParticles(x,y,count,stage) {
    for (var i = 0; i<count ; i++) {
        var xVel = rnd(-11,11) / 10;
        var yVel = rnd(2,1);
        var particleSpeed = 50;
        var scaleParticle = rnd(1,3) / 10;

        var particle = stage.create(x, y, "block");
        particle.anchor.setTo(0.5);
        particle.scale.setTo(scaleParticle);
        game.physics.enable(particle,Phaser.Physics.ARCADE);
        particle.body.gravity.y = 400;
        particle.body.velocity.x = xVel*particleSpeed;
        particle.body.velocity.y = yVel*-particleSpeed*2;
        particle.life = rnd(200,500);
        particles.push(particle);
    }
}
function updateParticles() {
    for (var i = 0; i<particles.length-1 ; i++) {
        particles[i].life -=1;
        if(particles[i].life<=0) {
            particles[i].destroy(true);
        }
    }
}