<script lang="ts" setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import useToolbar from './composables/useToolbar'
import useMonaco from './composables/useMonaco'

const data = ref({ vertex: '', fragment: '' })
const { tabList, activeTab } = useToolbar(data, (v) => {
  data.value[activeTab.value] = editor?.getValue() || ''
  editor?.setValue(data.value[v])
})
const monacoRef = useTemplateRef('monacoRef')
let editor: ReturnType<typeof useMonaco> | null = null
const init = () => {
  editor = useMonaco(monacoRef.value!)
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="editor-container">
    <div class="toolbar">
      <ul class="tab-list">
        <li
          v-for="tab in tabList"
          :class="{ active: activeTab === tab.value }"
          @click="tab.click"
        >
          {{ tab.label }}
        </li>
      </ul>
    </div>
    <div class="monaco" id="monaco" ref="monacoRef"></div>
  </div>
</template>

<style scoped>
.editor-container {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  .toolbar {
    display: flex;
    .tab-list {
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
  .monaco {
    flex: 1;
  }
}
</style>
