# PinPin 旅遊網站 🌍✈️

[![版本](https://img.shields.io/badge/版本-0.1.0-blue)](https://github.com/yourusername/pinpin)
[![許可證](https://img.shields.io/badge/license-MIT-green)](https://github.com/yourusername/pinpin/blob/main/LICENSE)
[![開發階段](https://img.shields.io/badge/階段-開發中-yellow)](https://github.com/yourusername/pinpin)
[![最後更新](https://img.shields.io/badge/最後更新-2025年4月-orange)](https://github.com/yourusername/pinpin/commits)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-green?logo=vue.js)](https://vuejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.0-red?logo=nestjs)](https://nestjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql&logoColor=white)](https://www.mysql.com/)

專為多人旅遊設計的全方位規劃平台，提供組團旅遊、喜好清單、行程規劃與分帳功能。

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

## 🛠️ 技術棧

### 前端

[![Vue.js](https://img.shields.io/badge/Vue.js-v3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vuetify](https://img.shields.io/badge/Vuetify-v3.7-1867C0?logo=vuetify&logoColor=white)](https://vuetifyjs.com/)
[![Pinia](https://img.shields.io/badge/Pinia-v2.2-F0C?logo=vue.js&logoColor=white)](https://pinia.vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-v6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

### 後端

[![NestJS](https://img.shields.io/badge/NestJS-v10.0-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-v8.0-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-v0.3.20-orange?logo=typeorm&logoColor=white)](https://typeorm.io/)
[![JWT](https://img.shields.io/badge/JWT-v10.2.0-black?logo=JSON%20web%20tokens)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-v8.1.0-85EA2D?logo=swagger&logoColor=black)](https://swagger.io/)

### 整合 API

[![Google Maps](https://img.shields.io/badge/Google_Maps_API-開發中-4285F4?logo=google-maps&logoColor=white)](https://developers.google.com/maps)
[![OpenWeather](https://img.shields.io/badge/OpenWeather_API-開發中-EB6E4B?logo=openweathermap&logoColor=white)](https://openweathermap.org/api)
[![ExChangeRate](https://img.shields.io/badge/ExChangeRate_API-開發中-brightgreen?logo=currencyexchange&logoColor=white)](https://exchangerate-api.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-v2.5-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)

### 開發工具

[![ESLint](https://img.shields.io/badge/ESLint-v8.57-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-v3.3-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)
[![Husky](https://img.shields.io/badge/Husky-v9.1-000000?logo=git&logoColor=white)](https://typicode.github.io/husky/)

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