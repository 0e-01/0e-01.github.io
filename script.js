const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const eventText = document.getElementById('event-text');
const actionBtn = document.getElementById('actionBtn');

let painting = false;
let gameState = "start"; // 狀態：start, adventure, result

// 冒險事件庫
const adventures = [
    { q: "【突發】前方草叢猛烈晃動，出現一頭劍齒虎！", a: "畫出【長矛】或【肉塊】來應對！" },
    { q: "【突發】天色瞬間變黑，暴風雨將至...", a: "畫出【山洞】或【火把】避雨！" },
    { q: "【突發】你來到一條岩漿河流前...", a: "畫出【石橋】或【滑翔翼】飛過去！" },
    { q: "【突發】你遇到一群原始人，他們看起來很餓...", a: "畫出【大腿肉】來贏得他們的友誼！" }
];

// --- 修正後的畫畫功能 ---
function startPosition(e) {
    painting = true;
    draw(e);
}

function finishedPosition() {
    painting = false;
    ctx.beginPath(); // 重置路徑，避免連線
}

function draw(e) {
    if (!painting) return;

    // 取得畫布相對於視窗的位置
    const rect = canvas.getBoundingClientRect();
    
    // 計算滑鼠在畫布內的精確座標
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2b1d12'; // 炭炭的顏色

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// 滑鼠事件監聽
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mousemove', draw);
window.addEventListener('mouseup', finishedPosition);

// 觸控事件監聽
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startPosition(e); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
canvas.addEventListener('touchend', finishedPosition);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// --- 遊戲邏輯控制 ---
function handleAction() {
    if (gameState === "start") {
        // 第一步：畫完火柴人後開始
        gameState = "transition";
        triggerNewEvent();
    } 
    else if (gameState === "adventure") {
        // 第二步：畫完解決方案
        const feedback = ["幹得好！你成功過關了。", "真是精妙的工具，危機解除了！", "原始人們對你的畫作感到驚嘆。"];
        eventText.innerHTML = `<span style="color:#00ff00">✔ 成功！</span><br>${feedback[Math.floor(Math.random()*feedback.length)]}`;
        actionBtn.innerText = "繼續前進...";
        gameState = "result";
    } 
    else if (gameState === "result") {
        // 第三步：前往下一個事件
        triggerNewEvent();
    }
}

function triggerNewEvent() {
    clearCanvas();
    const ev = adventures[Math.floor(Math.random() * adventures.length)];
    eventText.innerHTML = `<span style="color:#ffa500">${ev.q}</span><br><br>${ev.a}`;
    actionBtn.innerText = "我畫好了！";
    gameState = "adventure";
}
