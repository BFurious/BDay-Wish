const celebrationSong = document.getElementById('celebrationSong');
const celebrationSong2 = document.getElementById('celebrationSong2');
const giftBox_1 = document.getElementById('giftBox1');
const giftBox_2 = document.getElementById('giftBox2');
const cake = document.getElementById('cake');
const flork = document.getElementById('flork');
const candlesContainer = document.getElementById('candles');
const cakeCandleContainer = document.getElementsByClassName('cake-candle-container')[0];
const holdUp = document.getElementById('image2');
const numCandles = 14;
let allCandlesUnlit = false;

canvas = document.getElementById("mycanvas");
ctx = canvas.getContext("2d");

let currentSongIndex = 0;
const songs = [celebrationSong, celebrationSong2];
const gifs = ["dirtygifAnimation", "gifAnimation"];
// Function to play the next song
function playNextSong() {
  // Stop any currently playing song
  songs[currentSongIndex].pause();
  songs[currentSongIndex].currentTime = 0;
  document.body.style.animation = ``;
  // Move to the next song in the queue
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  document.body.style.animation = `${gifs[currentSongIndex]} 20s infinite`;
  songs[currentSongIndex].play();
}

// Attach event listeners to the "ended" event for both songs
songs.forEach(song => {
  song.addEventListener('ended', playNextSong);
});

// Start playing the first song



async function showGiftBox2() { 
    giftBox_1.style.display = 'none';
    giftBox_2.style.display = 'block';
}
function showCake() {
    giftBox_2.classList.add('zoom-out'); // Add zoom-in effect to cake
    giftBox_2.style.display = 'none';
    document.body.style.animation = `${gifs[currentSongIndex]} 20s infinite`;
    songs[currentSongIndex].play();
    showMessage("Time to unlit candle and make a wish...");
    cake.style.display = 'block';
    setTimeout(()=>{
        cake.classList.add('zoom-in'); // Add zoom-in effect to cake
    }, 1000);
    setTimeout(createCandles(numCandles), 1000);
}
async function resetCandles(candlesContainerTop, lastTop){
    return (lastTop - candlesContainerTop + 50 + 10) + 'px';
}
async function createCandles(numCandles) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    var lastTop = 0;
    var candlesContainerRect = candlesContainer.getBoundingClientRect();
    for (let i = 0; i < numCandles; i++) {
        const lastCandle = candlesContainer.lastElementChild;
        const candle = document.createElement('div');
        const candleDistance = candlesContainerRect.width/15;
                candle.classList.add('candle');
        if(lastCandle){
            var lastCandleRect = lastCandle.getBoundingClientRect();
            lastTop= lastCandleRect.top;
            if ((lastCandleRect.left - candlesContainerRect.left + candleDistance) >= 500){
                lastTop = resetCandles(candlesContainerRect.top, lastTop);
                candle.style.left = '0px';
                candle.style.top = (lastTop - candlesContainerRect.top) + 'px';
                
            } else {
                candle.style.left = (lastCandleRect.left - candlesContainerRect.left + candleDistance) +'px';
                candle.style.top = (lastTop - candlesContainerRect.top) + 'px';
            }
        }  else {
            candle.style.left = '0px';
            candle.style.top = lastTop + 'px';
        }
        candle.addEventListener('click', unlitCandle);
        candlesContainer.appendChild(candle);
    }
}

function unlitCandle(e) {
    if (!allCandlesUnlit) {
        e.target.classList.add('unlit');
        const unlitCandles = document.querySelectorAll('.candle.unlit');
        const book = document.getElementsByClassName("card-container")[0];
        if (unlitCandles.length === numCandles) {
            allCandlesUnlit = true;
            cakeCandleContainer.classList.add('zoom-out');
            setTimeout(()=>{
                cakeCandleContainer.style.display = "none";
            }, 900) 
            startFireworks();
            releaseBalloons();
            showMessage("Hold Up wait a Minute......");
            holdUp.style.display = 'block';
            holdUp.classList.add('zoom-in'); // Add zoom-in effect to cake
            
            setTimeout(()=>{
                showMessage("");
                holdUp.classList.add('zoom-out');  
                setTimeout(()=>{
                    holdUp.style.display = 'none';
                }, 900)   
                canvas.style.display = 'none';
                book.style.display="flex"; // Add zoom-in effect to cake
                book.classList.add('zoom-in'); // Add zoom-in effect to cake
                flork.style.display = 'block';
                flork.classList.add('zoom-in');
            }, 5000);
            
        }
    }
}

function startFireworks() {
    const particles = [];
    const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

    function createParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            color: colors[Math.floor(Math.random() * colors.length)],
            radius: Math.random() * 4 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            alpha: 1
        };
        particles.push(particle);
    }

    function animateFireworks() {
        clearCanvas(ctx, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.alpha -= 0.01;

            ctx.globalAlpha = particle.alpha;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI*2 );
            ctx.fillStyle = particle.color;
            ctx.fill();

            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        ctx.globalAlpha = 1;

        if (particles.length > 0) {
            requestAnimationFrame(animateFireworks);
        }
    }

    function launchFireworks() {
        for (let i = 0; i < 100; i++) {
            createParticle(canvas.width / 2, canvas.height / 2);
        }
        animateFireworks();
    }

    launchFireworks();
}

function releaseBalloons() {
    const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * (window.innerWidth - 50) + 'px';
        document.body.appendChild(balloon);

        // Animate balloon
        balloon.animate([
            { transform: `translateY(${window.innerHeight}px)` },
            { transform: 'translateY(-200px)' }
        ], {
            duration: 5000 + Math.random() * 5000,
            iterations: 1,
            easing: 'ease-out',
            fill: 'forwards'
        });
    }
}

// Balloon CSS
const balloonStyle = document.createElement('style');
balloonStyle.innerHTML = `
    .balloon {
        position: absolute;
        width: 50px;
        height: 70px;
        background-color: #FF1461;
        border-radius: 50%;
        opacity: 0.8;
        z-index: 3;
    }
`;
document.head.appendChild(balloonStyle);
