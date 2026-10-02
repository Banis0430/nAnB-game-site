# 幾 A 幾 B / Bulls and Cows

一個使用 HTML、CSS 與 JavaScript 製作的「幾 A 幾 B」網頁版猜數字遊戲，可直接部署到 GitHub Pages。

A bilingual **Bulls and Cows / 幾 A 幾 B** guessing game built with HTML, CSS, and JavaScript. It can be deployed directly to GitHub Pages.

## 功能 Features

### 中文
- 支援 10、16、36 進位
- 自訂答案位數
- 答案不含重複字元
- 隨機產生答案
- 輸入驗證
- A / B 提示
- 猜測次數與歷史紀錄
- 清除紀錄、重新開始
- **繁體中文 / English 語言切換**
- 語言選擇會儲存在瀏覽器 `localStorage`

### English
- Supports Base 10, Base 16, and Base 36
- Custom answer length
- No repeated characters in the answer
- Random answer generation
- Input validation
- A / B hints
- Attempt counter and guess history
- Clear history and restart
- **Traditional Chinese / English language switch**
- Language selection is saved in browser `localStorage`

## 遊戲規則 Game Rules

### 中文
- **A**：字元與位置都正確。
- **B**：字元正確，但位置錯誤。
- 答案與有效猜測都不能有重複字元。
- 例如答案 `1234`：猜 `1234` → `4A 0B`；猜 `1243` → `2A 2B`。

### English
- **A**: The character and position are both correct.
- **B**: The character is correct but the position is wrong.
- Neither the answer nor a valid guess may contain repeated characters.
- If the answer is `1234`: `1234` → `4A 0B`; `1243` → `2A 2B`.

## 遊戲模式 Game Modes

| 模式 / Mode | 字元 / Characters |
|---|---|
| 10 進位 / Base 10 | `0-9` |
| 16 進位 / Base 16 | `0-9`, `A-F` |
| 36 進位 / Base 36 | `0-9`, `A-Z` |

答案長度必須介於 1 與該模式的字元數量之間。  
The answer length must be between 1 and the number of available characters.

## 專案結構 Project Structure

```text
nAnB_web/
├── index.html
├── style.css
├── game.js
└── README.md
```

- `index.html` — 網頁結構 / page structure
- `style.css` — 外觀與響應式排版 / styling and responsive layout
- `game.js` — 遊戲邏輯、A/B 計算、驗證、紀錄與語言切換 / game logic, scoring, validation, history, and language switching
- `README.md` — 專案說明 / project documentation

## 語言切換 Language Switch

網站右上角提供語言切換按鈕。

The language switch is located in the upper-right corner.

### 中文
預設為繁體中文；按下 `English` 後切換英文。選擇會保存到 `localStorage`，重新整理後仍會保留。

### English
The default language is Traditional Chinese. Click `English` to switch to English. The choice is stored in `localStorage` and remains after refresh.

## 本機執行 Run Locally

### 中文
不需要後端。直接用瀏覽器開啟 `index.html` 即可，也可以使用任何靜態 HTTP server。

### English
No backend is required. Open `index.html` directly in a browser, or use any static HTTP server.

## 部署到 GitHub Pages Deploy to GitHub Pages

1. 建立 GitHub repository / Create a GitHub repository.
2. 上傳四個專案檔案 / Upload the four project files.
3. 開啟 **Settings → Pages**。
4. 選擇 **Deploy from a branch**、`main`、`/ (root)`。
5. 儲存並等待部署完成 / Save and wait for deployment.
6. 使用 GitHub Pages 網址開啟遊戲 / Open the game using its GitHub Pages URL.

## 為什麼使用 JavaScript？ Why JavaScript?

### 中文
GitHub Pages 主要提供靜態檔案，而瀏覽器能直接執行 JavaScript，因此遊戲可以完全在瀏覽器中運作，不需要後端。

這不是說只能使用 JavaScript。Python 可以透過 Pyodide 等技術執行於瀏覽器；C++、Rust 等也可以編譯成 WebAssembly。這個專案使用 JavaScript，是因為它最直接、最適合這種純前端 GitHub Pages 專案。

### English
GitHub Pages mainly serves static files, and browsers can execute JavaScript directly. Therefore, the game can run entirely in the browser without a backend.

JavaScript is not the only possible choice. Python can run in browsers through technologies such as Pyodide, while C++ and Rust can be compiled to WebAssembly. JavaScript is used here because it is the most direct choice for a pure frontend GitHub Pages project.

## 注意事項 Notes

### 中文
這是純前端遊戲，答案在瀏覽器中產生，因此不具有伺服器端保密性。

### English
This is a client-side game. The answer is generated in the browser, so it does not provide server-side secrecy.

## License

可自由修改，用於個人學習與專案用途。  
Free to modify for personal learning and project use.


## Interface Layout

### 中文
- 開啟遊戲時只顯示「遊戲設定」。
- 按下「開始遊戲」後，設定區會隱藏，只顯示猜測區與 Guess History。
- Guess History 有獨立的垂直捲動區域，不會讓其他內容跟著一起滾動。
- 遊戲中可按「修改設定」回到設定畫面；右上角「重新開始」也會回到設定畫面。

### English
- Only **Game Settings** is shown before the game starts.
- After **Start Game**, the settings section is hidden and the guessing section is shown.
- **Guess History** has its own vertical scroll area, so the rest of the layout does not scroll with it.
- **Change Settings** returns to the settings screen, and **Restart** also returns to the settings screen.
