<script lang="ts" setup>
import Editor from './editor/index.vue'
</script>

<template>
  <div class="playground">
    <div class="view"></div>
    <Editor />
  </div>
</template>

<style scoped>
.playground {
  margin: auto;
  width: 95%;
  padding: 2% 0;
  height: calc(100vh - var(--vp-nav-height));
  display: grid;
  grid-template-columns: 40% auto;
  gap: 20px;
  .view {
    border-radius: 8px;
    aspect-ratio: 1/0.56;
    background-color: #000;
  }
}
</style>
