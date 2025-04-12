const soruListesi = [
  new Soru(
    "1- Üç elma ve iki armut toplanırsa kaç meyve elde edilir?",
    { a: "7", b: "8", c: "5", d: "12" },
    "c"
  ),
  new Soru(
    "2- Sekiz elma ve iki armut toplanırsa kaç meyve elde edilir?",
    { a: "10", b: "8", c: "5", d: "12" },
    "a"
  ),
  new Soru(
    "3- Üç elma ve beş armut toplanırsa kaç meyve elde edilir?",
    { a: "7", b: "8", c: "5", d: "12" },
    "b"
  ),
  new Soru(
    "4- Sekiz elma ve dört armut toplanırsa kaç meyve elde edilir?",
    { a: "7", b: "8", c: "5", d: "12" },
    "d"
  ),
];

const quiz = new Quiz(soruListesi);
const ui = new UI();

ui.btnStart.addEventListener("click", function () {
  startTimer(10);
  startTimerLine();
  ui.quizBox.classList.add("active");
  ui.buttonBox.classList.remove("active");
  ui.soruGoster(quiz.soruGetir());
  ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
  ui.btnNext.classList.remove("show");
});

ui.btnNext.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex) {
    startTimer(10);
    startTimerLine();
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    ui.btnNext.classList.remove("show");
  } else {
    ui.scoreBox.classList.add("active");
    ui.quizBox.classList.remove("active");
    ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
  }
});

ui.btnBack.addEventListener("click", function () {
  if (quiz.sorular.length != quiz.soruIndex) {
    ui.soruGoster(quiz.soruGotur());
    ui.soruSayisiniGoster(quiz.soruIndex, quiz.sorular.length);
    ui.btnBack.classList.remove("show");
  } else {
    ui.scoreBox.classList.add("active");
    ui.quizBox.classList.remove("active");
    ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length);
  }
});

function optionSelected(e) {
  clearInterval(counter);
  clearInterval(counterLine);

  let selectedElement = e.target;

  if (selectedElement.nodeName == "SPAN") {
    selectedElement = selectedElement.parentElement;
  }

  const cevap = e.target.textContent[0];
  const soru = quiz.soruGetir();

  if (soru.cevabiKontrolEt(cevap)) {
    quiz.dogruCevapSayisi += 1;
    selectedElement.addEventListener("click", () => {
      onayContainer.classList.remove("hidden");
    });
  } else {
    selectedElement.classList.add("incorrect");
  }

  // if (soru.cevabiKontrolEt(cevap)) {
  //   quiz.dogruCevapSayisi += 1;
  // } else {
  //   selectedElement.classList.add("incorrect");
  // }

  quiz.soruIndex += 1;
  ui.disableAllOption();
  ui.btnNext.classList.add("show");
  ui.btnBack.classList.add("show");
}

ui.btnQuit.addEventListener("click", function () {
  window.location.reload();
});

ui.btnReplay.addEventListener("click", function () {
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  ui.btnStart.click();
  ui.scoreBox.classList.remove("active");
});

let counter;
function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    ui.timeSecond.textContent = time;
    time--;

    if (time < 0) {
      clearInterval(counter);
      ui.timeText.textContent = "Süre Bitti";

      ui.disableAllOption();
      quiz.soruIndex += 1;

      ui.btnNext.classList.add("show");
    }
  }
}

let counterLine;
function startTimerLine() {
  let line_width = 0;

  counterLine = setInterval(timer, 20);

  function timer() {
    line_width += 1;

    ui.timeLine.style.width = line_width + "px";

    if (line_width > 349) {
      clearInterval(counterLine);
    }
  }
}
