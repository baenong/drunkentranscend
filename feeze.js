const btn = document.querySelector(".feeze-start");
const appearTimes = [1600, 7300, 7767, 13567, 13967];
const fadeTimes = [3100, 8800, 9267, 15067, 15467];
const perfectTimes = [2267, 7967, 8433, 14233, 14633];
const frames = [40, 40, 40, 40, 30];
let feezeState = false;
let startTime = 0;
let count = 1;

const getRand = (diff, stage) => {
  if (diff === "normal") max = 4;
  else max = 8;
  const randomNum = stage === 1 ? Math.floor(Math.random() * max) : 0;
  return ["q", "w", "e", "r", "a", "s", "d", "f"][randomNum];
};

const setFeeze = (stage, diff) => {
  const container = document.querySelector(`.container${stage}`);
  const circle = container.querySelector(".feeze-circle");
  const inputKey = container.querySelector(".feeze-button");
  inputKey.innerHTML = getRand(diff, stage).toUpperCase();
  circle.classList.add(`circle-${frames[stage - 1]}fr`);
  container.classList.remove("hidden");
};

const setFade = (stage) => {
  const container = document.querySelector(`.container${stage}`);
  container.classList.add("fade-out");
};

const convertFrameToMilli = (fr) => {
  return (50 * fr) / 3;
};

const setCircle = (n) => {
  setTimeout(() => {
    setFeeze(n, "normal");
  }, appearTimes[n - 1]);
  setTimeout(() => {
    console.log(`${n} fade out`);
    setFade(n);
  }, fadeTimes[n - 1]);
};

document.addEventListener("keydown", (e) => {
  console.log(e.key);
  // 격돌 시작
  if (!feezeState) {
    if (e.key === "g") {
      feezeState = true;
      startTime = Date.now();
      for (let cnt = 1; cnt < 6; cnt++) {
        setCircle(cnt);
        console.log(`${cnt} feeze set`);
      }
    }
  }

  if (count < 6 && e.key !== "g") {
    const temp = Date.now() - startTime;
    const li = document.createElement("li");
    const accuracy = document.querySelector(".accuracy");
    li.innerText = `${count}번째 입력시간 : ${temp} / 정확도 : ${Math.abs(
      perfectTimes[count - 1] - temp
    )}ms(${(Math.abs(perfectTimes[count - 1] - temp) * 3) / 50}frame)`;
    accuracy.appendChild(li);
    count++;
  }
});

btn.addEventListener("click", () => {
  location.reload();
});
