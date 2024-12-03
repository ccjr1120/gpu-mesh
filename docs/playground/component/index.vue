<script lang="ts" setup>
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import useEditor from './composables/use-editor/index'
import { DataMap } from './index'
import { DEFAULT_DATA } from './constants'
import useView from './composables/use-view'

const LOCAL_STORAGE_KEY = 'gpu-mesh-data'
const dataMap = ref<DataMap>(DEFAULT_DATA)
watch(
  dataMap,
  () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataMap.value))
  },
  { deep: true }
)
onMounted(() => {
  const storageData = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (storageData) {
    dataMap.value = JSON.parse(storageData)
  }
})

const viewRef = useTemplateRef<HTMLElement>('viewRef')
const editorRef = useTemplateRef<HTMLElement>('editorRef')
useView({ el: viewRef, dataMap })
const editor = useEditor({ el: editorRef, dataMap })
const handleReset = () => {
  dataMap.value = DEFAULT_DATA
  editor.updateActiveDataKey(editor.activeDataKey.value)
}
</script>

<template>
  <div class="playground">
    <div class="left-container">
      <div ref="viewRef" class="view" />
    </div>
    <div class="right-container">
      <div class="header">
        <ul class="tab-list">
          <li
            v-for="tab in Object.keys(editor.dataMap.value)"
            :class="{ active: editor.activeDataKey.value === tab }"
            @click="editor.updateActiveDataKey(tab as any)"
          >
            {{ tab }}
          </li>
        </ul>
        <button class="reset-icon" @click="handleReset">reset</button>
      </div>
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
  .header {
    display: flex;
    justify-content: space-between;
  }
  .reset-icon {
    font-size: 12px;
    cursor: pointer;
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
      background-color: #1e1e1e;
      line-height: 32px;
      padding: 0px 10px;
      &.active {
        background-color: #000;
      }
    }
  }
}
</style>
