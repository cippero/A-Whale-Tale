let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser'), main = function () {};

main.prototype = {
	preload: function () {
    	game.load.script('playGame', 'code/game.js');
    	game.load.script('player', 'code/player.js');
    	game.load.script('enemy', 'code/enemy.js');
    	game.load.script('winGame', 'code/winGame.js');
    	game.load.script('lose', 'code/lose.js');
    	let whaleButton = game.load.spritesheet('button', 'assets/whaleSheet.png', 100, 72);
	},
	create: function () {


		game.stage.backgroundColor = '#123456';

		game.add.text(game.world.centerX - 225, 50, "A Whale's Tale", { fontSize: '62px', fill: '#fff' });

		game.add.text(game.world.centerX - 140, 170, "Instructions:", { fontSize: '42px', fill: '#fff' });

		game.add.text(game.world.centerX - 370, 250, "On their journey to visit Wales, Wally has been seperated from his pod!", { font: 'bold 22px Arial', fill: '#fff' });
		game.add.text(game.world.centerX - 310, 285, "Use the arrow keys to swim around while avoiding the evil", { font: 'bold 22px Arial', fill: '#fff' }); 
		game.add.text(game.world.centerX - 300, 320, "robot submarines' bombs and looking for Wally's family", { font: 'bold 22px Arial', fill: '#fff' });

		button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 1, 0);

		function actionOnClick () {
		    game.state.start('playGame');
		}
		
		game.state.add('playGame', playGame);
		game.state.add('winGame', winGame);
		game.state.add('lose', lose);
		
	}
};

game.state.add('main', main);
game.state.start('main');