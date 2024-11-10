document.getElementById('play-button').addEventListener('click', function() {
    const gameContainer = document.querySelector('.game-container');
    gameContainer.style.display = 'flex'; // 表示を変更
    gameContainer.style.animation = 'fadeIn 1s forwards'; // フェードインアニメーションを適用
});