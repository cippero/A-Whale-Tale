let game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('bubbles', 'assets/bg.png');
    game.load.image('bomb', 'assets/bomb.png');
    // game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('whale', 'assets/whaleSheet.png', 100, 72);
    game.load.spritesheet('evilSub', 'assets/subSheet1.png', 50, 50);
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
        // game.load.tilemap("map", "assets/tiles.json", null, Phaser.Tilemap.TILED_JSON);
        // game.load.image("level", "assets/tiles.png")
}

let score = 0;
let health = 100;
let scoreText;
let healthText;
let cursors;
let platforms;
let skyBackground;
let stars;
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

    skyBackground = game.add.tileSprite(0, 0, 800, 600, 'bubbles');

    platforms = game.add.group();
    platforms.enableBody = true;

    let ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2);
    ground.body.immovable = true;

    let ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 120, 'whale');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 10;
    player.body.collideWorldBounds = true;
    player.body.maxVelocity.x = 100;
    player.body.maxVelocity.y = 100;
    player.animations.add('left', [4, 5, 6, 5], 10, true);
    player.animations.add('right', [3, 2, 1, 2], 10, true);
    player.animations.add('idleLeft', [4, 7], 10, true);
    player.animations.add('idleRight', [3, 0], 10, true);

    enemies = game.add.group();
    enemies.enableBody = true;

    bombs = game.add.group();
    bombs.enableBody = true;

    createEnemies(5);
    bombMove();

    game.camera.follow(player);

    stars = game.add.group();
    stars.enableBody = true;
    
    scoreText = game.add.text(16, 50, 'score: 0', { fontSize: '32px', fill: '#000' });
    healthText = game.add.text(16, 16, 'health: 100', { fontSize: '32px', fill: '#000' });

    cursors = game.input.keyboard.createCursorKeys();
}


function update() {

    skyBackground.tilePosition.y -= 0.2;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(enemies, platforms);
    game.physics.arcade.collide(enemies, enemies);
    game.physics.arcade.collide(bombs, platforms);
    //game.physics.arcade.overlap(enemies, enemies, enemyBoop, null, this);
    game.physics.arcade.overlap(player, enemies, enemyCollision, null, this);
    game.physics.arcade.overlap(player, bombs, bombCollision, null, this);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
        // game.physics.arcade.collide(player, layer);

    playerControls();
    enemyMove();
}






function collectStar (player, star) {
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
//     // if (stars.total === 6){
//     //     let x = (player.x < 400) ? game.rnd.integerInRange(400, 800) : game.rnd.integerInRange(0, 400); 
//     //     //assigns x value in right half of screen if player is in left half, otherwise in left half

}


function createStars(num, x, y) {
    for (let i = 0; i < num; i++) {
        let star = stars.create(game.rnd.integerInRange(x*0.9, x*1.1), game.rnd.integerInRange(y*0.9, y*1.1), 'star');
        star.body.gravity.y = game.rnd.integerInRange(-10, 10);
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        star.body.collideWorldBounds = true;
    }
}



