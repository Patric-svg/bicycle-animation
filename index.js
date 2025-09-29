const canvas = document.getElementById('bikeCanvas');
const ctx = canvas.getContext('2d');
let angle = 0;
let bikeX = 100;
let bikeSpeed = 2;

// Tree positions
let trees = [
  { x: 200, y: 350 },
  { x: 500, y: 340 },
  { x: 700, y: 360 }
];

function drawTree(x, y) {
  // Trunk
  ctx.fillStyle = '#8d5524';
  ctx.fillRect(x - 10, y, 20, 60);
  // Leaves
  ctx.beginPath();
  ctx.arc(x, y, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#228B22';
  ctx.fill();
}

function drawHumanRider(x, y, legAngle) {
  // Hip position (seat)
  const hipX = x;
  const hipY = y - 20; // Lower than before

  // Torso (from hip to shoulders)
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(hipX, hipY);
  ctx.lineTo(hipX, hipY - 60);
  ctx.stroke();

  // Head
  ctx.beginPath();
  ctx.arc(hipX, hipY - 80, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#fcd7b6';
  ctx.fill();
  ctx.stroke();

  // Helmet
  ctx.beginPath();
  ctx.arc(hipX, hipY - 88, 20, Math.PI, 2 * Math.PI);
  ctx.fillStyle = '#1976d2';
  ctx.fill();

  // Eyes
  ctx.beginPath();
  ctx.arc(hipX - 7, hipY - 85, 3, 0, Math.PI * 2);
  ctx.arc(hipX + 7, hipY - 85, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#222';
  ctx.fill();

  // Mouth
  ctx.beginPath();
  ctx.arc(hipX, hipY - 77, 7, 0, Math.PI);
  ctx.strokeStyle = '#a0522d';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Right Arm (to handlebar)
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#222';
  ctx.beginPath();
  ctx.moveTo(hipX, hipY - 40);
  ctx.lineTo(hipX + 50, hipY - 10);
  ctx.lineTo(hipX + 80, hipY + 10);
  ctx.stroke();
  // Right Hand
  ctx.beginPath();
  ctx.arc(hipX + 80, hipY + 10, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#fcd7b6';
  ctx.fill();

  // Left Arm (to handlebar)
  ctx.beginPath();
  ctx.moveTo(hipX, hipY - 40);
  ctx.lineTo(hipX - 40, hipY - 20);
  ctx.lineTo(hipX - 80, hipY);
  ctx.stroke();
  // Left Hand
  ctx.beginPath();
  ctx.arc(hipX - 80, hipY, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#fcd7b6';
  ctx.fill();

  // Right Leg (animated, to pedal)
  ctx.beginPath();
  ctx.moveTo(hipX, hipY);
  let rightKneeX = hipX + 20 * Math.cos(legAngle);
  let rightKneeY = hipY + 40 + 20 * Math.sin(legAngle);
  ctx.lineTo(rightKneeX, rightKneeY);
  ctx.lineTo(hipX - 80, hipY + 60);
  ctx.stroke();
  // Right Foot
  ctx.beginPath();
  ctx.arc(hipX - 80, hipY + 60, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#fcd7b6';
  ctx.fill();

  // Left Leg (animated, to pedal)
  ctx.beginPath();
  ctx.moveTo(hipX, hipY);
  let leftKneeX = hipX + 20 * Math.cos(legAngle + Math.PI);
  let leftKneeY = hipY + 40 + 20 * Math.sin(legAngle + Math.PI);
  ctx.lineTo(leftKneeX, leftKneeY);
  ctx.lineTo(hipX - 80, hipY + 60);
  ctx.stroke();
  // Left Foot
  ctx.beginPath();
  ctx.arc(hipX - 80, hipY + 60, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#fcd7b6';
  ctx.fill();
}

function drawBike(x, y, wheelAngle, legAngle) {
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

  // Improved Handlebar
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(80, 40);
  ctx.lineTo(110, 0); // main bar
  ctx.moveTo(110, 0);
  ctx.lineTo(120, 10); // right grip
  ctx.moveTo(110, 0);
  ctx.lineTo(100, -10); // left grip
  ctx.stroke();

  ctx.restore();

  // Draw rider
  drawHumanRider(x, y, legAngle);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move trees to the left
  for (let tree of trees) {
    tree.x -= bikeSpeed;
    if (tree.x < -50) tree.x = canvas.width + 50 * Math.random();
    drawTree(tree.x, tree.y);
  }

  // Move bike to the right
  bikeX += bikeSpeed;
  if (bikeX > canvas.width - 100) bikeX = 100;

  let centerY = canvas.height / 2 + 40;
  drawBike(bikeX, centerY, angle, angle * 2);

  angle += 0.05;
  requestAnimationFrame(animate);
}
animate();