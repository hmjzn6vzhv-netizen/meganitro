const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// Esempio logica di controllo nel listener del click delle auto
if (b.vehicle.type === "LIMO" && !b.vehicle.purchased) {
    // Il veicolo è bloccato ed è a pagamento
    document.getElementById("paymentModal").style.display = "flex"; // Mostra la pagina di pagamento
    return; // Blocca l'avvio del livello
}
// --- PUNTEGGIO ---
let score = 0;
// Configurazione del Giocatore (Macchina)
let player = {
   x: 50,
   y: 200,
   width: 60,  
   height: 30,
   speed: 5
};
// Configurazione dell'Ostacolo (Cassonetto)
let obstacle = {
   x: 750,
   y: 200,
   width: 40,
   height: 45,
   speed: 4
};
// Gestione dei tasti premuti
let keys = {};
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);
// Ciclo principale del gioco
function gameLoop() {
   update();
   draw();
   requestAnimationFrame(gameLoop);
}
// Logica del gioco
function update() {
   // Movimento del giocatore
   if (keys["ArrowUp"] && player.y > 0) {
       player.y -= player.speed;
   }
   if (keys["ArrowDown"] && player.y < canvas.height - player.height) {
       player.y += player.speed;
   }
   // Movimento del cassonetto verso sinistra
   obstacle.x -= obstacle.speed;
   // Se il cassonetto esce a sinistra, guadagni un punto
   if (obstacle.x < -obstacle.width) {
       score++;
       obstacle.x = canvas.width;
       obstacle.y = Math.random() * (canvas.height - obstacle.height);
       obstacle.speed += 0.3; // Aumenta la velocità
   }
   // Controllo delle collisioni
   if (
       player.x < obstacle.x + obstacle.width &&
       player.x + player.width > obstacle.x &&
       player.y < obstacle.y + obstacle.height &&
       player.y + player.height > obstacle.y
   ) {
       alert("Hai fatto un incidente! Punteggio finale: " + score);
       // Reset totale del gioco
       keys = {};
       score = 0;          
       obstacle.speed = 4;
       player.y = 200;
       obstacle.x = 750;
       obstacle.y = 200;
   }
}
// Disegno sullo schermo (Disegniamo noi pixel per pixel!)
function draw() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   // --- DISEGNIAMO LA MACCHINA (Rossa e sportiva) ---
   // Corpo principale della macchina
   ctx.fillStyle = "#ff3838";
   ctx.fillRect(player.x, player.y + 10, player.width, 15);
   // Abitacolo/Parabrezza (sopra)
   ctx.fillStyle = "#333";
   ctx.fillRect(player.x + 15, player.y, 25, 10);
   // Ruota posteriore
   ctx.fillStyle = "#000";
   ctx.fillRect(player.x + 8, player.y + 22, 12, 10);
   // Ruota anteriore
   ctx.fillStyle = "#000";
   ctx.fillRect(player.x + 40, player.y + 22, 12, 10);
   // Faro anteriore (giallo davanti)
   ctx.fillStyle = "#fff200";
   ctx.fillRect(player.x + player.width - 4, player.y + 12, 4, 6);
   // --- DISEGNIAMO IL CASSONETTO (Verde classico) ---
   // Corpo del cassonetto
   ctx.fillStyle = "#2ed573";
   ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
   // Coperchio del cassonetto (un po' più scuro)
   ctx.fillStyle = "#26af5f";
   ctx.fillRect(obstacle.x - 2, obstacle.y, obstacle.width + 4, 6);
   // Ruote del cassonetto (piccoline sotto)
   ctx.fillStyle = "#57606f";
   ctx.fillRect(obstacle.x + 4, obstacle.y + obstacle.height, 6, 5);
   ctx.fillRect(obstacle.x + obstacle.width - 10, obstacle.y + obstacle.height, 6, 5);
   // Strisce sul cassonetto per dargli dettaglio
   ctx.fillStyle = "#1e90ff"; // Adesivo catarifrangente blu/bianco
   ctx.fillRect(obstacle.x + 5, obstacle.y + 15, obstacle.width - 10, 5);
   // --- DISEGNA IL PUNTEGIO ---
   ctx.fillStyle = "white";          
   ctx.font = "24px sans-serif";    
   ctx.fillText("Punti: " + score, 20, 40);
}
// Avvia il gioco
gameLoop();