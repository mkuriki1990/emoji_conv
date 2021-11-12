#!/bin/sh
# json ファイルをオブジェクトに持つ js ファイルを作るスクリプト

filename="$1.js"

echo "window.EMOJI = [" > $filename
cat $1 >> $filename
echo -e "\n];" >> $filename

