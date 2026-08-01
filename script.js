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

    heart.innerHTML =
        emojis[Math.floor(Math.random()*emojis.length)];

    heart.style.left =
        Math.random()*100 + "vw";

    heart.style.fontSize =
        (18 + Math.random()*30) + "px";

    heart.style.animationDuration =
        (4 + Math.random()*5) + "s";

    document.body.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },9000);

}

setInterval(createHeart,200);

// Music button
const musicBtn = document.getElementById("musicBtn");
const song = document.getElementById("song");

musicBtn.onclick = function(){

    if(song.paused){

        song.play();

        musicBtn.innerHTML="⏸ Pause Music";

    }else{

        song.pause();

        musicBtn.innerHTML="🎵 Play Music";

    }

};
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
function openSurprise(){

document.getElementById("surprisePage").style.display="flex";
setInterval(createFalling,350);
}

function closeSurprise(){

document.getElementById("surprisePage").style.display="none";

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

item.innerHTML=
fallingItems[Math.floor(Math.random()*fallingItems.length)];

item.style.left=Math.random()*100+"vw";

item.style.fontSize=
(18+Math.random()*25)+"px";

item.style.animationDuration=
(6+Math.random()*5)+"s";

document.body.appendChild(item);

setTimeout(()=>{
item.remove();
},11000);

}

setInterval(createFalling,350);