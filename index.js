const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// URLエンコードされたデータを解析するためのミドルウェア
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/screenshot', async (req, res) => {
    const url = req.body.url;
    
    if (!url) {
        return res.send('URLを入力してください');
    }

    try {
        const browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });        
        const page = await browser.newPage();
        await page.goto(url);
        const screenshotPath = path.join(__dirname, 'screenshot.png');
        await page.screenshot({ path: screenshotPath });
        await browser.close();

        res.send(`
            <h1>スクリーンショットが撮影されました</h1>
            <img src="/screenshot.png" alt="Screenshot">
            <br><br>
            <a href="/">戻る</a>
        `);
    } catch (error) {
        res.send(`エラーが発生しました: ${error.message}`);
    }
});

app.get('/screenshot.png', (req, res) => {
    res.sendFile(path.join(__dirname, 'screenshot.png'));
});

app.listen(PORT, () => {
    console.log(`サーバーが http://localhost:${PORT} で起動しました`);
});
