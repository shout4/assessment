'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
/*指定した要素の子供をすべて削除する
 *{HTMLElement}element HTML の要素
*/
function removeAllChildren(element){
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter'){
        assessmentButton.onclick();
    }
};
assessmentButton.onclick = function() {
    const userName = userNameInput.value;
    if (userName.length === 0) {    //名前が空白の時は処理を終了する
        return ;
    }
    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = 'diagnose result';
    resultDivided.appendChild(header);
    
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild (paragraph);
    //to do tweet area create
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' 
    + encodeURIComponent('あなたのいいところ') 
    + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    //widgets.js setting
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};
const answers = [
'{userName}のいいところは声 ',
'{userName}のいいところはまなざし',
'{userName}のいいところは情熱',
'{userName}のいいところは厳しさ',
'{userName}のいいところは知識',
'{userName}のいいところはユニーク',
'{userName}のいいところは用心深さ',
'{userName}のいいところは見た目',
'{userName}のいいところは決断力',
'{userName}のいいところは思いやり',
'{userName}のいいところは感受性',
'{userName}のいいところは節度',
'{userName}のいいところは好奇心',
'{userName}のいいところは気配り',
'{userName}のいいところはその全て',
'{userName}のいいところは自制心',
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName
 * @return {string} diagnose result 
 */
function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode  = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g,userName);
    return result;
}

console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));
//test code
console.assert(
    assessment('太郎') ===assessment('太郎'),
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
