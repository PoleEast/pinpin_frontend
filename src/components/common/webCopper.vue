<template>
  <div class="d-flex flex-column justify-center">
    <div class="d-flex justify-center PY-1 mb-3 bg-gray-100 border rounded-lg">
      <div id="cropper-container" class="h-75 w-75 relative">
        <img id="cropper-image" :src="props.src" :alt="props.alt" />
      </div>
    </div>
    <div class="d-flex justify-end mb-2">
      <v-btn class="mr-2" text="取消" @click="cancel"></v-btn>
      <v-btn class="mr-2" text="剪裁" @click="getCanvas"></v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Cropper, { CropperCanvas, CropperImage, CropperSelection } from "cropperjs";
  import type { Selection } from "@cropper/element-selection";
  import { onMounted, ref } from "vue";

  const props = defineProps<{
    src: string | undefined;
    alt: string | undefined;
  }>();

  const emits = defineEmits<{
    (e: "getImage", image: HTMLCanvasElement): void;
    (e: "cancel"): void;
  }>();

  const cropper = ref<Cropper | null>(null);
  const canvas = ref<HTMLCanvasElement | null>(null);

  let cropperImage: CropperImage | null = null;
  let cropperCanvas: CropperCanvas | null = null;
  let cropperSelection: CropperSelection | null = null;

  /**
   * 檢查 selection 是否在 maxSelection 範圍內
   * @param {Selection} selection
   * @param {Selection} maxSelection
   * @returns {boolean}
   */
  const inSelection = (selection: Selection, maxSelection: Selection) => {
    return (
      selection.x >= maxSelection.x &&
      selection.y >= maxSelection.y &&
      selection.x + selection.width <= maxSelection.x + maxSelection.width &&
      selection.y + selection.height <= maxSelection.y + maxSelection.height
    );
  };

  /**
   * 將 cropperSelection 轉換為 canvas 並 emit canvas data URL
   * @returns {Promise<void>}
   */
  const getCanvas = async (): Promise<void> => {
    if (!cropperSelection) return;

    canvas.value = await cropperSelection.$toCanvas();

    if (!canvas.value) return;

    emits("getImage", canvas.value);
  };

  const cancel = () => {
    emits("cancel");
  };

  onMounted(() => {
    cropper.value = new Cropper("#cropper-image", {
      container: "#cropper-container",
    });
    cropperImage = cropper.value.getCropperImage();
    cropperCanvas = cropper.value.getCropperCanvas();

    cropperSelection = cropper.value.getCropperSelection();
    cropperSelection?.setAttribute("aspect-ratio", "1");

    cropperImage?.$ready(() => {
      if (cropperImage === null || cropperSelection === null || cropperCanvas === null || cropper.value === null) return;

      cropperImage.$center("cover");

      const matrix = cropperImage.style.transform
        .match(/matrix.*\((.+)\)/)![1]
        .split(", ")
        .map(Number);

      const imageHeight = cropperImage.$image.height * matrix[0];
      const imageWidth = cropperImage.$image.width * matrix[3];

      cropperCanvas.style.width = `${imageWidth}px`;
      cropperCanvas.style.height = `${imageHeight}px`;

      cropperImage.$center();

      cropperSelection.height = imageHeight / 2;
      cropperSelection.width = imageWidth / 2;
      cropperSelection.$center();

      cropperImage.setAttribute("scalable", "false");

      cropperSelection.addEventListener("change", (event) => {
        if (!cropperSelection || !cropperImage || !cropperCanvas) return;

        const selection = (event as CustomEvent).detail as Selection;
        const cropperCanvasRect = cropperCanvas.getBoundingClientRect();
        const cropperImageRect = cropperImage.getBoundingClientRect();
        const maxSelection: Selection = {
          x: cropperImageRect.left - cropperCanvasRect.left,
          y: cropperImageRect.top - cropperCanvasRect.top,
          width: cropperImageRect.width,
          height: cropperImageRect.height,
        };

        if (!inSelection(selection, maxSelection)) {
          event.preventDefault();
        }
      });
    });
  });
</script>
