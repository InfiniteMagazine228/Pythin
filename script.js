const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");

let player = {x: 400, y: 300, hp: 100, weapon: null, ammo: 0};
let enemies = [];
let weapons = [];
let safeZone = {x: 400, y: 300, r: 250};

function startGame() {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  document.getElementById("hud").style.display = "block";
  overlay.style.display = "none";
  spawnWeapons();
  spawnEnemies();
  requestAnimationFrame(gameLoop);
}

function openSettings() { showOverlay("⚙️ Settings\nChỉnh đồ họa, ánh sáng..."); }
function openInstructions() { showOverlay("📜 Instructions\nWASD di chuyển\nSpace bắn\nE đặt bom keo"); }
function openLanguage() { showOverlay("🌐 Language\nVN / EN"); }
function exitGame() { showOverlay("👋 Thoát game"); }

function showOverlay(text) {
  overlay.innerText = text + "\n\n(Ấn ESC để đóng)";
  overlay.style.display = "block";
}

document.addEventListener("keydown", e => {
  if(e.key==="Escape") overlay.style.display="none";
});

function spawnWeapons() {
  for (let i=0; i<5; i++) {
    weapons.push({x: Math.random()*800, y: Math.random()*600});
  }
}

function spawnEnemies() {
  for (let i=0; i<3; i++) {
    enemies.push({x: Math.random()*800, y: Math.random()*600, hp:100, ammo:0});
  }
}

function updateHUD() {
  document.getElementById("hp").innerText = "HP: " + player.hp;
  document.getElementById("ammo").innerText = "Ammo: " + player.ammo;
  document.getElementById("weapon").innerText = "Weapon: " + (player.weapon || "None");
}

function gameLoop() {
  ctx.clearRect(0,0,800,600);

  // Safe zone
  ctx.strokeStyle = "lime";
  ctx.beginPath();
  ctx.arc(safeZone.x, safeZone.y, safeZone.r, 0, Math.PI*2);
  ctx.stroke();

  // Player
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x-10, player.y-10, 20, 20);

  // Weapons
  ctx.fillStyle = "cyan";
  weapons.forEach(w => ctx.fillRect(w.x-5, w.y-5, 10, 10));

  // Enemies
  ctx.fillStyle = "orange";
  enemies.forEach(e => ctx.fillRect(e.x-10, e.y-10, 20, 20));

  updateHUD();
  requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener("keydown", e => {
  if(e.key==="w") player.y-=10;
  if(e.key==="s") player.y+=10;
  if(e.key==="a") player.x-=10;
  if(e.key==="d") player.x+=10;
  if(e.key===" ") {
    if(player.weapon && player.ammo>0) {
      player.ammo--;
      updateHUD();
    }
  }
  if(e.key==="e") {
    alert("Bom keo đặt!");
  }
});
