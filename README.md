# PinPin 旅遊網站 🌍✈️

專為多人旅遊設計的全方位規劃平台，提供組團旅遊、喜好清單、行程規劃與分帳功能。

## 📊 專案狀態

![開發階段](https://img.shields.io/badge/階段-開發中-yellow)
![版本](https://img.shields.io/badge/版本-0.1.0-blue)

## 📋 核心功能

### 👥 組團旅遊

- 創建旅遊團並邀請其他會員加入
- 團長權限管理系統
- 即時聊天室討論旅行計劃

### ❤️ 喜好清單

- 整合 Google Places API 的地點搜索
- 個人化景點分類與標籤管理
- 一鍵加入旅遊行程計劃

### 🗺️ 行程規劃

- 多人協同編輯行程
- Google Maps 路線規劃與交通時間估算
- 基於 OpenWeather API 的天氣預報整合

### 💰 旅遊分帳

- 多幣別支出記錄
- 自動匯率換算 (透過 ExChangeRate API)
- 智能分攤算法與結算金額計算

## 🏗️ 系統架構

![更新使用者資料流程圖](更新使用者資料流程圖.drawio.png)

## 🛠️ 技術棧

### 前端

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-yellow?style=for-the-badge&logo=vue.js&logoColor=white)

### 後端

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-orange?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### 開發工具

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

### 第三方服務

- Google Maps API
- OpenWeather API
- ExChangeRate API
- Cloudinary

## 🚀 快速開始

### 前置需求

- Node.js 18+
- npm 9+
- MySQL 8+

### 安裝步驟

#### 前端

```bash
cd pinpin_frontend
npm install
npm run dev
```

#### 後端

```bash
cd pinpin_backend
npm install
# 設定環境變數 (.env 檔案)
npm run start:dev
```

### 環境變數說明

後端 `.env` 檔案需要設定以下變數：

```evn
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=pinpin_db
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_MAPS_API_KEY=your_google_api_key
OPENWEATHER_API_KEY=your_openweather_key
EXCHANGERATE_API_KEY=your_exchangerate_key
```

## 📄 許可證

本專案採用 [MIT 許可證](LICENSE)
