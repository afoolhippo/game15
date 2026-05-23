const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const titleScreen = document.getElementById("titleScreen");
const selectScreen = document.getElementById("selectScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const titleImage = document.getElementById("titleImage");
const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");
const backTitleBtn = document.getElementById("backTitleBtn");
const shareBtn = document.getElementById("shareBtn");
const homeBtn = document.getElementById("homeBtn");

const charButtons = document.querySelectorAll(".charBtn");

const messageEl = document.getElementById("message");
const choicesEl = document.getElementById("choices");
const nameBox = document.getElementById("nameBox");

const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const resultBg = document.getElementById("resultBg");
const resultCharacter = document.getElementById("resultCharacter");

const GAME_TITLE = "放課後カバメモリアル";
const GAME_URL = "https://afoolhippo.github.io/game15/";
const HOME_URL = "https://afoolhippo.github.io/home/?skipTitle=1";

const characterData = {
  pokimi:{
    name:"ポキ美",
    place:"放課後に",
    emoji:"🥒",
    background:"pokimi_background.png",
    faces:{
      normal:"pokimi_normal.png",
      smile:"pokimi_smile.png",
      shy:"pokimi_shy.png",
      confused:"pokimi_confused.png",
      surprised:"pokimi_surprised.png",
      sad:"pokimi_sad.png"
    },
    goodTitle:"ちょっと\n仲良くなれた",
    goodMessage:"…また、<br>放課後に話せる気がした。",
    badTitle:"ポキッとは、\nいかなかった",
    badMessage:"きゅうりは、<br>思ったより難しかった。",
    success:(e,t,c)=> e>=3 && e<=7 && t>=2 && c<=3,
    scenes:[
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
    ]
  },

  nasuko:{
    name:"ナス子",
    place:"河川敷で",
    emoji:"🍆",
    background:"nasuko_background.png",
    faces:{
      normal:"nasuko_normal.png",
      smile:"nasuko_smile.png",
      shy:"nasuko_shy.png",
      confused:"nasuko_confused.png",
      surprised:"nasuko_surprised.png",
      sad:"nasuko_sad.png"
    },
    goodTitle:"ちょっと\n焼けてきた",
    goodMessage:"また今度、<br>河川敷で話そうぜ！",
    badTitle:"まだ、生っぽい",
    badMessage:"ナスは、<br>じっくり焼かないとダメらしい。",
    success:(e,t,c)=> e>=4 && e<=8 && t>=2 && c<=3,
    scenes:[
      {
        face:"smile",
        text:`焼きナスってさ！

皮まっくろになってからが
本番なんだよ！`,
        choices:[
          { text:"▶ わかる、あそこ大事", empathy:2 },
          { text:"▶ ちょっと焦げすぎじゃない？", tsukkomi:2 },
          { text:"▶ そんな熱量で話す？", caution:1 }
        ]
      },
      {
        face:"normal",
        text:`ナスって、
夏のボス野菜だと思うんだよね。`,
        choices:[
          { text:"▶ 強そうではある", empathy:2 },
          { text:"▶ きゅうりの方が速そう", tsukkomi:1 },
          { text:"▶ ボス野菜ってなに？", caution:1 }
        ]
      },
      {
        face:"surprised",
        text:`えっ！？

焼きナス、
皮むいてから焼く派！？`,
        choices:[
          { text:"▶ え、ダメなの？", tsukkomi:1 },
          { text:"▶ 焼いてから派かも", empathy:2 },
          { text:"▶ 怖…", caution:2 }
        ]
      },
      {
        face:"shy",
        text:`…いや、
でもナスって、
ちょっとかわいいよね。`,
        choices:[
          { text:"▶ 丸っこいしね", empathy:2 },
          { text:"▶ 急にかわいい方向？", tsukkomi:2 },
          { text:"▶ 野菜だよ？", caution:1 }
        ]
      },
      {
        face:"confused",
        text:`え？

焼きナスに
しょうが乗せないの？`,
        choices:[
          { text:"▶ 乗せる！", empathy:2 },
          { text:"▶ かつお節派", tsukkomi:1 },
          { text:"▶ そこまで考えたことない", caution:1 }
        ]
      },
      {
        face:"normal",
        text:`…君、
けっこう夏向きだね！`,
        choices:[
          { text:"▶ ナス子ほどじゃない", tsukkomi:2 },
          { text:"▶ 暑いの苦手だけどね", empathy:1 },
          { text:"▶ 夏向きってなに？", caution:1 }
        ]
      }
    ]
  },

  migaki:{
    name:"ミガキ",
    place:"保健室で",
    emoji:"🪥",
    background:"migaki_background.png",
    faces:{
      normal:"migaki_normal.png",
      smile:"migaki_smile.png",
      shy:"migaki_shy.png",
      confused:"migaki_confused.png",
      surprised:"migaki_surprised.png",
      sad:"migaki_sad.png"
    },
    goodTitle:"ちょっと\n磨けてきた",
    goodMessage:"また、<br>保健室で話そうね。",
    badTitle:"まだ、\n磨き残しがある",
    badMessage:"歯みがきって、<br>思ったより難しい。",
    success:(e,t,c)=> e>=3 && e<=7 && t>=1 && t<=4 && c<=3,
    scenes:[
      {
        face:"smile",
        text:`歯みがき粉って、
最後の方ちょっと苦くなるよね。`,
        choices:[
          { text:"▶ わかる", empathy:2 },
          { text:"▶ そんなことある？", tsukkomi:1 },
          { text:"▶ 急にどうしたの？", caution:1 }
        ]
      },
      {
        face:"normal",
        text:`保健室って、
ちょっと静かすぎるよね。`,
        choices:[
          { text:"▶ 落ち着くけどね", empathy:1 },
          { text:"▶ 寝そうになる", tsukkomi:1 },
          { text:"▶ ちょっと怖い", caution:1 }
        ]
      },
      {
        face:"surprised",
        text:`えっ！？

歯ブラシ、
濡らしてから使う派！？`,
        choices:[
          { text:"▶ ダメなの？", tsukkomi:1 },
          { text:"▶ そのまま派かも", empathy:2 },
          { text:"▶ そこ気にするんだ…", caution:1 }
        ]
      },
      {
        face:"shy",
        text:`…歯みがきのあと、
冷たい水飲むの好きなんだ。`,
        choices:[
          { text:"▶ あれ気持ちいいよね", empathy:2 },
          { text:"▶ わりと分かる", empathy:1 },
          { text:"▶ そこまで考えたことない", caution:1 }
        ]
      },
      {
        face:"confused",
        text:`え…

夜、
磨かない日とかあるの？`,
        choices:[
          { text:"▶ たまにあるかも", tsukkomi:1 },
          { text:"▶ 毎日磨いてるよ", empathy:2 },
          { text:"▶ そんな顔しなくても…", caution:1 }
        ]
      },
      {
        face:"shy",
        text:`…君、
ちゃんとしてるね。`,
        choices:[
          { text:"▶ ミガキほどじゃないよ", tsukkomi:2 },
          { text:"▶ そうかな", empathy:1 },
          { text:"▶ 急に褒めるね", caution:1 }
        ]
      }
    ]
  }
};

let currentCharacter = null;
let currentFace = "normal";

let faceImages = {};
let bg = new Image();

let sceneIndex = 0;
let empathy = 0;
let tsukkomi = 0;
let caution = 0;
let lastSuccess = false;

let typing = false;
let typingTimer = null;
let fullText = "";
let displayedText = "";
let typeIndex = 0;

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize",()=>{
  resizeCanvas();

  if(gameScreen.classList.contains("active")){
    drawScene();
  }
});

function showScreen(screen){
  titleScreen.classList.remove("active");
  selectScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  resultScreen.classList.remove("active");

  screen.classList.add("active");
}

function resetText(){
  clearInterval(typingTimer);
  typing = false;
  messageEl.innerHTML = "";
  choicesEl.innerHTML = "";
}

function loadCharacter(key){
  currentCharacter = characterData[key];
  currentFace = "normal";

  resultBg.src = currentCharacter.background;

  bg = new Image();
  bg.src = currentCharacter.background;
  bg.onload = ()=>{
    if(gameScreen.classList.contains("active")){
      drawScene();
    }
  };

  faceImages = {};

  for(const faceKey in currentCharacter.faces){
    const img = new Image();
    img.src = currentCharacter.faces[faceKey];

    img.onload = ()=>{
      if(gameScreen.classList.contains("active")){
        drawScene();
      }
    };

    faceImages[faceKey] = img;
  }
}

function drawScene(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const graphicAreaHeight = canvas.height * 0.52;

  if(bg.complete && bg.naturalWidth > 0){
    ctx.drawImage(
      bg,
      0,
      0,
      bg.naturalWidth,
      bg.naturalHeight,
      0,
      0,
      canvas.width,
      graphicAreaHeight
    );
  }

  const face = faceImages[currentFace];

  if(!face || !face.complete || face.naturalWidth === 0){
    return;
  }

  const size = canvas.width * 0.60;
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

  typingTimer = setInterval(()=>{
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
  const scene = currentCharacter.scenes[sceneIndex];

  choicesEl.innerHTML = "";

  scene.choices.forEach(choice=>{
    const btn = document.createElement("button");

    btn.className = "choiceBtn";
    btn.innerText = choice.text;

    btn.onclick = ()=>{
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

  if(sceneIndex >= currentCharacter.scenes.length){
    endGame();
    return;
  }

  loadScene();
}

function loadScene(){
  const scene = currentCharacter.scenes[sceneIndex];

  currentFace = scene.face;
  nameBox.innerText = currentCharacter.name;

  drawScene();
  typeText(scene.text);
}

function startCharacter(key){
  loadCharacter(key);

  sceneIndex = 0;
  empathy = 0;
  tsukkomi = 0;
  caution = 0;
  lastSuccess = false;

  resetText();

  showScreen(gameScreen);
  loadScene();
}

function endGame(){
  resetText();

  lastSuccess =
    currentCharacter.success(
      empathy,
      tsukkomi,
      caution
    );

  showScreen(resultScreen);

  if(lastSuccess){
    resultTitle.innerHTML =
      currentCharacter.goodTitle.replace(/\n/g,"<br>");

    resultMessage.innerHTML =
      currentCharacter.goodMessage;

    resultCharacter.src =
      currentCharacter.faces.smile;
  }else{
    resultTitle.innerHTML =
      currentCharacter.badTitle.replace(/\n/g,"<br>");

    resultMessage.innerHTML =
      currentCharacter.badMessage;

    resultCharacter.src =
      currentCharacter.faces.sad;
  }
}

function shareOnX(){
  if(!currentCharacter) return;

  const cleanTitle =
    resultTitle.innerText.replace(/\n/g," ");

  const text =
`${cleanTitle}${currentCharacter.emoji}

${currentCharacter.name}と、
${currentCharacter.place}話しました。

無料ブラウザゲーム
「${GAME_TITLE}」
${GAME_URL}

#放課後カバメモリアル
#カバゲーセン`;

  const shareUrl =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(text);

  window.open(shareUrl,"_blank");
}

function goTitle(){
  resetText();
  currentCharacter = null;
  showScreen(titleScreen);
}

if(titleImage){
  titleImage.onclick = ()=>{
    showScreen(selectScreen);
  };
}

startBtn.onclick = ()=>{
  showScreen(selectScreen);
};

charButtons.forEach(btn=>{
  btn.onclick = ()=>{
    startCharacter(btn.dataset.char);
  };
});

backTitleBtn.onclick = ()=>{
  goTitle();
};

retryBtn.onclick = ()=>{
  goTitle();
};

shareBtn.onclick = ()=>{
  shareOnX();
};

homeBtn.onclick = ()=>{
  location.href = HOME_URL;
};

messageEl.addEventListener("click",finishTyping);
canvas.addEventListener("click",finishTyping);