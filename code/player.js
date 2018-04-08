let player;

function playerControls() {    
    if (cursors.left.isDown) {      //left = below zero
        player.animations.play("left");
        if (player.body.velocity.x > 0){
            player.body.acceleration.x -= 10;
        } else {
            player.body.acceleration.x -= 1;
        }

    } else if (cursors.right.isDown) {      //right = above zero
        player.animations.play("right");
        if (player.body.velocity.x < 0){
            player.body.acceleration.x += 10;
        } else {
            player.body.acceleration.x += 1;
        }
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
        //player.animations.play("left");

    } else if (cursors.down.isDown) {      //right = above zero
        if (player.body.velocity.y < 0){
            player.body.acceleration.y += 10;
        } else {
            player.body.acceleration.y += 1;
        }
        //player.animations.play("right");
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