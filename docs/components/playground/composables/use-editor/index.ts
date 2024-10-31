import { onMounted, Ref, ref, ShallowRef } from 'vue'
import useMonaco from './use-monaco'
import { DataMap } from '../../index'

export default function useEditor({
  el,
  dataMap
}: {
  el: ShallowRef<HTMLElement | null>
  dataMap: Ref<DataMap>
}) {
  const activeDataKey = ref<keyof DataMap>('vertex')
  const updateActiveDataKey = (key: keyof DataMap) => {
    activeDataKey.value = key
    monaco?.setValue(dataMap.value[key])
  }
  let monaco: ReturnType<typeof useMonaco> | null = null
  onMounted(() => {
    if (!el.value) return
    monaco = useMonaco(el.value)
    monaco.setValue(dataMap.value[activeDataKey.value])
    monaco.onDidChangeModelContent(() => {
      const value = monaco?.getValue() || ''
      dataMap.value[activeDataKey.value] = value
    })
  })
  return { dataMap, activeDataKey, updateActiveDataKey }
}
