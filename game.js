const CHARSETS = {
  10: "0123456789",
  16: "0123456789ABCDEF",
  36: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
};

const MODE_NAMES = {
  10: "10 進位",
  16: "16 進位",
  36: "36 進位"
};

const state = {
  mode: 10,
  length: 4,
  answer: "",
  attempts: 0,
  history: [],
  active: false
};

const $ = (id) => document.getElementById(id);

const setupPanel = $("setupPanel");
const gamePanel = $("gamePanel");
const modeButtons = [...document.querySelectorAll(".mode-btn")];

function generateAnswer(mode, length) {
  // Equivalent to the Python program's random.shuffle() approach:
  // choose distinct characters from the selected character set.
  const chars = [...CHARSETS[mode]];
  for (let i = chars.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.slice(0, length).join("");
}

function calculateAB(guess, answer) {
  let a = 0;
  let b = 0;

  for (let i = 0; i < guess.length; i++) {
    for (let j = 0; j < answer.length; j++) {
      if (guess[i] === answer[j]) {
        if (i === j) a++;
        else b++;
      }
    }
  }
  return { a, b };
}

function isValidGuess(value) {
  if (value.length !== state.length) {
    return `請輸入剛好 ${state.length} 個字元。`;
  }

  if (![...value].every(ch => CHARSETS[state.mode].includes(ch))) {
    return `只能使用：${CHARSETS[state.mode].split("").join(" ")}`;
  }

  const chars = [...value];
  if (new Set(chars).size !== chars.length) {
    return "不能有重複字元。";
  }

  return "";
}

function updateLengthLimit() {
  $("lengthInput").max = String(state.mode);
  $("lengthHint").textContent = `${MODE_NAMES[state.mode]}最多 ${state.mode} 位`;
  if (Number($("lengthInput").value) > state.mode) {
    $("lengthInput").value = state.mode;
  }
}

function selectMode(mode) {
  state.mode = Number(mode);
  modeButtons.forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.mode) === state.mode);
  });
  updateLengthLimit();
  $("setupError").textContent = "";
}

function scrollDown(el) {
  el.scrollTop = el.scrollHeight;
}

function renderHistory() {
  const list = $("historyList");

  if (state.history.length === 0) {
    list.innerHTML = '<div class="empty">還沒有猜測紀錄</div>';
    return;
  }

  list.innerHTML = state.history.map(item => `
    <div class="history-row">
      <div>
        <div class="guess">${item.guess}</div>
        <div class="score">${item.a}A ${item.b}B</div>
      </div>
      <span>#${item.number}</span>
    </div>
  `).join("");

  scrollDown(list);
}

function startGame() {
  const length = Number($("lengthInput").value);

  if (!Number.isInteger(length) || length < 1 || length > state.mode) {
    $("setupError").textContent = `位數必須介於 1 到 ${state.mode}。`;
    return;
  }

  state.length = length;
  state.answer = generateAnswer(state.mode, state.length);
  state.attempts = 0;
  state.history = [];
  state.active = true;

  setupPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");

  $("modeLabel").textContent = MODE_NAMES[state.mode];
  $("availableChars").textContent = CHARSETS[state.mode].split("").join(" ");
  $("availableHint").textContent = "尚未猜測";
  $("attemptCount").textContent = "0";
  $("guessInput").maxLength = String(state.length);
  $("guessInput").value = "";
  $("guessError").textContent = "";
  $("resultBox").classList.add("hidden");
  $("resultBox").classList.remove("lose");

  renderHistory();
  $("guessInput").focus();

  // Uncomment this line while debugging:
  // console.log("answer =", state.answer);
}

function finishGame(message, lose = false) {
  state.active = false;
  const box = $("resultBox");
  box.textContent = message;
  box.classList.toggle("lose", lose);
  box.classList.remove("hidden");
}

function submitGuess(event) {
  event.preventDefault();
  if (!state.active) return;

  const input = $("guessInput");
  const guess = input.value.trim().toUpperCase();
  const error = isValidGuess(guess);

  $("guessError").textContent = error;
  if (error) {
    input.focus();
    return;
  }

  const { a, b } = calculateAB(guess, state.answer);

  state.attempts++;
  state.history.push({
    guess,
    a,
    b,
    number: state.attempts
  });

  $("attemptCount").textContent = String(state.attempts);
  $("availableHint").textContent = `${a}A ${b}B`;
  renderHistory();
  input.value = "";

  if (a === state.length) {
    finishGame(`猜中了！答案是 ${state.answer}，總共猜了 ${state.attempts} 次。`);
  }

  input.focus();
}

function restart() {
  state.active = false;
  setupPanel.classList.remove("hidden");
  gamePanel.classList.add("hidden");
  $("setupError").textContent = "";
  $("guessError").textContent = "";
  $("resultBox").classList.add("hidden");
}

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => selectMode(btn.dataset.mode));
});

$("startBtn").addEventListener("click", startGame);
$("restartBtn").addEventListener("click", restart);
$("guessForm").addEventListener("submit", submitGuess);

$("clearHistoryBtn").addEventListener("click", () => {
  state.history = [];
  renderHistory();
});

$("lengthInput").addEventListener("input", () => {
  $("setupError").textContent = "";
});

selectMode(10);
