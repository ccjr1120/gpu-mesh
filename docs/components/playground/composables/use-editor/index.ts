import { onMounted, Ref, ref, ShallowRef } from 'vue'
import useMonaco from './use-monaco'
import { DataMap } from '../..'

export default function useEditor({
  el,
  dataMap
}: {
  el: ShallowRef<HTMLElement | null>
  dataMap: Ref<DataMap>
}) {
  const activeDataKey = ref<keyof DataMap>('vertex')
  const setMonacoValue = () => {
    const value = dataMap.value[activeDataKey.value]
    monaco?.editor.setModelLanguage(
      editor!.getModel()!,
      activeDataKey.value === 'options' ? 'typescript' : 'wgsl'
    )
    editor?.setValue(value)
  }
  const setDataMapValue = () => {
    dataMap.value[activeDataKey.value] = editor?.getValue() || ''
  }
  const updateActiveDataKey = (key: keyof DataMap) => {
    activeDataKey.value = key
    setMonacoValue()
  }
  let monaco: ReturnType<typeof useMonaco>['monaco'] | null = null
  let editor: ReturnType<typeof useMonaco>['editor'] | null = null
  onMounted(() => {
    if (!el.value) return
    const monacoReturn = useMonaco(el.value)
    monaco = monacoReturn.monaco
    editor = monacoReturn.editor
    setMonacoValue()
    editor.onDidChangeModelContent(() => {
      setDataMapValue()
    })
  })
  return { dataMap, activeDataKey, updateActiveDataKey }
}
