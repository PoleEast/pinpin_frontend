<template>
  <v-container
    class="pa-0 ma-0 home-container"
    fluid>
    <div class="background-slide"></div>

    <!-- 中央區域 -->
    <div class="content-container">
      <!-- Logo -->
      <img
        src="../assets/home/homeMainLogo.png"
        alt="PinPin旅圖Logo"
        class="logo-image" />
      <!-- 按鈕區域 -->
      <div class="buttons-container">
        <v-btn
          :to="{ name: 'schdule' }"
          rounded="xl"
          color="success"
          variant="text"
          :ripple="false"
          class="action-button">
          <img
            src="../assets/home/homeMainSchdule.png"
            alt="行程規劃"
            class="button-image" />
        </v-btn>
        <v-btn
          :to="{ name: 'search' }"
          rounded="xl"
          color="success"
          variant="text"
          :ripple="false"
          class="action-button">
          <img
            src="../assets/home/homeMainSearch.png"
            alt="搜尋景點"
            class="button-image" />
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
  .home-container {
    position: relative;
    width: 100vw;
    height: calc(100vh - 112px);
    overflow: hidden;
  }

  .background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .background-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    animation: fadeZoom 18s infinite;
  }

  @keyframes fadeZoom {
    0% {
      background-image: url("/src/assets/home/homeMainImg1.jpg");
      opacity: 1;
      transform: scale(1);
    }
    25% {
      background-image: url("/src/assets/home/homeMainImg2.jpg");
      opacity: 1;
      transform: scale(1.1);
    }
    50% {
      background-image: url("/src/assets/home/homeMainImg3.jpg");
      opacity: 1;
      transform: scale(1);
    }
    75% {
      background-image: url("/src/assets/home/homeMainImg4.jpg");
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      background-image: url("/src/assets/home/homeMainImg1.jpg");
      opacity: 1;
      transform: scale(1);
    }
  }

  .content-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    z-index: 1;
  }

  .logo-image {
    width: 80%;
    max-width: 700px;
    min-width: 300px;
    height: auto;
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    gap: 1rem; /* 使用 gap 來替代 margin */
  }

  .action-button {
    background: transparent !important;
    border: none;
    padding: 0;
    transition: transform 0.3s ease;
    width: 15vw !important;
    height: 15vw !important;
    min-width: 60px !important;
    max-width: 180px !important;
  }

  .action-button:hover {
    transform: scale(1.1);
  }

  /* 按鈕圖片部分 */
  .button-image {
    width: 15vw; /* 使用視窗寬度的百分比 */
    max-width: 180px; /* 設置最大尺寸 */
    min-width: 100px; /* 設置最小尺寸 */
  }

  /* 添加響應式調整 */
  @media (max-width: 600px) {
    .buttons-container {
      gap: 0.5rem;
    }

    .action-button {
      width: 25vw !important;
      height: 25vw !important;
    }

    .button-image {
      width: 25vw;
      min-width: 80px;
    }
  }
</style>
