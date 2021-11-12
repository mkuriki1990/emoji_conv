/*
 *
 * 入力された文字列を絵文字に変換する
 * 2021/07/29 作成
 *
 */

/*
 * The MIT License (MIT)
 * 
 * Copyright (c) 2021 Murahashi Kuriki
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// ボタンの要素を取得
var capButton = document.getElementById("captureButton");
var convertButton = document.getElementById("convertButton");
var sampleButton = document.getElementById("sampleButton");
var randomButton = document.getElementById("randomButton");
// 絵文字を読み込むための配列
var EMOJI_DICT = new Array();
var EMOJI_NAMELIST = new Array();

// ページ読み込み時に呼ばれる関数
window.onload = function(){
    // prepareTweetButton();
    makeTweetButton();

    // emoji の json ファイルを読み込み
    var emoji_json = window.EMOJI;
    // console.log(emoji_json); // テスト出力
    // console.log(emoji_json["0"]["-"]); // テスト出力

    // Twitter の絵文字情報を記述した json 風データを読み込む
    var twitter_emoji_json = window.TWITTER_EMOJI;
    // console.log(twitter_emoji_json); // 辞書型表示テスト

    // json を順番に読み込んで辞書型配列に格納する
    for (var emoji_num in twitter_emoji_json["0"]) {
        short_name = twitter_emoji_json["0"][emoji_num]["short_name"]; // 短い名前
        emoji = twitter_emoji_json["0"][emoji_num]["emoji"]; // 絵文字
        EMOJI_DICT[short_name] = {"short_name":short_name, "emoji":emoji}; // short_name をキーにして emoji を代入
        EMOJI_NAMELIST.push(short_name);
    }
    console.log(EMOJI_DICT); // 辞書型表示テスト

    // 絵文字名前リストを文字列長が長い順に並べ替え
    EMOJI_NAMELIST.sort(function(a, b) {return b.length - a.length;});
    // console.log(EMOJI_NAMELIST); // 辞書型表示テスト

    // ランダムで絵文字を選んで変換する
    randomEmojiChoise();
}

// 入力欄のリサイズ
// textareaの要素を取得
let inputArea = document.getElementById('inputForm');
let resultArea = document.getElementById('resultForm');
// textareaのデフォルトの要素の高さを取得
let inputHeight = inputArea.clientHeight;
let resultHeight = resultArea.clientHeight;

// textarea の input イベントリスナを登録
inputArea.addEventListener('input', ()=>{
    // textareaの要素の高さを設定（rows属性で行を指定するなら「px」ではなく「auto」で良いかも！）
    inputArea.style.height = inputHeight + 'px';
    // textareaの入力内容の高さを取得
    let inputScrollHeight = inputArea.scrollHeight;
    // textareaの高さに入力内容の高さを設定
    inputArea.style.height = inputScrollHeight + 'px';

    // textareaの入力内容の高さを取得
    let resultScrollHeight = resultArea.scrollHeight;
    // textareaの高さに入力内容の高さを設定
    resultArea.style.height = resultScrollHeight + 'px';
});

// テキストボックスに入力があるたびに呼ばれる関数
function renew(){
    conv_emoji();
    makeTweetButton();
}

function conv_emoji() {
    // 入力フォームの値を取得
    var inputForm = document.getElementById("inputForm");

    // 絵文字部分を変換
    var resultStr = emoji_convertor(inputForm.value);

    result = resultStr;

    // 取得した値を別の入力フォームに表示
    let resultForm = document.getElementById("resultForm");
    resultForm.value = result;

}


// 引数の文字列 string のうち可能な部分を絵文字に変換して返す関数
function emoji_convertor(string) {

    // short_name と一致するものを絵文字に置換する
    for (const emoji_name of EMOJI_NAMELIST) {
        // 絵文字名が長い順に処理することで「ウシの顔」が「『ウシ』の『顔』」となるのを防ぐ
        emoji = EMOJI_DICT[emoji_name]["emoji"];
        // console.log(emoji_name);
        // console.log(emoji);

        // 置換
        string = string.replace(new RegExp(emoji_name, "g"), emoji);
    }

    return string;
}


// ツイートボタンを生成する
// 変換前の文字列と変換後の文字列をツイート本文に組み込む
function makeTweetButton(){
    $(function(){
        $.fn.appendTweetButton = function(url, text){
            $(this).append($("<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-url=\""+url+"\" data-text=\""+text+"\" data-count=\"vertical\">Tweet<\/a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}else{twttr.widgets.load();}}(document, 'script', 'twitter-wjs');<\/script>"));
        }

        $("#resultTweet").empty(); // すでにあるツイートボタンの削除

        // テキストボックスの中身読み込み
        var input = document.getElementById("inputForm").value;
        var result = document.getElementById("resultForm").value;
        $("#resultTweet").appendTweetButton("https://mkuriki.com/emoji_conv/", input + "\n↓\n" + result + "\n#Twitter絵文字変換さん\n");
        // $("#resultTweet").appendTweetButton("https://mkuriki.com/emoji_conv/", result + "\n#Twitter絵文字変換さん\n");
    });
}


// 画像変換ボタンの処理
capButton.addEventListener("click", function(e) {
    e.preventDefault();

    html2canvas(document.querySelector("#img_convert_resion"), {
        // html2canvas のウィンドウ幅を変更する
        scale: 1, 
    }).then(canvas => {
        var imgData = canvas.toDataURL();
        document.getElementById("resultImg").src = imgData;
        document.getElementById("downloadButton").href = imgData;
    });

    // 非表示になっている説明の表示
    document.getElementById("image_preview").style.display = "block";
});

// 絵文字変換ボタンの処理
convertButton.addEventListener("click", function(e) {
    e.preventDefault();

    renew();
});

// サンプルボタンの処理
sampleButton.addEventListener("click", function(e) {
    e.preventDefault();

    let sampleText = sampleTextList[Math.floor(Math.random() * sampleTextList.length)];

    // 取得した値を別の入力フォームに表示
    let inputForm = document.getElementById("inputForm");
    inputForm.value = sampleText;

    // 変換処理
    renew();

    // テキストエリアのリサイズ
    textareaReisze();
});

// ランダムボタンの処理
randomButton.addEventListener("click", function(e) {
    e.preventDefault();

    randomEmojiChoise();

});

// テキストエリアをリサイズしたいときに呼ぶ
function textareaReisze() {

    // 入力欄のリサイズ
    // textareaの要素を取得
    let inputArea = document.getElementById('inputForm');
    let resultArea = document.getElementById('resultForm');
    // textareaのデフォルトの要素の高さを取得
    let inputHeight = inputArea.clientHeight;
    let resultHeight = resultArea.clientHeight;

    // textareaの要素の高さを設定（rows属性で行を指定するなら「px」ではなく「auto」で良いかも！）
    inputArea.style.height = inputHeight + 'px';
    // textareaの入力内容の高さを取得
    let inputScrollHeight = inputArea.scrollHeight;
    // textareaの高さに入力内容の高さを設定
    inputArea.style.height = inputScrollHeight + 'px';

    // textareaの入力内容の高さを取得
    let resultScrollHeight = resultArea.scrollHeight;
    // textareaの高さに入力内容の高さを設定
    resultArea.style.height = resultScrollHeight + 'px';

}

let sampleTextList = [
    "もう目覚まし時計秋です！カエデの葉キノコジャック・オ・ランタン 寒くなってくるし風になびく葉わたしも一緒に過ごす彼氏男性2つのハートがほしいです～汗マーク口のない顔温めてほしい炎ふええ割れたハート でも実は無表情フォロワーさん上半身のシルエットの中に目好きな人見ざる考え吹き出し光るハートがいるんです目が笑っている笑顔回転するハート花束 DM✉で告白赤くなった顔汗マークラブレターしてくれたら絶対OKOKサイントロフィー❗白いビックリマーク するんだけど～2つのハート鼓動するハートきらめくハート光るハート舌を出してウインクしている顔",  
    "ふえぇハートのビックリマーク赤くなった顔汗マークもうすぐクリスマスクリスマスツリーコウモリ🕸なのに彼氏キスハートのカップル2つのハートいないってマジ!?!?絶叫した顔汗マーク汗マーク泣き顔右下へカーブする矢印これじゃ令和初の四角囲みnewクリスマスクリスマスツリーペロペロキャンディーアメひとりぼっち泣き顔割れたハート右下へカーブする矢印うぇ〜〜ん号泣割れたハート汗マーク実は言わざる考え吹き出しフォロワーさんの中に顔つき満月キラキラ好きな人投げキッス2つのハートがいるんだけどDMラブレターで告白花束ラブレターきらめくハートしてくれたらOKOKサインの男性キラキラするのになぁ赤くなった顔両手を上げる鼓動するハート", 
    "ふえぇハートのビックリマーク赤くなった顔汗マーク今日は七夕七夕顔つき満月キラキラなのに彼女キスハートのカップル2つのハートがいないってマジ白いビックリマーク赤いはてなマーク絶叫した顔汗マーク汗マーク泣き顔右下へカーブする矢印このままだと今年の夏ヒマワリキラキラもまた心配そうな顔の絵文字ひとりぼっち泣き顔割れたハートうろたえた顔右下へカーブする矢印そんなのサイアク～～号泣割れたハート汗マーク実は考えている顔フォロワーさんの中に❤目がハートの笑顔好きな人が居るんです❤だからがっかりしたが安心した顔DMでラブレター告白してくれたらOKしちゃうのになぁOKサインの女性2つのハート(笑)", 
    "ふぇぇハートのビックリマークレポート提出開いた本書いている手まであと3週間ってマジ!!マーク!?これじゃ華のJKキラキラきらめくハートじゃなくて留年JK🗑バイバイになっちゃうよ泣き顔号泣汗マーク右下へカーブする矢印ふぇぇぇん訴えかける顔割れたハート実は言わざる2つのハートフォロワーさん低輝度の中に手をつないだ女性光るハートレポート書いて欲しい人投げキッスキラキラがいるんだけど見ざる鼓動するハートDMでラブレター考え吹き出し告白してくれたら赤くなった顔射抜かれたハートレポート書籍✍🏻書かせてあげるのになぁ!!マーク訴えかける顔キラキラ光るハート右上へカーブする矢印", 
    "ふえぇハートのビックリマーク赤くなった顔汗マークもうすぐエイプリルフール嘘つき顔キラキラなのに彼氏キスハートのカップル2つのハートがいないってマジ白いビックリマーク赤いはてなマーク絶叫した顔汗マーク汗マーク泣き顔右下へカーブする矢印このままだと今年もまた心配そうな顔の絵文字彼氏いるって嘘つかないといけない泣き顔割れたハートうろたえた顔右下へカーブする矢印そんなのサイアク～～号泣割れたハート汗マーク実は考えている顔フォロワーの中に❤目がハートの笑顔好きな人が居るんです❤だからがっかりしたが安心した顔DMでラブレター告白してくれたらOKしちゃうのになぁOKサインの男性", 
    "ふえぇぇぇ号泣号泣号泣アメリカアメリカ国旗の大統領が決まりそう自由の女神ハンバーガーどんぶりキラキラなのに私のパートナー手をつないだ男女バツ印が決まらないってマジ絶叫した顔汗マーク汗マーク泣き顔あり得ないんだけれど汗マーク心配そうな顔の絵文字 !?泣き顔うろたえた顔右下へカーブする矢印そんなのヤダよ〜号泣汗マーク実はうんち考え吹き出しフォロワーさんの中に顔つき満月キラキラ好きな赤色のハート笑顔とハート3つハートのカップルがいるんだけど、DMで告白してくれたらラブレター一発K.O.右向きのこぶし衝突マークイイねするのになぁキラキラキラキラキラキラ結婚式〜",
];

// ラジオボタンを選択したときの処理
function changeRadio() { 
    let radioElement = document.getElementsByName("fontRadioGroup");
    let fontFlag;
    // ラジオボタンの状態を取得
    for (var i=0; i < radioElement.length; i++) {
        if (radioElement[i].checked) {
            fontFlag = radioElement[i].value;
            break;
        }
    }

    // textarea を取得
    let inputArea = document.getElementById('inputForm');
    let resultArea = document.getElementById('resultForm');

    // それぞれにフォントを指定する
    inputArea.style.fontFamily = fontFlag;
    resultArea.style.fontFamily = fontFlag;

    renew();
}

// ランダムで絵文字を 5 つ選んで変換する関数
function randomEmojiChoise() {

    let sampleText = "";

    // 絵文字名称をランダムに取得して 5 文字追加
    let randomEmojiName = EMOJI_NAMELIST[Math.floor(Math.random() * EMOJI_NAMELIST.length)];
    for (let loop = 0; loop < 5; loop++) {
        sampleText += randomEmojiName + ", ";
        randomEmojiName = EMOJI_NAMELIST[Math.floor(Math.random() * EMOJI_NAMELIST.length)];
    }
    sampleText += randomEmojiName;

    // 取得した値を別の入力フォームに表示
    let inputForm = document.getElementById("inputForm");
    inputForm.value = sampleText;

    // 変換処理
    renew();

    // テキストエリアのリサイズ
    textareaReisze();
}
