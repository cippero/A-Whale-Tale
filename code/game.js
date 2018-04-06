const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 1000 },
                debug: false
            }
        },
        parent: "phaser",
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };
let player;
let platforms;
let cursors;
let score = 0;
let scoreText;

let game = new Phaser.Game(config);


function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", 
        "assets/dude.png",
        { frameWidth: 32, frameHeight: 48 }
    );
}


function create() {
    this.add.image(400, 300, 'sky');
    
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms); //can add callback funtion to trigger an event that happens when these objects collide

    stars = this.physics.add.group({    //creates a star plus 11 repetitions, placing them in Y=0 and steps of 70px on X, starting at X=12
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); //sets a different bounce value for each star
    });

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);

    function collectStar (player, star) { //whenever player overlaps with a star hide that star and increment score
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {            //if no stars remaining
            stars.children.iterate(function (child){    //iterate through the stars and re-enable them all, resetting their Y position
                child.enableBody(true, child.x, 0, true, true);
            });
            let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400); 
            //assigns x value in right half of screen if player is in left half, otherwise in left half
            let bomb = bombs.create(x, 16, "bomb");
            //creates bomb in determined x value and Y=16
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20); //randomizes velocity
            bomb.allowGravity = false;
        }
    }

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    function hitBomb (player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("turn");
        gameOver = true;
    }

}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
        player.setVelocityX(-260);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(260);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-600);
    }
}