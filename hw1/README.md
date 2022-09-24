# Web Programming HW#1

# 切版
首先我先做切版的動作，大致上分成三大塊 -- left、right 與 footer。
## left
左邊被釘選的人物。
## right
右邊的聽眾（觀眾）。

## footer
最下面的介面。

# 使用到的 css 功能
## 頭像
頭像的部分我是使用一個 `div` 加上 `background-image: './img/photo.png'` 的方式來改變背景的頭像，另外也使用 `border-radius: 50%` 讓頭像的外圍呈現一個正圓形。

## 主頭像的按鍵
主頭像裡面有三個按鍵，我是用一個 `div` 裝著，放入三個 `img`，用 `width:fit-content;` 來調整寬度，並用 `margin` 調整位置。另外使用 `:hover` 配合 `transition` 讓滑鼠在按鍵上時可以讓背景從透明變成深色。

## 下方按鍵 
下方有五個按鍵的部分，外圍我是用個 `div` 裝著 `img`，一樣用 `border-radius: 50%` 讓背景是正圓形。此外用一個 selector -- `:active` 讓滑鼠按下時可以讓背景變色，但是還沒辦法做到永久變成紅色。


