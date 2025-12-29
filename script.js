let money = Number(localStorage.getItem("money")) || 30;
updateMoney();

const foodMessages = {
  pineapple: [
    "鳳梨酸酸甜甜，好清爽！"
  ],
  noodle: [
    "鐵板麵香氣逼人，太罪惡了！"
  ],
  takoyaki: [
    "這簡直是章魚燒界的登峰造極！"
  ],
  sprite: [
    "雪碧一喝，整個人都醒了！"
  ],
  tiramisu: [
    "這個提拉米蘇簡直讚不絕口！"
  ],
  dumpling: [
    "這個水餃志在必得，太好吃了！"
  ]
};

function updateMoney() {
  document.getElementById("money").innerText = money;
  localStorage.setItem("money", money);
}

function feed(price, type) {
  if (money >= price) {
    money -= price;
    updateMoney();

    const msgs = foodMessages[type];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    alert(msg);
  } else {
    alert("錢不夠了，快去玩遊戲！");
  }
}

function changeClothes(type) {
  const pet = document.getElementById("pet");
  pet.className = "pet " + type;
}

function openGame() {
  window.location.href = "game.html";
}
