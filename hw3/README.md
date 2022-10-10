# WebProgrammingHw3
# 三個部分
我把 Components 分成三個部分：Header、Main、Footer，三個分別做了不同的事。
## Header
其實就很簡單，是一個拿來裝 Title 的部件。

## Main
主要的 todo 運作
### Input
首先在 input 中要如何得知使用者按下 `Enter`？
我使用的是在 input 中呼叫一個函式 `onKeyPress = {e => handleInputEnter(e)}`
```jsx
// 處理 input 後按下 Enter 後如何處理
const handleInputEnter = (e) => {
    if (e.key === 'Enter' && e.target.value !== '')  { // input 為空白時不輸入
        setList(previousList => ([
            ...previousList,
            {
                id: currentId,
                content: e.target.value,
                isCompleted: false,
                style: "todo-app__item-detail"
            }
        ]));
        setCurrentId(previousId => previousId + 1);
        setTotalNum(previousNum => previousNum + 1);
        setIsListEmpty(false);
    }
}
```
可以利用偵測 event 來得知 `event.key` 是不是按下 `Enter`，若是的話則再執行。

下方 `setList` 中使用了 `...previousList, {...}`，簡單說就是將之前的 list 當成 previousList 並在後方加上一個 todo。

### Display On Screen
#### Not Display
如何將這些 todos 消失在螢幕上。

我用一個 `boolean` 來得知是否要顯示 Todos 與 Footer，在 List 更新時便將他設成 false，代表 list 不是空的

#### Yes Display
更新後我使用 `list.map()` 來達到可以在螢幕顯示所有 todos 的 item，並將 content 填入適當的位置。

### Delete
因為時間緣故我只有做完 `delete` 的功能，這邊也是用 event 來偵測是否點下 x 的按鈕，並用 `setList` 來做更新。

## Footer 
最後 Footer 中因為只有改變數字，便把 App.js 宣告的一些變數傳入之後做顯示即可。
