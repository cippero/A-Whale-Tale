let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser'), main = function () {};

main.prototype = {
	preload: function () {
    	game.load.script('playGame', 'code/game.js');
    	game.load.script('player', 'code/player.js');
    	game.load.script('enemy', 'code/enemy.js');
    	
	},
	create: function () {
		game.stage.backgroundColor = '#123456';
		game.time.events.add(Phaser.Timer.SECOND * 4, this.startGame, this);
		game.state.add('playGame', playGame);
		//setInterval(function(){
	     	//game.state.start('playGame');
		//}, 5000);
	},
	startGame: function() {
		game.state.start('playGame');
	}
};

game.state.add('main', main);
game.state.start('main');