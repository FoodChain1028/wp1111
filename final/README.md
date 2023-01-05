#  [111-1] Web Programming Final
## (Group 38) Solidibility

### Demo Video
* 

### 描述這個服務在做什麼
Solidibility is a leetcode-like system, which has several problem ready to be solved and is able to test your ability of solidity.

### Deployed Link
* 

### 使用與參考之框架/模組/原始碼
- frontend: React.js
- backend: WebSocket graphql
- db: MongoDB Atlas
* https://github.com/qingyang0506/My_Profile
* https://github.com/manuarora700/react-code-editor

### 使用之第三方套件、框架、程式碼
- frontend: mui ethers monaco web3
- backend: graphql ws 
- db: mongo

### 專題製作心得
* 陳彥龍
  在很短的時間建立一個project真的是一件很有挑戰性的事，尤其還有其他project一起在跑的時候，但是自己從頭建立仍舊是學習到不少東西，而且可以很完整的把整個前後端的流程都走過一遍，跟作業相比更事要自己找更多的資料也遇到更多的問題。另外也讓自己使用 github 的能力上升了一點點，在跟別人合作的能力也有明顯的上升。
* 鍾富全
  這次的專案真的讓我學到很多關於開發合作上的細節，雖然我們只有兩個人，但是在溝通時常常會遇到許多衝突的地方，但是我們最後都一一排解並克服了。另外我也學會更多前端與後端連接的狀況更了解一點了，對於全端的開發也有更深的概念。最後我也透過這次的專案學會了很多 github 相關的技巧，如何創 branch、pull request、merge 等細節，希望以後也能越來越精熟這些技能。
  
<!-- 以上為須發布在fb的內容 -->

### 如何在 localhost 安裝與測試之詳細步驟
* modules:
  * `cd frontend`
  * `yarn`
  * `cd backend`
  * `yarn`
* 瀏覽器模組需求:
  * 需安裝 metamask 擴充功能（或是其他錢包）
  * 由於錢包私鑰較為隱私，可能需要請助教老師們自行創建一個metamask的錢包帳戶
* 環境
  * .env 中請輸入 MONGO_URL
* run:
  * `cd frontend && yarn start`
  * `cd backend && yarn server`
* 以上皆完成後應該可以看到登入畫面，只要點選 Connect 就可以連結錢包。錢包單純作為登入功能使用，只會使用其地址作為帳戶，不會要求進行任何鏈上交易，請放心。


### 每位組員之負責項目 (請詳述)
* 鍾富全
  * frontend: frame
  * deployment
* 陳彥龍
  * frontend: pages
  * backend: graphql
* 以上只是大略的分工，frontend 的部分幾乎都是混著一起做的。