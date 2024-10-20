import { ref, Ref } from 'vue'

export default function useToolbar(
  data: Ref<{ [k: string]: string }>,
  changeTabCb?: (value: string) => void
) {
  const tabList = Object.keys(data.value).map((k) => ({
    label: k,
    value: k,
    click: () => {
      changeTabCb?.(k)
      activeTab.value = k
    }
  }))
  const activeTab = ref(tabList[0].value)

  return { tabList, activeTab }
}
