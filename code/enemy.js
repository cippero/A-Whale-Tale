let enemy;
let enemies;
const enemySpeed = 75;
const enemyDetectionDistance = 150;
const bombDetectionDistance = 250;
let bomb;
let bombs;
let bombsMax = 10;
let bombsInPlay = 0;
let creatingBombs = true;

function enemyMove() {
	enemies.forEachAlive(function (val) {
		if (Math.abs(val.position.x - player.position.x) < enemyDetectionDistance && Math.abs(val.position.y - player.position.y) < enemyDetectionDistance) {
			if (val.position.x < player.position.x) {
				val.body.velocity.x = -enemySpeed;
			} else {
				val.body.velocity.x = enemySpeed;
			}
			if (val.position.y < player.position.y) {
				val.body.velocity.y = -enemySpeed;
			} else {
				val.body.velocity.y = enemySpeed;
			}

		// } else {
		// 	game.time.events.add(game.rnd.integerInRange(2000, 4000), () => {
		// 		Math.random() > 0.5 ? val.body.velocity.x = enemySpeed : val.body.velocity.x = -enemySpeed;
		// 		Math.random() > 0.5 ? val.body.velocity.y = enemySpeed : val.body.velocity.y = -enemySpeed;
		// 		//val.body.velocity.x = enemySpeed * Math.random();
		// 	}, this);
		}
		if (val.body.velocity.x < 0){
			val.animations.play("blinkingLeft", 3, true);
		} else {
			val.animations.play("blinkingRight", 3, true);
		}

	});

	if (bombsInPlay < bombsMax && creatingBombs && enemies.children.length > 0){
		createBomb(enemies.children[Math.floor(Math.random()*enemies.children.length)]);
		creatingBombs = false;
		game.time.events.add(game.rnd.integerInRange(2000, 4000), () => {
			creatingBombs = true;
		}, this);
	}
}

function bombMove() {
	bombs.children.forEach(function (val) {
		if (Math.abs(val.position.x - player.position.x) < bombDetectionDistance && Math.abs(val.position.y - player.position.y) < bombDetectionDistance) {
			if (val.position.x < player.position.x) {
				if (val.body.velocity.x < enemySpeed){
					val.body.velocity.x += 2;
				}
			} else {
				if (val.body.velocity.x > enemySpeed){
					val.body.velocity.x -= 2;
				}
			}
			if (val.position.y < player.position.y) {
				if (val.body.velocity.y < enemySpeed){
					val.body.velocity.y += 2;
				}
			} else {
				if (val.body.velocity.y > enemySpeed){
					val.body.velocity.y -= 2;
				}
			}
		} else {
			if (val.position.x > game.world.width*0.9){
				val.body.velocity.x = -enemySpeed;
			} else if (val.position.x < game.world.width*0.1) {
				val.body.velocity.x = enemySpeed;
			}
		}
	})
}

function createEnemies(num, x, y) {
    for (let i = 0; i < num; i++) {
        //let enemy = enemies.create(game.world.width*Math.random(), 0, 'evilSub');
        let enemy = enemies.create(x, y, 'evilSub');
        enemy.body.gravity.y = 5;
        enemy.body.bounce.y = 1;
        enemy.animations.add('blinkingLeft', [0,7,1,6,2,5,3,4], 10, true);
        enemy.animations.add('blinkingRight', [12,14,11,8,10,9,13,15], 10, true);
        enemy.body.collideWorldBounds = true;
        enemy.body.velocity.x = game.rnd.integerInRange(-enemySpeed, enemySpeed);
        enemy.body.velocity.y = game.rnd.integerInRange(-enemySpeed, enemySpeed);
        // enemy.body.onCollide.add( () => {
        //     console.log("collision");
        // }, this);
    }
}

function createBomb(enemy) {
	bombsInPlay++;
    let bomb = bombs.create(enemy.position.x, enemy.position.y, 'bomb');
    game.physics.arcade.enable(bomb);
    bomb.body.bounce.set(.5 + Math.random() * 0.5);
    bomb.body.collideWorldBounds = true;
    bomb.body.velocity.x = game.rnd.integerInRange(-enemySpeed*2, enemySpeed*2);
    bomb.body.velocity.y = game.rnd.integerInRange(-enemySpeed*2, enemySpeed*2);
}

function enemyCollision(player, enemy) {
    enemy.destroy();
    createStars(Math.floor(Math.random()*3)+1, enemy.position.x, enemy.position.y);
}

function createStars(num, x, y) {
    for (let i = 0; i < num; i++) {
        let star = stars.create(game.rnd.integerInRange(x-10, x+10), game.rnd.integerInRange(y-10, y+10), 'star');
        star.body.gravity.y = game.rnd.integerInRange(-10, 10);
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        star.body.collideWorldBounds = true;
        star
    }
}

function bombCollision(player, bomb) {
	bomb.destroy();
	if (alive){
		bombsInPlay--;
    	health -= 10;
    	healthText.text = "health: " + health;
	}
}