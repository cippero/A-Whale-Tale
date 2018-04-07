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

    //player.body.velocity.x = 0;
    //game.time.events.add(1000, accelerate, this);
    // let speed = 15;

    // let speedMax = speed*10;
    // let timeDelay = game.time.now;
    // let accelerating = false;


    // if (cursors.left.isDown || cursors.right.isDown){
    //     accelerateX(true);
    //     // accelerating = true;
    // } else if (cursors.left.isUp || cursors.right.isUp) {
    //     accelerateX(false);
    //     // accelerating = false;
    // }
    // if (cursors.up.isDown || cursors.down.isDown){
    //     accelerateY(true);
    // } else if (cursors.up.isUp || cursors.down.isUp) {
    //     accelerateY(false);
    // }
    if (cursors.left.isDown) {      //left = below zero
        if (player.body.velocity.x > 0){
            player.body.acceleration.x -= 10;
            //console.log("greater");
        } else {
            player.body.acceleration.x -= 1;
            //console.log("less");
        }
        player.animations.play("left");
        //moveDirection(-speedAcceleratorX, "x", "left");

    // } else if (cursors.left.isUp) {
    //     if (player.body.velocity.x < 10){
    //         player.body.acceleration.x = 0;
    //         //console.log("greater");
    //     } else {
    //         player.body.acceleration.x -= 10;
    //         //console.log("greater");
    //     } 

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
            player.body.acceleration.x += 10;
            //player.animations.play("left");
        } else if (player.body.velocity.x > -10 && player.body.velocity.x < 0){
            player.body.acceleration.x = 0;
            //player.animations.play("left");
        } else if (player.body.velocity.x > 10){
            player.body.acceleration.x -= 10;
            //player.animations.play("right");
        } else if (player.body.velocity.x < 10 && player.body.velocity.x > 0){
            player.body.acceleration.x = 0;
            //player.animations.play("right");
        }
    }
    // if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
    //console.log(player.body.acceleration.x)
    if (cursors.up.isDown) {
        //moveDirection(-speedAcceleratorY, "y", "left");
    } else if (cursors.down.isDown) {
        //moveDirection(speedAcceleratorY, "y", "right");
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

// function accelerateX(accelerating) {
//     let speedMax = speed*10;
//     let timeDelay = game.time.now;
//     if (accelerating) {
//         if (speedAcceleratorX <= speedMax && timeDelay === game.time.now){
//             console.log(speedAcceleratorX);
//             speedAcceleratorX += 2;
//             timeDelay += 1000;
//         }
//     } 
//     else {
//         if (speedAcceleratorX >= speed && timeDelay === game.time.now){
//             console.log(speedAcceleratorX);
//             speedAcceleratorX -= 1;
//             timeDelay += 1000;
//         }
//     }
// }

// function accelerateY(accelerating) {
//     let speedMax = speed*10;
//     //speedAccelerator = speed;
//     let timeDelay = game.time.now;
//     //console.log(timeDelay, game.time.now);
//     if (accelerating) {
//         if (speedAcceleratorY <= speedMax && timeDelay === game.time.now){
//             console.log(speedAcceleratorY);
//             speedAcceleratorY += 2;
//             timeDelay += 1000;
//         }
//     } 
//     else {
//         if (speedAcceleratorY >= speed && timeDelay === game.time.now){
//             console.log(speedAcceleratorY);
//             speedAcceleratorY -= 1;
//             timeDelay += 1000;
//         }
//     }
// }

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

