// ======== CHANGE THIS PIN ========
const PIN = "143";

// Unlock Website + Trigger Pink Heart Blast & Driving Panda
function unlock() {
    const pin = document.getElementById("pin").value;
    const error = document.getElementById("error");

    if (pin === PIN) {
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("mainWebsite").style.display = "block";
        blastPinkHearts();
        startPandaDrive();
    } else {
        error.innerHTML = "❌ Wrong PIN";
        error.style.color = "white";
    }
}

// Function to explode pink hearts across screen
function blastPinkHearts() {
    const heartTypes = ["💖", "💗", "💕", "🌸", "❤️", "🌺"];
    
    for (let i = 0; i < 60; i++) {
        let heart = document.createElement("div");
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.fontSize = (20 + Math.random() * 35) + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "999999";
        heart.style.transition = "transform 1.8s ease-out, opacity 1.8s ease-out";

        document.body.appendChild(heart);

        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 600;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            heart.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 720}deg) scale(${0.8 + Math.random()})`;
            heart.style.opacity = "0";
        }, 50);

        setTimeout(() => heart.remove(), 2000);
    }
}

// ===== PANDA DRIVING ON ROAD WITH ROSES TRAIL =====
function startPandaDrive() {
    if (!document.getElementById("roadPath")) {
        const road = document.createElement("div");
        road.id = "roadPath";
        document.body.appendChild(road);
    }

    const pandaScene = document.createElement("div");
    pandaScene.id = "pandaDriveScene";
    
    const bubble = document.createElement("div");
    bubble.className = "loveBubble";
    bubble.innerHTML = "I Love You 💖";

    const panda = document.createElement("div");
    panda.className = "pandaCharacter";
    panda.innerHTML = "🏎️🐼";

    pandaScene.appendChild(bubble);
    pandaScene.appendChild(panda);
    document.body.appendChild(pandaScene);

    const roseInterval = setInterval(() => {
        const rect = pandaScene.getBoundingClientRect();
        
        if (rect.left > window.innerWidth + 50) {
            clearInterval(roseInterval);
            return;
        }

        if (rect.left > 0) {
            const rose = document.createElement("div");
            rose.innerHTML = Math.random() > 0.25 ? "🌹" : "🌸";
            rose.style.position = "fixed";
            rose.style.bottom = (12 + Math.random() * 15) + "px";
            rose.style.left = (rect.left + 20) + "px";
            rose.style.fontSize = (14 + Math.random() * 8) + "px";
            rose.style.zIndex = "35";
            rose.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.15))";
            rose.style.animation = "pop 0.4s ease";

            document.body.appendChild(rose);
        }
    }, 280);

    setTimeout(() => {
        pandaScene.remove();
    }, 9500);
}

// ===== Background Floating Stickers =====
const cuteStickers = [
    "🐱", "🐶", "🐼", "🧋", "🐧", "🐹", 
    "🐣", "🐻", "🦦", "🐰", "🥟", "🥐"
];

// Custom Audio Synthesizer per sticker type
function playStickerSound(emoji) {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const t = ctx.currentTime;

        if (emoji === "🐱") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, t);
            osc.frequency.exponentialRampToValueAtTime(900, t + 0.2);
            osc.frequency.exponentialRampToValueAtTime(450, t + 0.5);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.5);
        } 
        else if (emoji === "🐶") {
            [0, 0.18].forEach(delay => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(280, t + delay);
                osc.frequency.exponentialRampToValueAtTime(120, t + delay + 0.12);
                gain.gain.setValueAtTime(0.3, t + delay);
                gain.gain.exponentialRampToValueAtTime(0.01, t + delay + 0.12);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t + delay);
                osc.stop(t + delay + 0.12);
            });
        } 
        else if (emoji === "🐼") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(400, t);
            osc.frequency.exponentialRampToValueAtTime(1200, t + 0.08);
            gain.gain.setValueAtTime(0.4, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.08);
        } 
        else if (emoji === "🐧") {
            for (let i = 0; i < 5; i++) {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "square";
                osc.frequency.setValueAtTime(800 + (i % 2) * 200, t + i * 0.07);
                gain.gain.setValueAtTime(0.15, t + i * 0.07);
                gain.gain.exponentialRampToValueAtTime(0.01, t + i * 0.07 + 0.05);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t + i * 0.07);
                osc.stop(t + i * 0.07 + 0.05);
            }
        } 
        else if (emoji === "🐣") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(1200, t);
            osc.frequency.exponentialRampToValueAtTime(200, t + 0.1);
            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.1);
        } 
        else if (emoji === "🧋") {
            [0, 0.08, 0.16].forEach((delay, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(300 + idx * 150, t + delay);
                osc.frequency.exponentialRampToValueAtTime(600 + idx * 150, t + delay + 0.06);
                gain.gain.setValueAtTime(0.2, t + delay);
                gain.gain.exponentialRampToValueAtTime(0.01, t + delay + 0.06);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t + delay);
                osc.stop(t + delay + 0.06);
            });
        } 
        else if (emoji === "🐰") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(900, t);
            osc.frequency.exponentialRampToValueAtTime(300, t + 0.25);
            gain.gain.setValueAtTime(0.35, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.25);
        } 
        else if (emoji === "🥟") {
            [0, 0.12].forEach(delay => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(250, t + delay);
                osc.frequency.exponentialRampToValueAtTime(500, t + delay + 0.08);
                gain.gain.setValueAtTime(0.25, t + delay);
                gain.gain.exponentialRampToValueAtTime(0.01, t + delay + 0.08);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t + delay);
                osc.stop(t + delay + 0.08);
            });
        } 
        else if (emoji === "🦦") {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(180, t);
            osc.frequency.exponentialRampToValueAtTime(240, t + 0.3);
            osc.frequency.exponentialRampToValueAtTime(150, t + 0.6);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.6);
        } 
        else {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(500, t);
            osc.frequency.exponentialRampToValueAtTime(300, t + 0.2);
            osc.frequency.exponentialRampToValueAtTime(550, t + 0.4);
            osc.frequency.exponentialRampToValueAtTime(250, t + 0.7);

            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.7);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(t);
            osc.stop(t + 0.7);
        }
    } catch(e){}
}

// Index tracker to ensure equal round-robin rotation of stickers
let stickerIndex = 0;

function createRunningSticker() {
    const container = document.createElement("div");
    container.className = "runnerContainer";
    
    // Picks each sticker one by one equally in sequence
    const chosenEmoji = cuteStickers[stickerIndex % cuteStickers.length];
    stickerIndex++;
    
    const sticker = document.createElement("span");
    sticker.className = "stickerIcon";
    sticker.innerHTML = chosenEmoji;
    sticker.style.fontSize = (32 + Math.random() * 18) + "px";

    container.appendChild(sticker);
    
    const isTop = Math.random() > 0.5;
    const topPercent = isTop ? (5 + Math.random() * 20) : (65 + Math.random() * 15);
    container.style.top = topPercent + "vh";
    
    const duration = 3.5 + Math.random() * 2.5;
    container.style.animationDuration = duration + "s";

    let teased = false;

    container.onclick = function(e) {
        if (teased) return;
        teased = true;
        e.stopPropagation();

        playStickerSound(chosenEmoji);

        const rect = container.getBoundingClientRect();
        container.style.animation = "none";
        container.style.left = rect.left + "px";
        container.style.zIndex = "999";

        let customMessage = "Stop teasing me! 🥺😭";
        
        if (chosenEmoji === "🐣") {
            customMessage = "mera anda fod diya 🥺😭";
            sticker.innerHTML = "🍳🥺";
        } else if (chosenEmoji === "🧋") {
            customMessage = "coffee pine do yr 🥺😭";
            sticker.innerHTML = "🧋😭";
        } else if (chosenEmoji === "🐰") {
            customMessage = "Bhodi 😡";
            sticker.innerHTML = "🐰😡";
        } else if (chosenEmoji === "🐱") {
            customMessage = "म्याऊं म्याऊं 🥺😭";
            sticker.innerHTML = "🐱🥺";
        } else if (chosenEmoji === "🐶") {
            customMessage = "भौ भौ छेड़ो न मैडम 🥺😭";
            sticker.innerHTML = "🐶🥺";
        } else if (chosenEmoji === "🐼") {
            customMessage = "chumma le lunga 😘";
            sticker.innerHTML = "🐼😘";
        } else if (chosenEmoji === "🐧") {
            customMessage = "kapda kholo thandi lg rhi hai 🥶🫣";
            sticker.innerHTML = "🐧🥶";
        } else if (chosenEmoji === "🥟") {
            customMessage = "khaa le kya ji🤭";
            sticker.innerHTML = "🥟😋";
        } else if (chosenEmoji === "🦦") {
            customMessage = "sone de chain se 🥺😭";
            sticker.innerHTML = "🦦😴";
        } else {
            sticker.innerHTML = "😭🥺";
        }

        const bubble = document.createElement("div");
        bubble.className = "speechBubble";
        bubble.innerHTML = customMessage;
        container.appendChild(bubble);

        container.style.transition = "transform 0.1s infinite alternate";
        container.style.transform = "scale(1.2) rotate(5deg)";

        setTimeout(() => {
            container.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            container.style.opacity = "0";
            container.style.transform = "scale(0.5)";
            setTimeout(() => container.remove(), 600);
        }, 1500);
    };

    document.body.appendChild(container);

    setTimeout(() => {
        if (!teased && container.parentNode) {
            container.remove();
        }
    }, duration * 1000);
}

setInterval(createRunningSticker, 1200);

// Music button
const musicBtn = document.getElementById("musicBtn");
const song = document.getElementById("song");

if (musicBtn && song) {
    musicBtn.onclick = function(){
        if(song.paused){
            song.play();
            musicBtn.innerHTML="⏸ Pause Music";
        }else{
            song.pause();
            musicBtn.innerHTML="🎵 Play Music";
        }
    };
}

function openGallery(){
    document.getElementById("gallery").style.display="block";
}

function closeGallery(){
    document.getElementById("gallery").style.display="none";
}

function openLetter(){
    document.querySelector(".cover").style.transform="rotateX(180deg)";
    document.querySelector(".paper").style.transform="translateY(-60px)";
}

function closeLetter(){
    document.getElementById("letterPage").style.display="none";
    document.querySelector(".cover").style.transform="rotateX(0deg)";
    document.querySelector(".paper").style.transform="translateY(100px)";
}

// ===== FIREWORKS ENGINE =====
let canvas, ctx;
let particles = [];
let fireworkInterval;
let animId;

function initCanvas() {
    canvas = document.getElementById("fireworksCanvas");
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

function createFirework() {
    if (!canvas) return;
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height * 0.5);
    const count = 40;
    const colors = ["#ff0055", "#ffdd00", "#ff00d4", "#00ffff", "#ffffff", "#ff7700"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i;
        const speed = Math.random() * 4 + 2;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: color,
            size: Math.random() * 3 + 2
        });
    }
}

function renderFireworks() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }

    animId = requestAnimationFrame(renderFireworks);
}

// Surprise Page Trigger
function openSurprise(){
    document.getElementById("surprisePage").style.display="flex";
    initCanvas();
    particles = [];
    fireworkInterval = setInterval(createFirework, 400);
    createFirework();
    renderFireworks();
}

function closeSurprise(){
    document.getElementById("surprisePage").style.display="none";
    clearInterval(fireworkInterval);
    cancelAnimationFrame(animId);
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// ===== Cute Cat Sticker & Popup =====
function showCatSticker(){
    document.getElementById("catPopup").style.display="flex";
}

function closeCatPopup(){
    document.getElementById("catPopup").style.display = "none";
    document.getElementById("passwordBox").style.display = "none";
    document.getElementById("letterPage").style.display = "flex";
}

function revealPassword(){
    document.getElementById("passwordBox").style.display="block";

    for(let i=0;i<40;i++){
        let heart=document.createElement("div");
        heart.innerHTML=["❤️","💖","💕","💞","🥰","😘"][Math.floor(Math.random()*6)];
        heart.style.position="fixed";
        heart.style.left=(45+Math.random()*10)+"%";
        heart.style.top=(45+Math.random()*10)+"%";
        heart.style.fontSize=(20+Math.random()*25)+"px";
        heart.style.pointerEvents="none";
        heart.style.zIndex="999999";
        heart.style.transition="1.8s";

        document.body.appendChild(heart);

        setTimeout(()=>{
            heart.style.transform=
            `translate(${(Math.random()-0.5)*700}px,${(Math.random()-0.5)*700}px)
            rotate(${Math.random()*720}deg)`;
            heart.style.opacity="0";
        },50);

        setTimeout(()=>heart.remove(),2000);
    }
}
