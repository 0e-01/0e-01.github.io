let money = Number(localStorage.getItem("money")) || 30;
updateMoney();

const foodMessages = {
  pineapple: ["鳳梨酸甜剛剛好～"],
  noodle: ["鐵板麵香氣四溢！"],
  takoyaki: ["這簡直是章魚燒界的登峰造極！"],
  sprite: ["雪碧喝下去超爽！"],
  tiramisu: ["這個提拉米蘇簡直讚不絕口！"],
  dumpling: ["這個水餃志在必得，太好吃了！"]
};

function updateMoney() {
  document.getElementById("money").innerText = money;
  localStorage.setItem("money", money);
}

function feed(price, type) {
  if (money >= price) {
    money -= price;
    updateMoney();
    const msg = foodMessages[type][0];
    alert(msg);
  } else {
    alert("錢不夠，快去玩遊戲！");
  }
}

function changeClothes(type) {
  document.getElementById("pet").className = "pet " + type;
}

function openGame() {
  window.location.href = "game.html";
}
