var gameScene = new Phaser.Scene('gameScene',true);

gameScene.preload = function () {
	// body...
}
gameScene.create = function () {
	// body...
	let g = this.add.graphics();
	g.fillStyle(0xff9933, 1);
	g.fillRect(100,200,600,300);

	this.add.text(180,200,'Hello Phaser',{font: '64px Courier', fill: '#000000'});
}