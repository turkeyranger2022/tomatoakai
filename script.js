const words = [
    "クラウド", "スコール", "ティーダ", "ジタン", "ライトニング", "ノクティス", "ユウナ", "ティファ", "エアリス", "セフィロス",
    "バレット", "ザックス", "ヴィンセント", "ユフィ", "シド", "レッドXIII", "リノア", "ゼル", "セルフィ", "アーヴァイン",
    "キスティス", "サイファー", "ラグナ", "キロス", "ウォード", "アーロン", "ワッカ", "ルールー", "キマリ", "リュック",
    "パイン", "ジェクト", "シーモア", "スノウ", "ホープ", "サッズ", "ヴァニラ", "ファング", "イグニス", "グラディオラス",
    "プロンプト", "アーデン", "ルナフレーナ", "シドニー", "レギス", "イリス", "コル", "アラネア", "ニックス", "リベルト"
];
const romajiWords = [
    "kuraudo", "sukooru", "tiida", "jitan", "raitoningu", "nokutisu", "yuuna", "tifa", "earisu", "sefuirosu",
    "baretto", "zakkusu", "vinsento", "yufi", "shido", "reddoXIII", "rinoa", "zeru", "serufi", "aavain",
    "kisutisu", "saifaa", "raguna", "kirosu", "woodo", "aaron", "wakka", "ruuru", "kimari", "ryukku",
    "pain", "jekuto", "shiimoa", "sunou", "hoopu", "sazzu", "vanira", "fangu", "ignisu", "guradiolasu",
    "puromputo", "aaden", "runafureena", "shidoni", "regisu", "irisu", "koru", "aranea", "nikkusu", "riberuto"
];
let score = 0;
let timeLeft = 60; // タイマーの初期値を60秒に設定
let timerInterval;
let correctKeys = 0;
let mistypedKeys = 0;

// HTML要素を取得
const wordElement = document.getElementById("character-name");
const romajiElement = document.getElementById("romaji-display");
const inputElement = document.getElementById("input-display");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const retryButton = document.getElementById("retry");
const characterImage = document.querySelector(".character-image");
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const playSound = document.getElementById("play-sound");
const focusSound = document.getElementById("focus-sound");
const randomButton = document.getElementById("random-button");

// 初期表示
function showWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    wordElement.textContent = words[randomIndex];
    romajiElement.innerHTML = romajiWords[randomIndex];
    inputElement.textContent = ""; // 入力フィールドをリセット
    characterImage.style.transition = "opacity 0.5s"; // 画像のフェードイン
    characterImage.style.opacity = 0; // 初期状態で透明
    setTimeout(() => {
        characterImage.style.opacity = 1; // フェードイン
    }, 100);

    // お題が浮かび上がるアニメーション
    wordElement.style.opacity = 0; // 初期状態で透明
    setTimeout(() => {
        wordElement.style.opacity = 1; // フェードイン
    }, 100);
}

// タイマーの開始
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    wordElement.textContent = "";
    romajiElement.innerHTML = ""; // ローマ字をクリア
    inputElement.textContent = ""; // 入力フィールドをクリア
    inputElement.style.display = "none"; // 入力を隠す
    retryButton.style.display = "block"; // 再挑戦ボタンを表示
    characterImage.style.display = "none"; // 画像を非表示
    const finishText = document.createElement("div");
    finishText.className = "finish-text";
    finishText.textContent = "FINISH!!";
    document.querySelector(".input-container").appendChild(finishText);
    updateResults();
    document.body.classList.add('no-animation'); // アニメーションを停止
}

function updateResults() {
    const resultPanel = document.querySelector(".left-panel");
    resultPanel.innerHTML = `
        <div class="result-panel">
            <h1>Result</h1>
            <div class="result-item">Correct Keys: ${correctKeys}</div>
            <div class="result-item">Mistyped Keys: ${mistypedKeys}</div>
            <div class="result-item">Score: ${score}</div>
        </div>
    `;
    setTimeout(() => {
        document.querySelector(".result-panel").classList.add("show");
    }, 100);
}

inputElement.addEventListener("keydown", (event) => {
    const validKeys = /^[a-zA-Z]$/; // 半角英字のみ許可
    if (!validKeys.test(event.key) && event.key !== "Backspace") {
        event.preventDefault(); // 半角英字以外の入力を無効にする
        return;
    }

    if (event.key === "Backspace") {
        event.preventDefault(); // バックスペースキーを無効にする
        return;
    }

    const userInput = inputElement.textContent + event.key;
    const currentRomaji = romajiElement.textContent;

    // 入力が現在のローマ字の長さを超えないようにする
    if (userInput.length > currentRomaji.length) {
        event.preventDefault();
        return;
    }

    // 部分一致のチェック
    let highlightedText = "";
    let highlightedRomaji = "";
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === currentRomaji[i]) {
            highlightedText += `<span class="highlight">${wordElement.textContent[i] || ''}</span>`;
            highlightedRomaji += `<span class="highlight-romaji">${currentRomaji[i] || ''}</span>`;
            correctKeys++; // 正しく打ったキーの数をカウント
            score += 10; // 一文字入力するたびに10スコア追加
            correctSound.currentTime = 0; // 再生位置をリセット
            correctSound.play(); // 正解時の音を再生
        } else {
            highlightedText += wordElement.textContent[i] || '';
            highlightedRomaji += currentRomaji[i] || '';
            mistypedKeys++; // ミスタイプ数をカウント
            incorrectSound.currentTime = 0; // 再生位置をリセット
            incorrectSound.play(); // 不正解時の音を再生
        }
    }
    wordElement.innerHTML = highlightedText + wordElement.textContent.slice(userInput.length);
    romajiElement.innerHTML = highlightedRomaji + currentRomaji.slice(userInput.length);
    scoreElement.textContent = `Score: ${score}`; // 右下のスコアを更新

    if (userInput === currentRomaji) {
        setTimeout(showWord, 200); // 0.5秒後に次のお題を表示
    } else if (event.key !== currentRomaji[userInput.length - 1]) {
        event.preventDefault(); // 正しくないキー入力を無効にする
    }
});

retryButton.addEventListener("click", () => {
    resetGame();
    showWord();
    startTimer();
    inputElement.focus(); // 入力フィールドにフォーカスを設定
    playSound.currentTime = 0; // 再生位置をリセット
    playSound.play(); // リトライボタンを押したときの音を再生
});

// ゲームウィンドウが開いたときにバックグラウンドの縦の揺れをオフにする
function disableBackgroundAnimation() {
    document.body.classList.add('no-animation');
}

// ゲームウィンドウが閉じたときにバックグラウンドの縦の揺れをオンにする
function enableBackgroundAnimation() {
    document.body.classList.remove('no-animation');
}

// ゲーム開始時にバックグラウンドの縦の揺れをオフにする
document.getElementById('play-button').addEventListener('click', function() {
    disableBackgroundAnimation();
    const gameContainer = document.querySelector('.game-container');
    const playButton = document.getElementById('play-button');
    gameContainer.style.display = 'flex'; // 表示を変更
    playButton.style.display = 'none'; // Playボタンを隠す
    document.querySelector(".left-panel").innerHTML = ""; // Resultをクリア
    inputElement.focus(); // 入力フィールドにフォーカスを設定
    playSound.currentTime = 0; // 再生位置をリセット
    playSound.play(); // プレイボタンを押したときの音を再生
    showWord(); // ゲーム開始時にお題を表示
    startTimer(); // タイマーを開始
});

document.getElementById('play-button').addEventListener('mouseover', function() {
    focusSound.currentTime = 0; // 再生位置をリセット
    focusSound.play(); // プレイボタンにカーソルが当たったときの音を再生
});

retryButton.addEventListener('mouseover', function() {
    focusSound.currentTime = 0; // 再生位置をリセット
    focusSound.play(); // リトライボタンにカーソルが当たったときの音を再生
});

document.addEventListener('click', function(event) {
    const gameContainer = document.querySelector('.game-container');
    if (!gameContainer.contains(event.target) && event.target.id !== 'play-button') {
        resetGame();
    }
});

// ウィンドウがアクティブになったときに入力フィールドにフォーカスを設定
window.addEventListener("focus", () => inputElement.focus());

// ウィンドウがクリックされたときに入力フィールドにフォーカスを設定
window.addEventListener("click", () => inputElement.focus());

// Escキーが押されたときにゲームをリセットして閉じる
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        resetGame();
    }
});

function resetGame() {
    clearInterval(timerInterval);
    score = 0;
    timeLeft = 60;
    correctKeys = 0;
    mistypedKeys = 0;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}`;
    inputElement.innerHTML = '';
    wordElement.textContent = '';
    romajiElement.innerHTML = '';
    characterImage.style.display = 'none';
    retryButton.style.display = 'none';
    document.querySelector(".finish-text")?.remove(); // FINISH!テキストを削除
    document.querySelector(".left-panel").innerHTML = ''; // Resultをクリア
    document.querySelector('.game-container').style.display = 'none';
    document.getElementById('play-button').style.display = 'block';
    enableBackgroundAnimation(); // アニメーションを再開
}

// ランダムなバックグラウンドイメージを設定する関数
function setRandomBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * 61) + 1; // 1から61までのランダムな数値を生成
    const backgroundImageUrl = `https://media.fromsoftware.jp/eldenring/resources/images/movieandimages/screenshot/4k/${String(randomIndex).padStart(2, '0')}.jpg`;
    document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
}

// ページが読み込まれたときにランダムなバックグラウンドイメージを設定
window.addEventListener('load', setRandomBackgroundImage);

// Ring of Randomボタンをクリックしたときにランダムなバックグラウンドイメージを設定
randomButton.addEventListener('click', setRandomBackgroundImage);

// 画像のプリロード
function preloadImages() {
    for (let i = 1; i <= 61; i++) {
        const img = new Image();
        img.src = `https://media.fromsoftware.jp/eldenring/resources/images/movieandimages/screenshot/4k/${String(i).padStart(2, '0')}.jpg`;
    }
}

// ページが読み込まれたときに画像をプリロード
window.addEventListener('load', preloadImages);