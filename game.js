const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const titleScreen = document.getElementById("titleScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");

const messageEl = document.getElementById("message");
const choicesEl = document.getElementById("choices");

const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const bg = new Image();
bg.src = "pokimi_background.png";

const faces = {
  normal:"pokimi_normal.png",
  smile:"pokimi_smile.png",
  shy:"pokimi_shy.png",
  confused:"pokimi_confused.png",
  surprised:"pokimi_surprised.png",
  sad:"pokimi_sad.png"
};

const faceImages = {};

for(const key in faces){
  const img = new Image();
  img.src = faces[key];
  faceImages[key] = img;
}

const scenes = [
  {
    face:"smile",
    text:`ねぇ…

きゅうりって、
折るとちょっと嬉しくない？`,
    choices:[
      { text:"▶ わかる", empathy:2 },
      { text:"▶ 食べる方が好き", tsukkomi:1 },
      { text:"▶ 急にどうしたの？", tsukkomi:2, caution:1 }
    ]
  },
  {
    face:"normal",
    text:`…きゅうりのこと、
ちゃんと見てる？`,
    choices:[
      { text:"▶ 見てる", empathy:2 },
      { text:"▶ たまに見る", tsukkomi:1 },
      { text:"▶ そこまで見ない", caution:1 }
    ]
  },
  {
    face:"shy",
    text:`きゅうりって、
夏の音がするんだよ。`,
    choices:[
      { text:"▶ ちょっとわかる", empathy:2 },
      { text:"▶ しないと思う", caution:2 },
      { text:"▶ ポエム？", tsukkomi:2 }
    ]
  },
  {
    face:"confused",
    text:`…え？
今、笑った？`,
    choices:[
      { text:"▶ 笑ってない", empathy:1 },
      { text:"▶ ごめん少し", tsukkomi:1 },
      { text:"▶ ちょっとだけ", caution:1 }
    ]
  },
  {
    face:"surprised",
    text:`ポキッ…！

今の音、
かなり良かった…`,
    choices:[
      { text:"▶ そんなに？", tsukkomi:2 },
      { text:"▶ いい音だった", empathy:2 },
      { text:"▶ 怖いよ", caution:2 }
    ]
  },
  {
    face:"normal",
    text:`…君って、
変わってるね。`,
    choices:[
      { text:"▶ ポキ美ほどじゃない", tsukkomi:2 },
      { text:"▶ そうかな", empathy:1 },
      { text:"▶ よく言われる", caution:1 }
    ]
  }
];

let sceneIndex = 0;

let empathy = 0;
let tsukkomi = 0;
let caution = 0;

let typing = false;
let typingTimer = null;
let fullText = "";
let displayedText = "";
let typeIndex = 0;

let currentFace = "normal";

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", () => {
  resizeCanvas();

  if(gameScreen.classList.contains("active")){
    drawScene();
  }
});

function drawCoverImage(img){
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.width;
  const ih = img.height;

  if(!iw || !ih) return;

  const scale = Math.max(cw / iw, ch / ih);
  const sw = cw / scale;
  const sh = ch / scale;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;

  ctx.drawImage(
    img,
    sx,
    sy,
    sw,
    sh,
    0,
    0,
    cw,
    ch
  );
}

function drawScene(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(bg.complete){
    drawCoverImage(bg);
  }

  const face = faceImages[currentFace];

  if(!face || !face.complete) return;

  const size = canvas.width * 0.60;

  const graphicAreaHeight = canvas.height * 0.52;

  const drawX = (canvas.width - size) / 2;

  const drawY = graphicAreaHeight - size + 40;

  ctx.drawImage(
    face,
    drawX,
    drawY,
    size,
    size
  );
}

function typeText(text){
  fullText = text;
  displayedText = "";
  typeIndex = 0;
  typing = true;

  messageEl.innerHTML = "";
  choicesEl.innerHTML = "";

  clearInterval(typingTimer);

  typingTimer = setInterval(() => {
    displayedText += fullText[typeIndex];

    messageEl.innerHTML =
      displayedText.replace(/\n/g,"<br>");

    typeIndex++;

    if(typeIndex >= fullText.length){
      clearInterval(typingTimer);
      typing = false;
      showChoices();
    }
  },35);
}

function finishTyping(){
  if(!typing) return;

  clearInterval(typingTimer);

  typing = false;

  messageEl.innerHTML =
    fullText.replace(/\n/g,"<br>");

  showChoices();
}

function showChoices(){
  const scene = scenes[sceneIndex];

  choicesEl.innerHTML = "";

  scene.choices.forEach(choice => {
    const btn = document.createElement("button");

    btn.className = "choiceBtn";
    btn.innerText = choice.text;

    btn.onclick = () => {
      empathy += choice.empathy || 0;
      tsukkomi += choice.tsukkomi || 0;
      caution += choice.caution || 0;

      nextScene();
    };

    choicesEl.appendChild(btn);
  });
}

function nextScene(){
  sceneIndex++;

  if(sceneIndex >= scenes.length){
    endGame();
    return;
  }

  loadScene();
}

function loadScene(){
  const scene = scenes[sceneIndex];

  currentFace = scene.face;

  drawScene();

  typeText(scene.text);
}

function endGame(){
  gameScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const success =
    empathy >= 3 &&
    empathy <= 7 &&
    tsukkomi >= 2 &&
    caution <= 3;

  if(success){
    resultTitle.innerText = "ちょっと仲良くなれた";
    resultMessage.innerHTML =
      `…また、<br>
       放課後に話せる気がした。`;
  }else{
    resultTitle.innerText = "まだポキれない";
    resultMessage.innerHTML =
      `きゅうりは、<br>
       思ったより難しかった。`;
  }
}

startBtn.onclick = () => {
  titleScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  gameScreen.classList.add("active");

  sceneIndex = 0;

  empathy = 0;
  tsukkomi = 0;
  caution = 0;

  loadScene();
};

retryBtn.onclick = () => {
  resultScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  titleScreen.classList.add("active");
};

messageEl.addEventListener("click", finishTyping);
canvas.addEventListener("click", finishTyping);

bg.onload = drawScene;

for(const key in faceImages){
  faceImages[key].onload = () => {
    if(gameScreen.classList.contains("active")){
      drawScene();
    }
  };
}