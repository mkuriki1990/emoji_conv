# Twitter 絵文字変換さん
Twitter の絵文字をコピペすると日本語になってしまうため, 
日本語の文字列を対応する絵文字に変換する Javascript. 

## Example
### 変換前
ふえぇハートのビックリマーク赤くなった顔汗マークもうすぐクリスマスクリスマスツリーコウモリ🕸なのに彼氏キスハートのカップル2つのハートいないってマジ!?!?絶叫した顔汗マーク汗マーク泣き顔右下へカーブする矢印これじゃ令和初の四角囲みnewクリスマスクリスマスツリーペロペロキャンディーアメひとりぼっち泣き顔割れたハート右下へカーブする矢印うぇ〜〜ん号泣割れたハート汗マーク実は言わざる考え吹き出しフォロワーさんの中に顔つき満月キラキラ好きな人投げキッス2つのハートがいるんだけどDMラブレターで告白花束ラブレターきらめくハートしてくれたらOKOKサインの男性キラキラするのになぁ赤くなった顔両手を上げる鼓動するハート

### 変換後
ふえぇ❣️😳💦もうすぐクリスマス🎄🦇🕸なのに彼氏💏💑💕いないってマジ!?!?😱💦💦😢⤵️これじゃ令和初の🆕クリスマス🎄🍭🍬ひとりぼっち😢💔⤵️うぇ〜〜ん😭💔💦実は🙊💭フォロワーさんの中に🌝❇好きな人😘💕がいるんだけどDM💌で告白💐💌💖してくれたらOK🙆‍♂️❇するのになぁ😳🙌💓

## Contents
* sample.html : アプリページ
* js/twitter_emoji.json : 絵文字と日本語名の対応を書いた json
* js/twitter_emoji.json.js : 絵文字と日本語名の対応を書いた json を Javascript 配列に変換した js ファイル
* js/json2js.sh : json ファイルを Javascript の配列に治すシェルスクリプト
* js/kana2emoji_conv.js : 変換を行う Javascript
* css/emoji_conv.css : Bootstrap と組み合わせて使うスタイルシート

## Usage
以下に注意して index.html を書き換える. 
* Bootstrap css を読み込むようにする
* font ディレクトリに woff (Web Open Font Format) に変換したフォントを置く

## Dependencies
* [Bootstrap 5.0.0-beta1](https://getbootstrap.com)
* [html2canvas 1.1.4](https://html2canvas.hertzen.com)
* [Twemoji](https://github.com/twitter/twemoji)
* [Twitter Color Emoji SVGinOT Font](https://github.com/eosrei/twemoji-color-font)

## License
* MIT License

## Reference
* [Unicode 絵文字の日本語名称の Twitter における対応表を作った話 - みんな重力のせい](https://log.mkuriki.com/unicode-emoji-jp-convert/)

## Copyright
Murahashi Kuriki, 2021
