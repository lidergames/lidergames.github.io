var game;
var GameInitialize = function() {    
game = new Phaser.Game(576, 288, Phaser.CANVAS);
    game.state.add("PlayGame", playGame, false);
    game.state.add("SlashScreen", slashScreen, true);
}