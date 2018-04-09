let player;
let playerFacing = "right";

function playerControls() {  
    if (cursors.left.isDown) {      //left = below zero
        player.play("left", true);
        playerFacing = "left";
        if (player.body.velocity.x > 0){
            player.body.acceleration.x -= 10;
        } else {
            player.body.acceleration.x -= 1;
        }

    } else if (cursors.right.isDown) {      //right = above zero
        player.play("right", true);
        playerFacing = "right";
        if (player.body.velocity.x < 0){
            player.body.acceleration.x += 10;
        } else {
            player.body.acceleration.x += 1;
        }
    } else {
        //player.animations.stop();
        //player.frame = 4;
        
        if (playerFacing === "right"){
                player.play("idleRight", true);
            } else {
                player.play("idleLeft", true);
            }

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


    if (cursors.up.isDown) {      //up = below zero
        
        if (player.body.velocity.y > 0){
            player.body.acceleration.y -= 10;
        } else {
            player.body.acceleration.y -= 1;
        }

    } else if (cursors.down.isDown) {      //down = above zero
        
        if (player.body.velocity.y < 0){
            player.body.acceleration.y += 10;
        } else {
            player.body.acceleration.y += 1;
        }
    } else {
        //player.animations.stop();
        //player.frame = 4;
        

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