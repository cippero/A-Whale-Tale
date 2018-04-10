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
    },

    create: function() { 

        score = 0;
        health = 100;
        scoreText = null;
        healthText = null;
        cursors = null;
        platforms = null;
        bubblesBG = null;
        stars = null;
        statusText = null;
        alive = true;
        map = null;
        layer = null;
        pod = null;

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
        //game.add.tileSprite(0,0, 4096, 2048, "background");

        player = game.add.sprite(80, 940, 'whale');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 10;
        player.body.collideWorldBounds = true;
        player.body.maxVelocity.x = 100;
        player.body.maxVelocity.y = 100;
        player.animations.add('left', [4, 5, 6, 5], 10, true);
        player.animations.add('right', [3, 2, 1, 2], 10, true);
        player.animations.add('idleLeft', [4, 7], 2, true);
        player.animations.add('idleRight', [3, 0], 2, true);
        game.camera.follow(player);

        pod = game.add.group();
        pod.enableBody = true;
        pod.create(120, 940, 'whale').scale.setTo(0.7);
        pod.create(200, 900, 'whale').scale.setTo(0.8);
        pod.create(80, 880, 'whale');
        pod.children.forEach(fam => {
            fam.animations.add('idleLeft', [4, 7], 2, true);
            fam.play("idleLeft", true);
        })
        
        enemies = game.add.group();
        enemies.enableBody = true;

        bombs = game.add.group();
        bombs.enableBody = true;

        createEnemies(1, 1145, 800);
        createEnemies(1, 1800, 345);
        createEnemies(1, 2200, 1200);
        //createEnemies(5);
    
        stars = game.add.group();
        stars.enableBody = true;
        
        scoreText = game.add.text(16, 50, 'score: 0', { fontSize: '32px', fill: '#fff' });
        healthText = game.add.text(16, 16, 'health: ' + this.health, { fontSize: '32px', fill: '#fff' });

        cursors = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        bubblesBG.tilePosition.y -= 0.2;
        game.physics.arcade.collide(enemies, enemies);
        game.physics.arcade.collide(enemies, layer);
        game.physics.arcade.collide(bombs, layer);
        game.physics.arcade.collide(player, pod);
        game.physics.arcade.collide(pod, layer);
        game.physics.arcade.overlap(player, enemies, enemyCollision, null, this);
        game.physics.arcade.overlap(player, bombs, bombCollision, null, this);
        game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        game.physics.arcade.collide(player, layer);

        playerControls();
        enemyMove();
        bombMove();

        if (score > 100 && enemies.children.length === 0){
            this.winGame();
            alive = false;
        }

        if (health <= 0){
            this.loseGame();
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

    createStars: function(num, x, y) {
        for (let i = 0; i < num; i++) {
            let star = stars.create(game.rnd.integerInRange(x*0.9, x*1.1), game.rnd.integerInRange(y*0.9, y*1.1), 'star');
            star.body.gravity.y = game.rnd.integerInRange(-10, 10);
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
            star.body.collideWorldBounds = true;
        }
    },

    winGame: function() {
        statusText = game.add.text(game.world.width/2-100, game.world.height/2, 'You win!', { fontSize: '32px', fill: '#000' });
        game.time.events.add(5000, function(){
            game.state.start('winGame');
        }, this);
    },

    loseGame: function() {
        statusText = game.add.text(game.world.width/2-100, game.world.height/2, 'You lose :(', { fontSize: '32px', fill: '#000' });
        game.time.events.add(5000, function(){
            game.state.start('lose');
        }, this);
    }
}

