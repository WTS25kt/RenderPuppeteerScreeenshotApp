#!/usr/bin/env bash

# Chromeのインストール
curl -sSL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o /tmp/google-chrome-stable.deb
dpkg -x /tmp/google-chrome-stable.deb /tmp/google-chrome
mv /tmp/google-chrome/opt/google/chrome/* /usr/bin/

# Puppeteerが利用するChromeのパスを設定
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
