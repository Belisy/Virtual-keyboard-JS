import "../css/style.css";

const $container = document.querySelector(".container");
const $btnToggle = $container.querySelector(".btn-toggle");
const $toggleOn = $container.querySelector(".toggle_on");
const $toggleOff = $container.querySelector(".toggle_off");
const $font = document.getElementById("font");
const $inputGroup = $container.querySelector(".input-group");
const $keyboard = $container.querySelector(".keyboard");
const $textInput = $inputGroup.querySelector(".text-input");
let keyboard = false;
let mouse = false;

const darkTheme = () => {
  if ($toggleOff.style.display === "none") {
    // 다크모드가 아닐 때, 다크모드로 전환
    $toggleOff.style.display = "inline";
    $toggleOn.style.display = "none";
    document.documentElement.setAttribute("color-theme", "dark");
  } else {
    // 다크모드일 때, 일반모드로 전환
    $toggleOff.style.display = "none";
    $toggleOn.style.display = "inline";
    document.documentElement.setAttribute("color-theme", "light");
  }
};
$btnToggle.addEventListener("click", darkTheme);

// select-option 폰트 선택
$font.addEventListener("change", (e) => {
  document.body.style.fontFamily = `${e.target.value}`;
});

// keydown
document.addEventListener("keydown", (e) => {
  if (mouse) return;
  keyboard = true;
  // 한글입력시 에러메세지(현 노트북에서는 한글정규표현식방식은 안먹히고, "Process"로 해야 됨)
  $inputGroup.classList.toggle("error", e.key.includes("Process"));
  // 키보드 입력시 색 진하게
  console.log(e.code);
  $keyboard.querySelector(`[data-code=${e.code}]`)?.classList.add("active");
});
// keyup

document.addEventListener("keyup", (e) => {
  if (mouse) return;
  keyboard = false;
  $keyboard.querySelector(`[data-code=${e.code}]`)?.classList.remove("active");
});
// 한글입력 못하게
$textInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
});

// 마우스 입력
// mousedown
$keyboard.addEventListener("mousedown", (e) => {
  if (keyboard) return;
  mouse = true;
  e.target.closest("div.key")?.classList.add("active");
});
// mouseup - mouseup했을 때 입력
document.addEventListener("mouseup", (e) => {
  if (keyboard) return;
  mouse = false;
  const key = e.target.closest("div.key");
  const isActive = !!key?.classList.contains("active");
  const val = key?.dataset.val;
  if (isActive && !!val && val !== "Space" && val !== "Backspace") {
    $textInput.value += val;
  }
  if (val === "Space") {
    $textInput.value += " ";
  }
  if (val === "Backspace") {
    $textInput.value = $textInput.value.slice(0, -1);
  }
  $keyboard.querySelector(".active")?.classList.remove("active");
});

$keyboard.addEventListener("mouseup", () => {
  $textInput.focus();
});
