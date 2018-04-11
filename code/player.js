let player;
let playerFacing = "right";
let health = 100;
let alive = true;

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
        
        if (playerFacing === "right"){
                player.play("idleRight", true);
            } else {
                player.play("idleLeft", true);
            }
        player.body.acceleration.x = 0;
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
        player.body.acceleration.y = 0;
    }
    
    
}