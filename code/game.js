// const config = {
//         type: Phaser.AUTO,
//         width: 800,
//         height: 600,
//         physics: {
//             default: "arcade",
//             arcade: {
//                 gravity: { y: 50 },
//                 debug: false
//             }
//         },
//         parent: "phaser",
//         scene: {
//             preload: preload,
//             create: create,
//             update: update
//         }
//     };
// let player;
// let platforms;
// let cursors;
// let score = 0;
// let scoreText;

// let game = new Phaser.Game(config);


// function preload() {
//     this.load.image("sky", "assets/sky.png");
//     this.load.image("ground", "assets/platform.png");
//     this.load.image("star", "assets/star.png");
//     this.load.image("bomb", "assets/bomb.png");
//     this.load.spritesheet("dude", 
//         "assets/dude.png",
//         { frameWidth: 32, frameHeight: 48 }
//     );
// }


// function create() {
//     this.add.image(400, 300, 'sky');
    
//     platforms = this.physics.add.staticGroup();

//     platforms.create(400, 568, 'ground').setScale(2).refreshBody();
//     platforms.create(600, 400, 'ground');
//     platforms.create(50, 250, 'ground');
//     platforms.create(750, 220, 'ground');

//     player = this.physics.add.sprite(100, 450, 'dude');

//     player.setBounce(0.2);
//     player.setCollideWorldBounds(true);

//     this.anims.create({
//         key: 'left',
//         frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
//         frameRate: 10,
//         repeat: -1
//     });

//     this.anims.create({
//         key: 'turn',
//         frames: [ { key: 'dude', frame: 4 } ],
//         frameRate: 20
//     });

//     this.anims.create({
//         key: 'right',
//         frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
//         frameRate: 10,
//         repeat: -1
//     });

//     cursors = this.input.keyboard.createCursorKeys();

//     this.physics.add.collider(player, platforms); //can add callback funtion to trigger an event that happens when these objects collide

//     stars = this.physics.add.group({    //creates a star plus 11 repetitions, placing them in Y=0 and steps of 70px on X, starting at X=12
//         key: 'star',
//         repeat: 11,
//         setXY: { x: 12, y: 0, stepX: 70 }
//     });

//     stars.children.iterate(function (child) {
//         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); //sets a different bounce value for each star
//     });

//     this.physics.add.collider(stars, platforms);

//     this.physics.add.overlap(player, stars, collectStar, null, this);

//     function collectStar (player, star) { //whenever player overlaps with a star hide that star and increment score
//         star.disableBody(true, true);
//         score += 10;
//         scoreText.setText('Score: ' + score);

//         if (stars.countActive(true) === 0) {            //if no stars remaining
//             stars.children.iterate(function (child){    //iterate through the stars and re-enable them all, resetting their Y position
//                 child.enableBody(true, child.x, 0, true, true);
//             });
//             let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400); 
//             //assigns x value in right half of screen if player is in left half, otherwise in left half
//             let bomb = bombs.create(x, 16, "bomb");
//             //creates bomb in determined x value and Y=16
//             bomb.setBounce(1);
//             bomb.setCollideWorldBounds(true);
//             bomb.setVelocity(Phaser.Math.Between(-200, 200), 20); //randomizes velocity
//             bomb.allowGravity = false;
//         }
//     }

//     scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

//     bombs = this.physics.add.group();

//     this.physics.add.collider(bombs, platforms);
//     this.physics.add.collider(player, bombs, hitBomb, null, this);

//     function hitBomb (player, bomb) {
//         this.physics.pause();
//         player.setTint(0xff0000);
//         player.anims.play("turn");
//         gameOver = true;
//     }

// }

// function update() {
//     let cursors = this.input.keyboard.createCursorKeys();
//     if (cursors.left.isDown) {
//         player.setVelocityX(-260);
//         player.anims.play('left', true);
//     } else if (cursors.right.isDown) {
//         player.setVelocityX(260);
//         player.anims.play('right', true);
//     } else {
//         player.setVelocityX(0);
//         player.anims.play('turn');
//     }
//     // if (cursors.up.isDown && player.body.touching.down)
//     if (cursors.up.isDown){
//         let velocityExponential = -25;
//         // while (velocityExponential > -100) {
//         //     velocityExponential -= 5;
//             player.setVelocityY(velocityExponential);
//         // }
//     } else if (cursors.down.isDown){
//         player.setVelocityY(75);
//     }
// }









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
let bomb;

let stars;
let score = 0;
let scoreText;

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
    player.body.gravity.y = 50;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    stars = game.add.group();
    stars.enableBody = true;
    createStars(12);
    

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

    bombs = game.add.group();
    bombs.enableBody = true;

//     this.physics.add.collider(bombs, platforms);
//     this.physics.add.collider(player, bombs, hitBomb, null, this);
    
}

function update() {

    //  Collide the player and the stars with the platforms
    let hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(bombs, platforms);

    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        moveDirection(-150, "x", "left");
    } else if (cursors.right.isDown) {
        moveDirection(150, "x", "right");
    } else {
        player.animations.stop();
        player.frame = 4;
    }
    // if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
    if (cursors.up.isDown) {
        // let speed = -15;
        moveDirection(-150, "y", "left");
    } else if (cursors.down.isDown) {
        moveDirection(150, "y", "right");
    }
}

function moveDirection(amount, axis, animation) {
    if (axis === "x") {
        player.body.velocity.x = amount;
    } else {
        player.body.velocity.y = amount;
    }
    player.animations.play(animation);
}

function collectStar (player, star) {
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
    // if (stars.total === 6){
    //     //createStars(12);
    //     let x = (player.x < 400) ? game.rnd.integerInRange(400, 800) : game.rnd.integerInRange(0, 400); 
    //     //assigns x value in right half of screen if player is in left half, otherwise in left half
    //     let bomb = bombs.create(x, 16, "bomb");
    //     //creates bomb in determined x value and Y=16
    //     bomb.body.bounce.y = 1;
    //     bomb.body.collideWorldBounds = true;
    //     bomb.body.velocity.x = game.rnd.integerInRange(-200, 200);
    //     bomb.body.velocity.y = 100;
    //     bomb.body.gravity.y = 0;
    // }
}

function createStars(num) {
    for (let i = 0; i < num; i++) {
        let star = stars.create(i * game.world.width/num+3.5*i, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
}

