var game;
var GameInitialize = function() {    
var gameOptions = {
    playerSpeed: 120,
    playerJumpSpeed: {
        x: 30,
        y: -100
    },
    tileSize: 32,
    changeDirectionRange: 32,
    playerGravity: 400
}
var score = 0;
var time=0;

game = new Phaser.Game(576, 288, Phaser.CANVAS);
    game.state.add("PlayGame", playGame, false);
    game.state.add("SlashScreen", slashScreen, true);
}