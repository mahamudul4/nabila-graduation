// Confetti Animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

// Fireworks Canvas
const fireworksCanvas = document.getElementById('fireworks');
const fireworksCtx = fireworksCanvas.getContext('2d');

canvas.width = fireworksCanvas.width = window.innerWidth;
canvas.height = fireworksCanvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = fireworksCanvas.width = window.innerWidth;
    canvas.height = fireworksCanvas.height = window.innerHeight;
});

// Confetti particles
class ConfettiPiece {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    randomColor() {
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', 
            '#6c5ce7', '#fd79a8', '#fdcb6e', '#e17055',
            '#74b9ff', '#a29bfe', '#00b894', '#ff7675'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Reset position when off screen
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }

        // Wrap around horizontally
        if (this.x > canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// Create confetti pieces
const confettiPieces = [];
const confettiCount = 150;

for (let i = 0; i < confettiCount; i++) {
    confettiPieces.push(new ConfettiPiece());
}

// Animation loop
function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
    });

    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Floating Particles Background
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 3;
    const startPositionX = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startPositionX}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
}

// Add interactive hover effects to celebration icons
const celebrationIcons = document.querySelectorAll('.celebration-icons .icon');

celebrationIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.5) rotate(360deg)';
        this.style.transition = 'transform 0.5s ease';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add click effect to the card
const card = document.querySelector('.card');
let isAnimating = false;

card.addEventListener('click', function(e) {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Create burst effect
    for (let i = 0; i < 20; i++) {
        createBurst(e.clientX, e.clientY);
    }
    
    setTimeout(() => {
        isAnimating = false;
    }, 1000);
});

function createBurst(x, y) {
    const burst = document.createElement('div');
    burst.style.position = 'fixed';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    burst.style.width = '10px';
    burst.style.height = '10px';
    burst.style.borderRadius = '50%';
    burst.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    burst.style.pointerEvents = 'none';
    burst.style.zIndex = '10000';
    
    document.body.appendChild(burst);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 200 + 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    
    const animate = () => {
        posX += vx * 0.016;
        posY += vy * 0.016 + 200 * 0.016; // gravity
        opacity -= 0.02;
        
        burst.style.transform = `translate(${posX}px, ${posY}px)`;
        burst.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            burst.remove();
        }
    };
    
    animate();
}

// Add smooth scroll reveal effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.message, .signature, .celebration-icons').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Add some fun sound effects on load (optional - commented out to avoid autoplay issues)
// You can uncomment this if you add sound files
/*
window.addEventListener('load', () => {
    // Play celebration sound
    const audio = new Audio('celebration.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio autoplay prevented'));
});
*/

// Console message
console.log('%c🎓 Congratulations Nabila Islam! 🎓', 'font-size: 24px; color: #764ba2; font-weight: bold;');
console.log('%cWith love from Mahamudul Hasan ❤️', 'font-size: 16px; color: #667eea; font-style: italic;');

// ============================================
// FIREWORKS ANIMATION
// ============================================
class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        const particleCount = 100;
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e'];
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * 5 + 3;
            
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 3 + 2
            });
        }
    }

    update() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= 0.01;
            p.vx *= 0.99;
            p.vy *= 0.99;
        });

        this.particles = this.particles.filter(p => p.life > 0);
    }

    draw() {
        this.particles.forEach(p => {
            fireworksCtx.save();
            fireworksCtx.globalAlpha = p.life;
            fireworksCtx.fillStyle = p.color;
            fireworksCtx.beginPath();
            fireworksCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            fireworksCtx.fill();
            fireworksCtx.restore();
        });
    }

    isDone() {
        return this.particles.length === 0;
    }
}

let fireworks = [];
let fireworksActive = false;

function launchFireworks() {
    if (!fireworksActive) return;
    
    if (Math.random() < 0.05) {
        const x = Math.random() * fireworksCanvas.width;
        const y = Math.random() * fireworksCanvas.height * 0.5;
        fireworks.push(new Firework(x, y));
    }
}

function animateFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    
    launchFireworks();
    
    fireworks.forEach(fw => {
        fw.update();
        fw.draw();
    });

    fireworks = fireworks.filter(fw => !fw.isDone());

    requestAnimationFrame(animateFireworks);
}

animateFireworks();

// ============================================
// MUSIC CONTROL
// ============================================
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

// Create audio context for background music
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = null;
let gainNode = null;

musicBtn.addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        musicBtn.classList.add('playing');
        musicBtn.querySelector('.music-text').textContent = 'Music Playing';
        // Simple celebration melody
        playCelebrationMelody();
    } else {
        isPlaying = false;
        musicBtn.classList.remove('playing');
        musicBtn.querySelector('.music-text').textContent = 'Play Music';
        if (oscillator) {
            oscillator.stop();
            oscillator = null;
        }
    }
});

function playCelebrationMelody() {
    // This creates a simple cheerful melody
    const notes = [
        { freq: 523.25, duration: 0.3 }, // C5
        { freq: 587.33, duration: 0.3 }, // D5
        { freq: 659.25, duration: 0.3 }, // E5
        { freq: 698.46, duration: 0.3 }, // F5
        { freq: 783.99, duration: 0.6 }, // G5
    ];

    let currentNote = 0;

    function playNote() {
        if (!isPlaying || currentNote >= notes.length) {
            currentNote = 0;
            if (isPlaying) {
                setTimeout(playNote, 1000);
            }
            return;
        }

        oscillator = audioContext.createOscillator();
        gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = notes[currentNote].freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + notes[currentNote].duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + notes[currentNote].duration);

        currentNote++;
        setTimeout(playNote, notes[currentNote - 1].duration * 1000);
    }

    playNote();
}

// ============================================
// GALLERY MODAL
// ============================================
const galleryModal = document.getElementById('galleryModal');
const galleryBtn = document.getElementById('galleryBtn');
const closeModal = document.querySelector('.close-modal');

galleryBtn.addEventListener('click', () => {
    galleryModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    galleryModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
    }
});

// Gallery item interactions
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', function() {
        const img = this.querySelector('.gallery-image');
        
        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 10002;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const fullImg = document.createElement('img');
        fullImg.src = img.src;
        fullImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
            animation: zoomIn 0.5s ease;
        `;
        
        overlay.appendChild(fullImg);
        document.body.appendChild(overlay);
        
        // Close on click
        overlay.addEventListener('click', () => {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        });
        
        // Add animations
        if (!document.querySelector('#fullscreen-animations')) {
            const style = document.createElement('style');
            style.id = 'fullscreen-animations';
            style.textContent = `
                @keyframes zoomIn {
                    from {
                        transform: scale(0);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    });
});

// ============================================
// FIREWORKS BUTTON
// ============================================
const fireworksBtn = document.getElementById('fireworksBtn');
let fireworksTimer = null;

fireworksBtn.addEventListener('click', () => {
    fireworksActive = true;
    fireworksBtn.style.transform = 'scale(1.3) rotate(360deg)';
    
    // Launch fireworks for 10 seconds
    setTimeout(() => {
        fireworksActive = false;
        fireworksBtn.style.transform = '';
    }, 10000);
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0.5';
    }
});

// ============================================
// TYPING ANIMATION FOR MESSAGES
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.card, .timeline-section, .cards-section');
    
    parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.05;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// RANDOM SPARKLES
// ============================================
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10001';
    sparkle.style.fontSize = '2rem';
    sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add CSS animation for sparkles
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-fade {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Create sparkles on random positions
setInterval(() => {
    if (Math.random() < 0.1) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createSparkle(x, y);
    }
}, 2000);

// ============================================
// CURSOR TRAIL EFFECT
// ============================================
const trail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (trail.length > trailLength) {
        trail.shift();
    }
});

function drawTrail() {
    const trailCanvas = document.createElement('canvas');
    trailCanvas.style.position = 'fixed';
    trailCanvas.style.top = '0';
    trailCanvas.style.left = '0';
    trailCanvas.style.width = '100%';
    trailCanvas.style.height = '100%';
    trailCanvas.style.pointerEvents = 'none';
    trailCanvas.style.zIndex = '9998';
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
    
    document.body.appendChild(trailCanvas);
    const trailCtx = trailCanvas.getContext('2d');
    
    function animate() {
        trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        
        const now = Date.now();
        trail.forEach((point, index) => {
            const age = now - point.time;
            const opacity = Math.max(0, 1 - age / 500);
            const size = (index / trail.length) * 5;
            
            trailCtx.fillStyle = `rgba(102, 126, 234, ${opacity * 0.3})`;
            trailCtx.beginPath();
            trailCtx.arc(point.x, point.y, size, 0, Math.PI * 2);
            trailCtx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

drawTrail();
