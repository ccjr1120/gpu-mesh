<template>
  <div ref="viewRef" class="view" />
</template>
<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import useView from '../../playground/component/composables/use-view'

const dataMap = defineModel<{
  options: string
  vertex: string
  fragment: string
}>('dataMap', { required: true })
const viewRef = useTemplateRef('viewRef')
useView({ el: viewRef, dataMap })
</script>
<style lang="less" scoped></style>
