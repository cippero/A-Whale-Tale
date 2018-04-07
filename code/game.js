let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('ground', 'assets/platform.png');
    // game.load.image('star', 'assets/star.png');
    // game.load.image("bomb", "assets/bomb.png");
        // game.load.tilemap("map", "assets/tiles.json", null, Phaser.Tilemap.TILED_JSON);
        // game.load.image("level", "assets/tiles.png")
}

let player;
let cursors;
let score = 0;
let platforms;
let stars;
let scoreText;
let skyBackground;
    // let map;
    // let layer;

function create() { 

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#787878';

        // map = game.add.tilemap("map");
        // map.addTilesetImage("level");
        // map.setCollisionBetween(1,9);
        // layer = map.createLayer("Tile Layer 1");
        // layer.resizeWorld();

    skyBackground = game.add.tileSprite(0, 0, 800, 600, 'sky');

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

    game.camera.follow(player);

    // stars = game.add.group();
    // stars.enableBody = true;
    //createStars(12);
    
    // scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    cursors = game.input.keyboard.createCursorKeys();
}


function update() {

    skyBackground.tilePosition.y += 2;
    let hitPlatform = game.physics.arcade.collide(player, platforms);
    // game.physics.arcade.collide(stars, platforms);
    // game.physics.arcade.collide(player, layer);

    // game.physics.arcade.overlap(player, stars, collectStar, null, this);

    playerControls();
}


// function collectStar (player, star) {
//     star.kill();
//     score += 10;
//     scoreText.text = 'Score: ' + score;
//     // if (stars.total === 6){
//     //     let x = (player.x < 400) ? game.rnd.integerInRange(400, 800) : game.rnd.integerInRange(0, 400); 
//     //     //assigns x value in right half of screen if player is in left half, otherwise in left half

// }


// function createStars(num) {
//     for (let i = 0; i < num; i++) {
//         let star = stars.create(i * game.world.width/num+3.5*i, 0, 'star');
//         star.body.gravity.y = 300;
//         star.body.bounce.y = 0.7 + Math.random() * 0.2;
//     }
// }

