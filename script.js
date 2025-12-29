let money = Number(localStorage.getItem("money")) || 30;
updateMoney();

function updateMoney() {
  document.getElementById("money").innerText = money;
  localStorage.setItem("money", money);
}

function feed(price) {
  if (money >= price) {
    money -= price;
    updateMoney();
    alert("天線寶寶吃得很開心 😊");
  } else {
    alert("錢不夠，快去玩遊戲！");
  }
}

function changeClothes(type) {
  const pet = document.getElementById("pet");
  pet.className = "pet " + type;
}

function openGame() {
  window.location.href = "game.html";
}
