
(()=>{

const data = [
    {wdcall:words1,eptext:'Ep.57　58'},
    {wdcall:words2,eptext:'Ep.55　56'},
    {wdcall:words3,eptext:'Ep.53　54'},
]

function words1() { return [
    {KR:'수영장',JP:'水泳場、プール'},
    {KR:'몸을 풀다',JP:'体をほぐす'},
    {KR:'나누다',JP:'分ける'},
    {KR:'순서',JP:'順序'},
    {KR:'정하다',JP:'決める'},
    {KR:'별개',JP:'別々'},
    {KR:'입수',JP:'入水'},
    {KR:'줄다리기',JP:'綱引き'},
    {KR:'중심',JP:'中心、重心'},
    {KR:'당기다',JP:'引く'},
    {KR:'밀다',JP:'押す'},
    {KR:'못되다',JP:'悪い'},
    {KR:'단체',JP:'団体'},
    {KR:'뺏다',JP:'奪う、取る'},
    {KR:'자라다',JP:'育つ'},
    {KR:'공격',JP:'攻撃'},
    {KR:'양아치',JP:'不良、チンピラ'},
    {KR:'삶',JP:'人生'},
    {KR:'덤벼라',JP:'かかってこい'},
    {KR:'적',JP:'敵'},
    {KR:'합치다',JP:'合わせる、一つにする'},
]}

function words2() { return [
    {KR:'어차피',JP:'どうせ'},
    {KR:'소용없다',JP:'無駄'},
    {KR:'정해졌다',JP:'決まった'},
    {KR:'넘어지다',JP:'倒れる'},
    {KR:'뻔하다',JP:'するところ、しそう'},
    {KR:'괜히',JP:'やたらに'},
    {KR:'때리다',JP:'叩く'},
    {KR:'피하다',JP:'避ける'},
    {KR:'너희',JP:'お前たち'},
    {KR:'맞추다',JP:'合わせる'},
    {KR:'비밀',JP:'秘密'},
    {KR:'뭉치다',JP:'固まる'},
    {KR:'건강',JP:'健康'},
    {KR:'숨 쉬다',JP:'息する'},
    {KR:'칭얼거리다',JP:'駄々をこねる'},
    {KR:'자세',JP:'姿勢'},
    {KR:'뻗다',JP:'伸びる'},
    {KR:'고장',JP:'故障'},
    {KR:'최종',JP:'最終'},
    {KR:'꼴찌',JP:'ビリ'},
]}

function words3() { return [
    {KR:'몰아내다',JP:'追い出す'},
    {KR:'돌발',JP:'突発'},
    {KR:'시범',JP:'手本'},
    {KR:'자리',JP:'席、場所'},
    {KR:'비리',JP:'不正'},
    {KR:'유연',JP:'柔軟'},
    {KR:'꼬이다',JP:'絡まる'},
    {KR:'붙다',JP:'付く'},
    {KR:'머금다',JP:'含む'},
    {KR:'땀나다',JP:'汗が出る'},
    {KR:'굴리다',JP:'転がす'},
    {KR:'멈추다',JP:'止まる'},
    {KR:'탈출',JP:'脱出'},
    {KR:'스스로',JP:'自ら'},
    {KR:'합의',JP:'合意'},
    {KR:'저승사자',JP:'死神'},
    {KR:'피해자',JP:'被害者'},
    {KR:'억울하다',JP:'悔しい、納得いかない'},
]}


const num = document.getElementById('num');
const right = document.getElementById('right');
const wrong = document.getElementById('wrong');
const hng = document.getElementById('hng');
const jpn = document.getElementById('jpn');
const btn = document.querySelector('.btn');

const selects = document.querySelectorAll('#select > input');
const ep = document.getElementById('ep');
const change = document.getElementById('change');
const clear = document.getElementById('clear');
const sound = document.getElementById('sound');
const body = document.body;

let index = 0;
let thisWords = words1();


// 初期表示
function init(thisWords) {
    index = 0;
    num.textContent = '1/' + thisWords.length;
    hng.textContent = thisWords[index].KR;
    jpn.textContent = "表示";
}
init(thisWords);

// ○×ボタン
function order(words, action) {
    index = (index + 1) % words.length;
    hng.textContent = words[index].KR;
    Reading(hng.textContent);
    jpn.textContent = "表示";
    
    if (action === 'right' && words.length > 0) {
        words.splice(index-1 , 1);
        index--;
        index = index < 0 ? 0 : index;
        num.textContent = (index + 1) + '/' + words.length;
    }
    if (words.length === 0) {
        hng.textContent = "완료";
        jpn.textContent = "";
        btn.style.display = 'none';
        num.textContent = '0/0';
    }
    if (action === 'wrong') {
        num.textContent = (index + 1) + '/' + words.length;
    }
}


hng.addEventListener('click', function () {
    Reading(hng.textContent);
});
jpn.addEventListener('click', function() {
    jpn.textContent = thisWords[index].JP;
});

right.addEventListener('click', function() {
    order(thisWords, 'right');
    clicksound();
});
wrong.addEventListener('click', function() {
    order(thisWords, 'wrong');
});

// リスト
selects.forEach((val,i) => {
    val.addEventListener('click', function() {
        thisWords = data[i].wdcall();
        init(thisWords);
        btn.style.display = 'flex';
        ep.textContent = data[i].eptext;
    });
});


// クリック音
function clicksound() {
    const audio = new Audio('./assets/click.mp3')
    audio.currentTime = 0;
    if (sound.checked) {
        audio.play();
    }
}

// 読み上げ
function Reading(text) {
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = 'ko-KR';
    if (sound.checked) {
        speechSynthesis.speak(uttr);
    }
}


// 画像読み込み
const saveImage = localStorage.getItem('selectImage');
if (saveImage) {
    body.style.background = "url(" + saveImage + ") no-repeat center";
    body.style.backgroundSize = "cover";
}

// 画像選択
change.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            body.style.background = "url(" + e.target.result + ") no-repeat center";
            body.style.backgroundSize = "cover";
            localStorage.setItem('selectImage', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// 画像削除
clear.addEventListener('click', function() {
    localStorage.removeItem('selectImage');

    clear.style.boxShadow = "0px 0px 3px 4px rgba(222,200,200,0.5)";
    setTimeout(() => clear.style.boxShadow = "none", 500);

    body.style.background = "url('./assets/bg.jpg') no-repeat center";
    body.style.backgroundSize = "cover";
});


})();