let playGame = {
    preload: function() {
        game.load.image('bubbles', 'assets/bg.png');
        game.load.image('bomb', 'assets/bomb.png');
        game.load.spritesheet('whale', 'assets/whaleSheet.png', 100, 72);
        game.load.spritesheet('evilSub', 'assets/subSheet1.png', 50, 50);
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.tilemap("map", "assets/firstroom.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("tiles1", "assets/tiles1.png")
        //game.load.audio('main-bgm', 'assets/main.mp3'); 
    },

    create: function() { 

        score = 0;
        scoreText = null;
        healthText = null;
        cursors = null;
        platforms = null;
        bubblesBG = null;
        stars = null;
        statusText = null;
        map = null;
        layer = null;
        pod = null;
        //mainbgm = null;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#787878';
        bubblesBG = game.add.tileSprite(0, 0, 4096, 2048, 'bubbles');
        bubblesBG.fixedToCamera = false;
        
        map = game.add.tilemap("map");
        map.addTilesetImage("tiles1");
        map.setCollisionBetween(1,4, true, "floor");
        map.setCollisionBetween(6,9, true, "floor");
        layer = map.createLayer("floor");
        game.world.setBounds(0,0, 4096, 2048);

        player = game.add.sprite(80, 940, 'whale');
        game.physics.arcade.enable(player);
        game.camera.follow(player);
        player.body.drag.x = 20;
        player.body.drag.y = 20;
        player.body.bounce.y = 0.5;
        player.body.bounce.x = 0.5;
        player.body.gravity.y = 10;
        player.body.collideWorldBounds = true;
        player.body.maxVelocity.x = 100;
        player.body.maxVelocity.y = 100;
        player.animations.add('left', [4, 5, 6, 5], 10, true);
        player.animations.add('right', [3, 2, 1, 2], 10, true);
        player.animations.add('idleLeft', [4, 7], 2, true);
        player.animations.add('idleRight', [3, 0], 2, true);

        pod = game.add.group();
        pod.enableBody = true;
        pod.create(3775, 600, 'whale').scale.setTo(0.7);
        pod.create(3855, 560, 'whale').scale.setTo(0.8);
        pod.create(3735, 540, 'whale');
        pod.children.forEach(fam => {
            fam.animations.add('idleLeft', [4, 7], 2, true);
            fam.play("idleLeft", true);
        })
        
        enemies = game.add.group();
        enemies.enableBody = true;
        

        bombs = game.add.group();
        bombs.enableBody = true;

        this.gameRestart();
    
        stars = game.add.group();
        stars.enableBody = true;
        
        scoreText = game.add.text(16, 50, 'score: ' + score, { fontSize: '32px', fill: '#fff' });
        healthText = game.add.text(16, 16, 'health: ' + health, { fontSize: '32px', fill: '#fff' });
        scoreText.fixedToCamera = true;
        healthText.fixedToCamera = true;

        cursors = game.input.keyboard.createCursorKeys();

        //mainbgm = game.add.audio('main-bgm');
        //mainbgm.play('', 0, .3, false)
    },

    update: function() {
        bubblesBG.tilePosition.y -= 0.2;
        game.physics.arcade.collide(enemies, enemies);
        game.physics.arcade.collide(enemies, layer);
        game.physics.arcade.collide(bombs, layer);
        game.physics.arcade.collide(player, pod);
        game.physics.arcade.collide(pod, layer);
        game.physics.arcade.collide(stars, layer);
        game.physics.arcade.overlap(player, enemies, enemyCollision, null, this);
        game.physics.arcade.overlap(player, bombs, bombCollision, null, this);
        game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        game.physics.arcade.collide(player, layer);

        playerControls();
        enemyMove();
        bombMove();

        if (player.position.x > 3600) {
            this.winGame();
            alive = false;
        }

        if (health <= 0){
            this.lose();
            alive = false;
        }
    },

    collectStar: function(player, star) {
        star.kill();
        if (alive){
            score += 10;
            scoreText.text = 'Score: ' + score;
        }
    },

    winGame: function() {
        statusText = game.add.text(300, 300, 'You win!', { fontSize: '32px', fill: '#fff' });
        statusText.fixedToCamera = true;
        game.time.events.add(5000, function(){
            game.state.start('winGame');
        }, this);
    },

    loseGame: function() {
        statusText = game.add.text(300, 300, 'You lose :(', { fontSize: '32px', fill: '#fff' });
        statusText.fixedToCamera = true;
        game.time.events.add(5000, function(){
            game.state.start('lose');
        }, this);
    },

    gameRestart: function() {
        this.score = 0;
        health = 100;
        if (enemies.children.length < 10 && enemies.children.length !== 0) {
            enemies.children.forEach(enemy => {
                enemy.destroy();
            });
        }
        if (bombs.children.length > 0) {
            bombs.children.forEach(bomb => {
                bomb.destroy();
            });
        }
        createEnemies(1, 1145, 800);
        createEnemies(1, 1800, 345);
        createEnemies(1, 2200, 1200);
    }
}

