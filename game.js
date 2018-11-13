var game;
const bg_color = '#3b5998';
const text_color = '#fff981'; 

var GameInitialize = function() {    
game = new Phaser.Game(576, 288, Phaser.CANVAS);
    game.state.add("PlayGame", playGame, false);
    game.state.add("SlashScreen", slashScreen, true);
    game.state.add("GameOver", gameOver, false);
}