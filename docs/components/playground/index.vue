<script lang="ts" setup></script>

<template>
  <div class="playground">
    <div class="view"></div>
    <div class="editor">1321</div>
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
  gap: 40px;
  .view {
    aspect-ratio: 1/0.56;
    background-color: #000;
  }
}
</style>
