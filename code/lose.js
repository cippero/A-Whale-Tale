let lose = {
	create: function() { 
		game.stage.backgroundColor = '#123456';	
		let text = game.add.text(175, 50, "A Whale's Tale", { fontSize: '62px', fill: '#fff' });
		text.fixedToCamera = true;
		let message1 = "";
		let message2 = "";
		let score = 0;
		if (score === 0) {
			message1 = "You failed to reunite Wally with his pod and you got zero points.";
			message2 = "That's okay, Wally forgives you... or he would, if he was still alive.";
		} else if (score <= 50) {
			message1 = "Thanks to you, Wally will never get to see his pod again. But hey,";
			message2 = "at least you got " + score + " points! Does that make you feel better?";
		} else {
			message1 = "Wow, you got " + score + " points! That's pretty amazing. Too bad Wally";
			message2 = "will never get to use them. Because he's dead. Because of you.";
		}

		text = game.add.text(60, 170, message1, { fontSize: '22px', fill: '#fff' });
		text.fixedToCamera = true;
		text = game.add.text(60, 200, message2, { fontSize: '22px', fill: '#fff' });
		text.fixedToCamera = true;

		button = game.add.button(305, 400, 'button', actionOnClick, this, 1, 0);

		function actionOnClick () {
		    game.state.start('playGame');
		}
	}
};