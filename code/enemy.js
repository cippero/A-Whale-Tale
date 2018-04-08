let enemy;
let enemies;
const enemySpeed = 50;
const enemyDetectionDistance = 100;

function enemyMove() {
	enemies.children.forEach(function (val) {

		if (Math.abs(val.position.x - player.position.x) < enemyDetectionDistance && Math.abs(val.position.y - player.position.y) < enemyDetectionDistance) {
			if (val.position.x < player.position.x) {
				val.body.velocity.x = enemySpeed;
			} else {
				val.body.velocity.x = -enemySpeed;
			}
			if (val.position.y < player.position.y) {
				val.body.velocity.y = enemySpeed;
			} else {
				val.body.velocity.y = -enemySpeed;
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

function createEnemies(num) {
    for (let i = 0; i < num; i++) {
        let enemy = enemies.create(game.world.width*Math.random(), 0, 'evilSub');
        enemy.body.gravity.y = 20;
        enemy.body.bounce.y = 0.7 + Math.random() * 0.2;
        enemy.animations.add('blinking');
        enemy.animations.play("blinking", 3, true);
        enemy.body.collideWorldBounds = true;
        enemy.body.velocity.x = game.rnd.integerInRange(-enemySpeed, enemySpeed);
    }
}

function enemyCollision(player, enemy) {
    console.log(enemy, "enemy collision");
    enemy.kill();
    health -= 10;
    healthText.text = "health: " + health;
}