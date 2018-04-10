let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser'), main = function () {};

main.prototype = {
	preload: function () {
    	game.load.script('playGame', 'code/game.js');
    	game.load.script('player', 'code/player.js');
    	game.load.script('enemy', 'code/enemy.js');
    	game.load.script('winGame', 'code/winGame.js');
    	game.load.script('loseGame', 'code/loseGame.js');
    	let whaleButton = game.load.spritesheet('button', 'assets/whaleSheet.png', 100, 72);
	},
	create: function () {
		game.stage.backgroundColor = '#123456';

		game.add.text(game.world.centerX - 225, 150, "A Whale's Tale", { fontSize: '62px', fill: '#000' });

		button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 0);
		//     button.onInputOver.add(over, this);
		//     button.onInputOut.add(out, this);
		//     button.onInputUp.add(up, this);
		// }
		// function up() {
		//     console.log('button up', arguments);
		// }
		// function over() {
		//     console.log('button over');
		// }
		// function out() {
		//     console.log('button out');
		// }
		function actionOnClick () {
		    this.startGame();
		}

		//game.time.events.add(1000, this.startGame, this);
		game.state.add('playGame', playGame);
		game.state.add('winGame', winGame);
		game.state.add('loseGame', loseGame);
	},
	startGame: function() {
		game.state.start('playGame');
	}
};

game.state.add('main', main);
game.state.start('main');