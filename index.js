// 第一步需要知道用户按的那个方向键 keydown按下时触发  keyup 弹起时触发
// 通过键盘事件获取编码 event.keyCode 不推荐
// 用key 直接返回按键的名字
// 用switch判断简单
// 第二步获取蛇容器然后获取各个部分在获取蛇头 让蛇头自身+10px
// 让蛇持续移动 加定时器解决
// 食物 判断食物与蛇头的坐标碰到一起没 食物的坐标应在0-290之间
const snake = document.getElementById("snake");
const snakes = snake.getElementsByTagName("div");
const food = document.querySelector("#food");
const scoreSpan = document.getElementById("score");
const leSpan = document.getElementById("level");
// 创建分值
let score = 0;
let level = 0;
function changFood() {
  // 生成0-29之间的随机数在 *10 向下取整0-28 但是我要0到29 所以要到30
  const x = Math.floor(Math.random() * 30) * 10;
  const y = Math.floor(Math.random() * 30) * 10;
  // 设置食物的坐标
  food.style.left = x + "px";
  food.style.top = y + "px";
}
// 定义一个变量用来存储蛇的移动的方向
let dir;
// 创建一个变量来记录按键的状态
let keyActive = true;
/*
                绑定按键事件keydown keyup
                    - 键盘事件只能绑定给可以获取焦点的元素或者是document
            */
const keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
const reObj = {
  ArrowUp: "ArrowDown",
  ArrowDown: "ArrowUp",
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft",
};
document.addEventListener("keydown", (event) => {
  if (keyActive && keyArr.includes(event.key)) {
    if (snakes.length < 2 || reObj[dir] !== event.key) {
      dir = event.key;
      keyActive = false;
    }
  }
});
setTimeout(function move() {
  // 获取蛇头
  const head = snakes[0];
  // 获取蛇头坐标
  let x = head.offsetLeft;
  let y = head.offsetTop;
  switch (dir) {
    case "ArrowUp":
      y -= 10;
      break;
    case "ArrowDown":
      y += 10;
      break;
    case "ArrowLeft":
      x -= 10;
      break;
    case "ArrowRight":
      // 向右移动蛇
      x += 10;
      break;
  }
  //  检查蛇是否吃到食物
  if (
    head.offsetTop === food.offsetTop &&
    head.offsetLeft === food.offsetLeft
  ) {
    changFood();
    snake.insertAdjacentHTML("beforeend", "<div/>");
    score++;
    scoreSpan.textContent = score;
    //  检查等级 
    if (score % 2 === 0 && level < 14) {
      level++;
      leSpan.textContent = level + 2;
    }
  }
  //  游戏结束 判断是否撞墙
  // if (x < 0 || x > 290 || y < 0 || y > 290) {
  //   alert("游戏结束");
  //   return;
  // }
  // 游戏结束 判断是否撞到自己
  for (let i = 0; i < snakes.length - 1; i++) {
    if (snakes[i].offsetLeft === x && snakes[i].offsetTop === y) {
      alert("游戏结束");
      return;
    }
  }
  //  移动蛇的尾巴
  const tail = snakes[snakes.length - 1];
  tail.style.left = x + "px";
  tail.style.top = y + "px";
  // 将尾巴移动到蛇头的位置
  snake.insertAdjacentElement("afterbegin", tail);
    keyActive = true;
  setTimeout(move, 300-level*20);
}, 300);
