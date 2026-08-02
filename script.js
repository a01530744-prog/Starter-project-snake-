// ======== CHANGE THIS PIN ========
const PIN = "143";

// Unlock Website
function unlock() {
    const pin = document.getElementById("pin").value;
    const error = document.getElementById("error");

    if (pin === PIN) {
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("mainWebsite").style.display = "block";
    } else {
        error.innerHTML = "❌ Wrong PIN";
        error.style.color = "white";
    }
}

// Floating hearts & emojis
const emojis = [
    "❤️","💖","💕","💞","💗",
    "🥰","😍","😘","🌸","✨"
];

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];
    heart.style.left = Math.random()*100 + "vw";
    heart.style.fontSize = (18 + Math.random()*30) + "px";
    heart.style.animationDuration = (4 + Math.random()*5) + "s";

    document.body.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },9000);
}

setInterval(createHeart,200);

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
    const y = Math.random() * (canvas.height * 0.5); // Upper half of screen
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
        p.vy += 0.04; // Gravity
        p.alpha -= 0.015; // Fade out

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
let fallingInterval;

function openSurprise(){
    document.getElementById("surprisePage").style.display="flex";
    if (!fallingInterval) {
        fallingInterval = setInterval(createFalling, 350);
    }
    
    // Start Fireworks
    initCanvas();
    particles = [];
    fireworkInterval = setInterval(createFirework, 400);
    createFirework(); // Instant first burst
    renderFireworks();
}

function closeSurprise(){
    document.getElementById("surprisePage").style.display="none";
    
    // Stop Fireworks
    clearInterval(fireworkInterval);
    cancelAnimationFrame(animId);
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// 🌹 Falling Roses + ❤️ I Love You
const fallingItems = [
    "🌹",
    "❤️",
    "💖",
    "💕",
    "💞",
    "🥰",
    "😘",
    "I Love You ❤️"
];

function createFalling(){
    const item=document.createElement("div");
    item.className="falling";
    item.innerHTML=fallingItems[Math.floor(Math.random()*fallingItems.length)];
    item.style.left=Math.random()*100+"vw";
    item.style.fontSize=(18+Math.random()*25)+"px";
    item.style.animationDuration=(6+Math.random()*5)+"s";

    document.body.appendChild(item);

    setTimeout(()=>{
        item.remove();
    },11000);
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
