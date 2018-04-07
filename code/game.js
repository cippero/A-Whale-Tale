let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image("bomb", "assets/bomb.png");

}

let player;
let platforms;
let cursors;

let stars;
let score = 0;
let scoreText;

// let speed = 15;
// let speedAcceleratorX = speed;
// let speedAcceleratorY = speed;


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;

    let ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2);
    ground.body.immovable = true;

    let ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 120, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 10;
    player.body.collideWorldBounds = true;
    player.body.maxVelocity.x = 100;
    player.body.maxVelocity.y = 100;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    stars = game.add.group();
    stars.enableBody = true;
    //createStars(12);
    

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    
}

function update() {

    //  Collide the player and the stars with the platforms
    let hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    if (cursors.left.isDown) {      //left = below zero
        if (player.body.velocity.x > 0){
            player.body.acceleration.x -= 10;
        } else {
            player.body.acceleration.x -= 1;
        }
        player.animations.play("left");

    } else if (cursors.right.isDown) {      //right = above zero
        if (player.body.velocity.x < 0){
            player.body.acceleration.x += 10;
        } else {
            player.body.acceleration.x += 1;
        }
        player.animations.play("right");
    } else {
        player.animations.stop();
        player.frame = 4;

        if (player.body.velocity.x < -10){
            player.body.acceleration.x += 5;
        } else if (player.body.velocity.x > -10 && player.body.velocity.x < 0){
            player.body.acceleration.x = 0;
        } else if (player.body.velocity.x > 10){
            player.body.acceleration.x -= 5;
        } else if (player.body.velocity.x < 10 && player.body.velocity.x > 0){
            player.body.acceleration.x = 0;
        }
    }


    if (cursors.up.isDown) {      //left = below zero
        if (player.body.velocity.y > 0){
            player.body.acceleration.y -= 10;
        } else {
            player.body.acceleration.y -= 1;
        }
        player.animations.play("left");

    } else if (cursors.down.isDown) {      //right = above zero
        if (player.body.velocity.y < 0){
            player.body.acceleration.y += 10;
        } else {
            player.body.acceleration.y += 1;
        }
        player.animations.play("right");
    } else {
        player.animations.stop();
        player.frame = 4;

        if (player.body.velocity.y < -10){
            player.body.acceleration.y += 5;
        } else if (player.body.velocity.y > -10 && player.body.velocity.y < 0){
            player.body.acceleration.y = 0;
        } else if (player.body.velocity.y > 10){
            player.body.acceleration.y -= 5;
        } else if (player.body.velocity.y < 10 && player.body.velocity.y > 0){
            player.body.acceleration.y = 0;
        }
    }

}

function moveDirection(speed, axis, animation) {
        if (axis === "x") {
            player.body.velocity.x = speed;
        } else {
            player.body.velocity.y = speed;
        }
        player.animations.play(animation);
}

function collectStar (player, star) {
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
    // if (stars.total === 6){
    //     let x = (player.x < 400) ? game.rnd.integerInRange(400, 800) : game.rnd.integerInRange(0, 400); 
    //     //assigns x value in right half of screen if player is in left half, otherwise in left half

}

function createStars(num) {
    for (let i = 0; i < num; i++) {
        let star = stars.create(i * game.world.width/num+3.5*i, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
}

