let enemy;
let enemies;
const enemySpeed = 50;
const enemyDetectionDistance = 150;
const bombDetectionDistance = 250;
let bomb;
let bombs;
let bombsMax = 5;
let bombsInPlay = 0;

function enemyMove() {
	enemies.children.forEach(function (val) {

		if (Math.abs(val.position.x - player.position.x) < enemyDetectionDistance && Math.abs(val.position.y - player.position.y) < enemyDetectionDistance) {
			if (bombsInPlay < bombsMax){
				createBomb(val);
				bombsInPlay += 1;
			}
			if (val.position.x < player.position.x) {
				val.body.velocity.x = -enemySpeed;
				val.animations.play("blinkingRight", 3, true);
			} else {
				val.body.velocity.x = enemySpeed;
				val.animations.play("blinkingLeft", 3, true);
			}
			if (val.position.y < player.position.y) {
				val.body.velocity.y = -enemySpeed;
			} else {
				val.body.velocity.y = enemySpeed;
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

function bombMove() {
	bombs.children.forEach(function (val) {
		console.log("proximity");
		if (Math.abs(val.position.x - player.position.x) < bombDetectionDistance && Math.abs(val.position.y - player.position.y) < bombDetectionDistance) {
			
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
        enemy.body.bounce.y = .7 + Math.random() * 0.2;
        enemy.animations.add('blinkingLeft', [0,7,1,6,2,5,3,4], 10, true);
        enemy.animations.add('blinkingRight', [12,14,11,8,10,9,13,15], 10, true);
        enemy.body.collideWorldBounds = true;
        enemy.body.velocity.x = game.rnd.integerInRange(-enemySpeed, enemySpeed);
    }
}

function createBomb(enemy) {
        let bomb = bombs.create(enemy.position.x, enemy.position.y, 'bomb');
        bomb.body.bounce.set(.7 + Math.random() * 0.5);
        bomb.body.collideWorldBounds = true;
        bomb.body.velocity.x = game.rnd.integerInRange(-enemySpeed*2, enemySpeed*2);
        bomb.body.velocity.y = game.rnd.integerInRange(-enemySpeed*2, enemySpeed*2);
}

function enemyCollision(player, enemy) {
    enemy.kill();
    createStars(Math.round(Math.random()*3), enemy.position.x, enemy.position.y);
}

function bombCollision(player, bomb) {
    bomb.kill();
    health -= 10;
    healthText.text = "health: " + health;
}