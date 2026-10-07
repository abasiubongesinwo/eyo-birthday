/* =========================================================
   EYO BIRTHDAY PROTOCOL
   JAVASCRIPT
========================================================= */

const $ = (selector) => document.querySelector(selector);

/* =========================================================
   SCENES
========================================================= */

const hackerScene = $("#scene-hacker");
const decryptScene = $("#scene-decrypt");
const revealScene = $("#scene-reveal");

function switchScene(from, to) {
	from.classList.remove("active");

	setTimeout(() => {
		to.classList.add("active");
	}, 300);
}

/* =========================================================
   MUSIC
========================================================= */

const bgMusic = $("#bg-music");
const musicToggle = $("#music-toggle");

let musicPlaying = false;

function startMusic() {
	bgMusic.volume = 0.45;

	bgMusic
		.play()
		.then(() => {
			musicPlaying = true;
			musicToggle.classList.remove("hidden");
		})
		.catch(() => {
			console.log("Browser blocked autoplay.");
		});
}

musicToggle.addEventListener("click", () => {
	if (musicPlaying) {
		bgMusic.pause();
		musicPlaying = false;
	} else {
		bgMusic
			.play()
			.then(() => {
				musicPlaying = true;
			})
			.catch(console.error);
	}

	musicToggle.classList.toggle("muted", !musicPlaying);
});

/* =========================================================
   TERMINAL CLOCK
========================================================= */

function updateClock() {
	const now = new Date();

	const h = String(now.getHours()).padStart(2, "0");
	const m = String(now.getMinutes()).padStart(2, "0");
	const s = String(now.getSeconds()).padStart(2, "0");

	$("#terminal-time").textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();

/* =========================================================
   HACKER BOOT
========================================================= */

const hackerLines = [
	"[BOOT] Initializing birthday protocol...",
	"[AUTH] Establishing encrypted connection...",
	"[SCAN] Searching classified database...",
	"[SCAN] Subject detected: EYO",
	"[AI] Measuring legendary status...",
	"[RESULT] LEGENDARY STATUS: 100%",
	"[SYSTEM] Birthday sequence ready.",
];

const hackerText = $("#hacker-text");
const bootProgress = $("#boot-progress");
const bootPercent = $("#boot-percent");
const startBtn = $("#start-btn");

let bootStarted = false;

async function typeLine(text) {
	const line = document.createElement("div");
	hackerText.appendChild(line);

	for (const character of text) {
		line.textContent += character;

		await new Promise((resolve) => setTimeout(resolve, 10));
	}
}

async function runBootSequence() {
	for (let i = 0; i < hackerLines.length; i++) {
		await typeLine(hackerLines[i]);

		const percent = Math.round(((i + 1) / hackerLines.length) * 100);

		bootProgress.style.width = `${percent}%`;
		bootPercent.textContent = `${percent}%`;

		await new Promise((resolve) => setTimeout(resolve, 250));
	}
}

startBtn.addEventListener("click", async () => {
	if (bootStarted) return;

	bootStarted = true;

	startBtn.disabled = true;
	startBtn.innerHTML = "⚡ INITIALIZING...";

	startMusic();

	await runBootSequence();

	await new Promise((resolve) => setTimeout(resolve, 900));

	switchScene(hackerScene, decryptScene);

	startDecryption();
});

/* =========================================================
   DECRYPTION
========================================================= */

const progressBar = $("#progress-bar");
const decryptPercent = $("#decrypt-percent");
const decryptLines = $("#decrypt-lines");
const accessBtn = $("#access-btn");

const decryptMessages = [
	">> BIOMETRIC SCAN INITIATED",
	">> NAME: EYO",
	">> CLASSIFICATION: LEGEND",
	">> AWESOMENESS: OVER 9000",
	">> BIRTHDAY STATUS: CONFIRMED",
	">> FILE DECRYPTED SUCCESSFULLY",
];

let decryptStarted = false;

async function startDecryption() {
	if (decryptStarted) return;

	decryptStarted = true;

	let progress = 0;

	const progressTimer = setInterval(() => {
		progress += Math.random() * 3 + 1;

		if (progress >= 100) {
			progress = 100;

			clearInterval(progressTimer);

			setTimeout(() => {
				accessBtn.classList.remove("hidden");
			}, 700);
		}

		progressBar.style.width = `${progress}%`;
		decryptPercent.textContent = `${Math.floor(progress)}%`;
	}, 80);

	for (const message of decryptMessages) {
		await new Promise((resolve) => setTimeout(resolve, 700));

		const line = document.createElement("div");

		line.textContent = message;

		decryptLines.appendChild(line);
	}
}

/* =========================================================
   ENTER REVEAL
========================================================= */

accessBtn.addEventListener("click", () => {
	switchScene(decryptScene, revealScene);

	startBirthdayReveal();
});

/* =========================================================
   BIRTHDAY NAME TYPING
========================================================= */

function typeName() {
	const element = $("#typing-name");

	const text = "EYO • THE LEGEND";

	let index = 0;

	element.textContent = "";

	const interval = setInterval(() => {
		element.textContent += text[index];

		index++;

		if (index >= text.length) {
			clearInterval(interval);
		}
	}, 90);
}

/* =========================================================
   PARTY ANIMATION
========================================================= */

let partyStarted = false;

function startBirthdayReveal() {
	if (partyStarted) return;

	partyStarted = true;

	setTimeout(typeName, 2500);

	initParticles();
	initConfetti();
}

/* =========================================================
   PARTICLES
========================================================= */

function initParticles() {
	const canvas = $("#particle-canvas");
	const ctx = canvas.getContext("2d");

	let width;
	let height;

	const particles = [];

	function resize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
	}

	resize();

	window.addEventListener("resize", resize);

	const count = window.innerWidth < 600 ? 45 : 90;

	for (let i = 0; i < count; i++) {
		particles.push({
			x: Math.random() * width,
			y: Math.random() * height,

			radius: Math.random() * 2 + 0.4,

			speedX: (Math.random() - 0.5) * 0.4,
			speedY: (Math.random() - 0.5) * 0.4,

			alpha: Math.random() * 0.6 + 0.1,

			pulse: Math.random() * 0.02 + 0.005,
		});
	}

	function animate() {
		ctx.clearRect(0, 0, width, height);

		particles.forEach((p) => {
			p.x += p.speedX;
			p.y += p.speedY;

			if (p.x < 0) p.x = width;
			if (p.x > width) p.x = 0;

			if (p.y < 0) p.y = height;
			if (p.y > height) p.y = 0;

			p.alpha += p.pulse;

			if (p.alpha > 0.8 || p.alpha < 0.1) {
				p.pulse *= -1;
			}

			ctx.beginPath();

			ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

			ctx.fillStyle = `rgba(0,255,102,${p.alpha})`;

			ctx.shadowBlur = 12;
			ctx.shadowColor = "#00ff66";

			ctx.fill();

			ctx.shadowBlur = 0;
		});

		requestAnimationFrame(animate);
	}

	animate();
}

/* =========================================================
   CONFETTI
========================================================= */

function initConfetti() {
	const canvas = $("#confetti-canvas");
	const ctx = canvas.getContext("2d");

	let width;
	let height;

	const colors = [
		"#FFD21F",
		"#00FF66",
		"#FFFFFF",
		"#FF5C00",
		"#FF1744",
		"#00BFFF",
	];

	const pieces = [];

	function resize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
	}

	resize();

	window.addEventListener("resize", resize);

	const count = window.innerWidth < 600 ? 90 : 180;

	for (let i = 0; i < count; i++) {
		pieces.push(createPiece(true));
	}

	function createPiece(initial = false) {
		return {
			x: Math.random() * width,

			y: initial ? Math.random() * height : -20,

			size: Math.random() * 8 + 3,

			speedY: Math.random() * 2.5 + 1.5,

			speedX: Math.random() * 1.5 - 0.75,

			rotation: Math.random() * 360,

			rotationSpeed: Math.random() * 5 - 2.5,

			color: colors[Math.floor(Math.random() * colors.length)],

			opacity: Math.random() * 0.7 + 0.3,
		};
	}

	function animate() {
		ctx.clearRect(0, 0, width, height);

		pieces.forEach((piece, index) => {
			piece.y += piece.speedY;
			piece.x += piece.speedX;
			piece.rotation += piece.rotationSpeed;

			if (piece.y > height + 20) {
				pieces[index] = createPiece(false);
			}

			ctx.save();

			ctx.translate(piece.x, piece.y);

			ctx.rotate((piece.rotation * Math.PI) / 180);

			ctx.globalAlpha = piece.opacity;

			ctx.fillStyle = piece.color;

			ctx.fillRect(
				-piece.size / 2,
				-piece.size / 2,
				piece.size,
				piece.size * 0.6,
			);

			ctx.restore();
		});

		requestAnimationFrame(animate);
	}

	animate();
}

/* =========================================================
   COPY ACCOUNT
========================================================= */

const copyButton = $("#copy-acct-btn");

copyButton.addEventListener("click", async () => {
	const account = $("#acct-num").textContent.trim();

	try {
		await navigator.clipboard.writeText(account);

		const original = copyButton.innerHTML;

		copyButton.innerHTML = "✓ ACCOUNT NUMBER COPIED";

		copyButton.style.background = "#00ff66";

		copyButton.style.color = "#000";

		setTimeout(() => {
			copyButton.innerHTML = original;

			copyButton.style.background = "";

			copyButton.style.color = "";
		}, 2200);
	} catch {
		alert(`Copy failed. Account number: ${account}`);
	}
});

/* =========================================================
   SHARE
========================================================= */

$("#share-btn").addEventListener("click", async () => {
	const shareData = {
		title: "Happy Birthday Eyo 🎂",
		text: "Eyo's birthday protocol has been activated! 🎂🔥",
		url: window.location.href,
	};

	try {
		if (navigator.share) {
			await navigator.share(shareData);
		} else {
			await navigator.clipboard.writeText(window.location.href);

			showToast("Birthday link copied! 🎉");
		}
	} catch (error) {
		if (error.name !== "AbortError") {
			console.log(error);
		}
	}
});

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
	const toast = document.createElement("div");

	toast.textContent = message;

	Object.assign(toast.style, {
		position: "fixed",
		left: "50%",
		bottom: "30px",
		transform: "translateX(-50%)",

		zIndex: "9999",

		padding: "13px 20px",

		background: "#00ff66",
		color: "#000",

		borderRadius: "30px",

		fontFamily: "Share Tech Mono, monospace",
		fontSize: "11px",

		boxShadow: "0 10px 40px rgba(0,255,102,.25)",
	});

	document.body.appendChild(toast);

	setTimeout(() => {
		toast.style.opacity = "0";
		toast.style.transition = ".4s";

		setTimeout(() => {
			toast.remove();
		}, 400);
	}, 2200);
}
