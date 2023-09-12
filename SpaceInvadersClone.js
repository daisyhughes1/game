<!DOCTYPE html>
<html>
<head>
  <title>Space Invaders Clone</title>
  <style>
    canvas {
      background: black;
      display: block;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <canvas id="gameCanvas" width="480" height="320"></canvas>
  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Player settings
    const playerWidth = 30;
    const playerHeight = 30;
    let playerX = (canvas.width - playerWidth) / 2;
    const playerY = canvas.height - playerHeight;
    const playerSpeed = 5;

    // Player control
    let rightPressed = false;
    let leftPressed = false;

    // Alien settings
    const alienWidth = 30;
    const alienHeight = 30;
    const alienRowCount = 5;
    const alienColumnCount = 8;
    const alienPadding = 10;
    const alienOffsetTop = 30;
    const alienOffsetLeft = 30;

    const aliens = [];
    for (let c = 0; c < alienColumnCount; c++) {
      aliens[c] = [];
      for (let r = 0; r < alienRowCount; r++) {
        aliens[c][r] = { x: 0, y: 0, alive: true };
      }
    }

    // Bullet settings
    const bulletWidth = 5;
    const bulletHeight = 15;
    const bulletSpeed = 5;
    let bulletX = playerX + playerWidth / 2 - bulletWidth / 2;
    let bulletY = canvas.height - playerHeight;

    // Game loop
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      ctx.fillStyle = 'green';
      ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

      // Draw aliens
      for (let c = 0; c < alienColumnCount; c++) {
        for (let r = 0; r < alienRowCount; r++) {
          if (aliens[c][r].alive) {
            const alienX = c * (alienWidth + alienPadding) + alienOffsetLeft;
            const alienY = r * (alienHeight + alienPadding) + alienOffsetTop;
            aliens[c][r].x = alienX;
            aliens[c][r].y = alienY;
            ctx.fillStyle = 'red';
            ctx.fillRect(alienX, alienY, alienWidth, alienHeight);
          }
        }
      }

      // Move the bullet
      if (bulletY > 0) {
        ctx.fillStyle = 'white';
        ctx.fillRect(bulletX, bulletY, bulletWidth, bulletHeight);
        bulletY -= bulletSpeed;
      } else {
        bulletY = playerY;
      }

      // Check for collision
      for (let c = 0; c < alienColumnCount; c++) {
        for (let r = 0; r < alienRowCount; r++) {
          const alien = aliens[c][r];
          if (alien.alive) {
            if (
              bulletX > alien.x &&
              bulletX < alien.x + alienWidth &&
              bulletY > alien.y &&
              bulletY < alien.y + alienHeight
            ) {
              alien.alive = false;
              bulletY = playerY;
            }
          }
        }
      }

      // Move the player
      if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
      }
      if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
      }

      requestAnimationFrame(draw);
    }

    // Handle player controls
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = true;
      }
      if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = true;
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = false;
      }
      if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = false;
      }
    });

    // Start the game loop
    draw();
  </script>
</body>
</html>
