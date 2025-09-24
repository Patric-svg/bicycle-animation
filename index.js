const canvas = document.getElementById('bikeCanvas');
const ctx = canvas.getContext('2d');

let angle = 0;

function drawBike(x, y, wheelAngle, legAngle) {
  // Wheels
  ctx.save();
  ctx.translate(x, y);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#222';

  // Rear wheel
  ctx.beginPath();
  ctx.arc(-80, 40, 40, 0, Math.PI * 2);
  ctx.stroke();

  // Front wheel
  ctx.beginPath();
  ctx.arc(80, 40, 40, 0, Math.PI * 2);
  ctx.stroke();

  // Spokes (animated)
  for (let i = 0; i < 6; i++) {
    let spokeAngle = wheelAngle + i * Math.PI / 3;
    // Rear
    ctx.beginPath();
    ctx.moveTo(-80, 40);
    ctx.lineTo(-80 + 40 * Math.cos(spokeAngle), 40 + 40 * Math.sin(spokeAngle));
    ctx.stroke();
    // Front
    ctx.beginPath();
    ctx.moveTo(80, 40);
    ctx.lineTo(80 + 40 * Math.cos(spokeAngle), 40 + 40 * Math.sin(spokeAngle));
    ctx.stroke();
  }

  // Frame
  ctx.strokeStyle = '#1976d2';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-80, 40); // rear wheel
  ctx.lineTo(0, 0);    // seat tube
  ctx.lineTo(80, 40);  // front wheel
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -60);  // seat post
  ctx.moveTo(0, 0);
  ctx.lineTo(40, 10);  // down tube
  ctx.stroke();

  // Handlebar
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(80, 40);
  ctx.lineTo(100, 10);
  ctx.moveTo(100, 10);
  ctx.lineTo(90, 0);
  ctx.moveTo(100, 10);
  ctx.lineTo(110, 20);
  ctx.stroke();

  // Rider body
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 4;
  // Torso
  ctx.beginPath();
  ctx.moveTo(0, -60);
  ctx.lineTo(0, -100);
  ctx.stroke();
  // Head
  ctx.beginPath();
  ctx.arc(0, -115, 15, 0, Math.PI * 2);
  ctx.stroke();

  // Arms
  ctx.beginPath();
  ctx.moveTo(0, -80);
  ctx.lineTo(60, -20);
  ctx.lineTo(100, 10);
  ctx.stroke();

  // Legs (animated)
  // Right leg
  ctx.beginPath();
  ctx.moveTo(0, -60);
  ctx.lineTo(-20 + 20 * Math.cos(legAngle), 40 + 20 * Math.sin(legAngle));
  ctx.lineTo(-80, 40);
  ctx.stroke();
  // Left leg
  ctx.beginPath();
  ctx.moveTo(0, -60);
  ctx.lineTo(20 + 20 * Math.cos(legAngle + Math.PI), 40 + 20 * Math.sin(legAngle + Math.PI));
  ctx.lineTo(-80, 40);
  ctx.stroke();

  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2 + 40;
  drawBike(centerX, centerY, angle, angle * 2);
  angle += 0.05;
  requestAnimationFrame(animate);
}

animate();