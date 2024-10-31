<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import useView from './composables/use-view'
import useEditor from './composables/use-editor/index'
import vert from './assets/vert.wgsl?raw'
import frag from './assets/frag.wgsl?raw'
import { DataMap } from './index'

const DEFAULT_DATA = {
  vertex: vert,
  fragment: frag
}
const dataMap = ref<DataMap>(DEFAULT_DATA)

const viewRef = useTemplateRef<HTMLElement>('viewRef')
const editorRef = useTemplateRef<HTMLElement>('editorRef')
useView({ el: viewRef, dataMap })
const editor = useEditor({ el: editorRef, dataMap })
</script>

<template>
  <div class="playground">
    <div ref="viewRef" class="view" />
    <div class="right-container">
      <ul class="tab-list">
        <li
          v-for="tab in Object.keys(editor.dataMap.value)"
          :class="{ active: editor.activeDataKey.value === tab }"
          @click="editor.updateActiveDataKey(tab as any)"
        >
          {{ tab }}
        </li>
      </ul>
      <div ref="editorRef" class="editor" />
    </div>
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
    overflow: hidden;
    border-radius: 8px;
    aspect-ratio: 1/0.56;
    background-color: #000;
  }
  .right-container {
    display: grid;
    grid-template-rows: auto 1fr;
  }
  .tab-list {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;
    display: flex;
    gap: 2px;
    align-items: center;
    li {
      cursor: pointer;
      height: 32px;
      background-color: #141414;
      line-height: 32px;
      padding: 0px 10px;
      &.active {
        background-color: #1e1e1e;
      }
    }
  }
}
</style>
