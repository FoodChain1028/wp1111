# Web Programming HW#2
# 切版
延續上次切版內容，一樣是分成三塊:
- 左上 main 
  - main-mic
  - main-head
  - main-foot
- 右上 audience 
  - aud-box
    - mic
    - head
    - name
- 下方 footer
  - timeAndName
  - buttons
  - extensions

# 訂選
訂選我使用了比較陽春的方式，使用: `addEventListener('click')` 來達到按鈕時可以偵測到。

並在按鈕後將 main 與 aud-box 的名字與照片互換便可以達成訂選。

# 全版面
這邊先利用 `cloneNode()` 的方式複製一個子 NodeList，將裡面的內容改成訂選者的資訊，再用 `appendChild()` 的方式加入 audience 中。

接下來將左邊的 `css:display` 調成 `none`、 `css:width` 調成 `0%`，將右邊的 `css:width` 改成 `100%`，並細調其中的 `css` 便可達成。