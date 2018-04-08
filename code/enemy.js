let enemy;
let enemies;
const enemySpeed = 50;
const enemyDetectionDistance = 250;

function enemyMove() {
	enemies.children.forEach(function (val) {

		if (Math.abs(val.position.x - player.position.x) < enemyDetectionDistance && Math.abs(val.position.y - player.position.y) < enemyDetectionDistance) {
			if (val.position.x < player.position.x) {
				val.body.velocity.x = enemySpeed;
				val.animations.play("blinkingRight", 3, true);
			} else {
				val.body.velocity.x = -enemySpeed;
				val.animations.play("blinkingLeft", 3, true);
			}
			if (val.position.y < player.position.y) {
				val.body.velocity.y = enemySpeed;
			} else {
				val.body.velocity.y = -enemySpeed;
			}
		} else {
			if (val.position.x > game.world.width*0.9){
				val.body.velocity.x = -enemySpeed;
				val.animations.play("blinkingLeft", 3, true);
			} else if (val.position.x < game.world.width*0.1) {
				val.body.velocity.x = enemySpeed;
				val.animations.play("blinkingRight", 3, true);
			}
		}
	})
}

function createEnemies(num) {
    for (let i = 0; i < num; i++) {
        let enemy = enemies.create(game.world.width*Math.random(), 0, 'evilSub');
        enemy.body.gravity.y = 20;
        enemy.body.bounce.y = .7 + Math.random() * 0.2;
        enemy.animations.add('blinkingLeft', [0,7,1,6,2,5,3,4], 10, true);
        enemy.animations.add('blinkingRight', [12,14,11,8,10,9,13,15], 10, true);
        enemy.body.collideWorldBounds = true;
        enemy.body.velocity.x = game.rnd.integerInRange(-enemySpeed, enemySpeed);
    }
}

function enemyCollision(player, enemy) {
    enemy.kill();
    health -= 10;
    healthText.text = "health: " + health;
    createStars(Math.round(Math.random()*3), enemy.position.x, enemy.position.y);
}

function enemyBoop(enemy1, enemy2) {
	// enemy1.body.velocity.x = game.rnd.integerInRange(enemySpeed*0.7, enemySpeed*1.3);
	// enemy1.body.velocity.y = game.rnd.integerInRange(enemySpeed*0.7, enemySpeed*1.3);
	// enemy2.body.velocity.x = game.rnd.integerInRange(enemySpeed*0.7, enemySpeed*1.3);
	// enemy2.body.velocity.y = game.rnd.integerInRange(enemySpeed*0.7, enemySpeed*1.3);
}