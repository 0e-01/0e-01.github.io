const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const eventText = document.getElementById('event-text');
const actionBtn = document.getElementById('actionBtn');
let painting = false;
let gameState = "start"; // start, adventure

// 冒險事件庫
const adventures = [
    { q: "【突發】前方草叢猛烈晃動，出現一頭劍齒虎！", a: "畫出【長矛】或【肉塊】來應對！" },
    { q: "【突發】天色瞬間變黑，暴雨將至...", a: "畫出【山洞】或【火把】避雨！" },
    { q: "【突發】你來到一條岩漿河流前...", a: "畫出【石橋】或【滑翔翼】飛過去！" },
    { q: "【突發】你遇到一群原始人，他們看起來很餓...", a: "畫出【烤肉】來贏得他們的友誼！" }
];

// --- 繪圖邏輯 ---
function startPosition(e) { painting = true; draw(e); }
function finishedPosition() { painting = false; ctx.beginPath(); }

function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2b1d12'; // 炭黑色

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); });
canvas.addEventListener('touchend', finishedPosition);
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// --- 遊戲流程 ---
function handleAction() {
    if (gameState === "start") {
        gameState = "adventure";
        triggerNewEvent();
    } else {
        // 模擬成功判定
        const feedback = ["幹得好！你成功過關了。", "真是精妙的工具，危機解除了！"];
        eventText.innerText = feedback[Math.floor(Math.random()*feedback.length)];
        actionBtn.innerText = "繼續前進...";
        gameState = "transition";
    } else if (gameState === "transition") {
        triggerNewEvent();
    }
}

function triggerNewEvent() {
    const ev = adventures[Math.floor(Math.random() * adventures.length)];
    eventText.innerHTML = `<span style="color:#ffa500">${ev.q}</span><br>${ev.a}`;
    actionBtn.innerText = "我畫好了！";
    gameState = "adventure";
    clearCanvas();
}
