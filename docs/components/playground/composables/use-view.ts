import { onMounted, ref, Ref, ShallowRef, watch } from 'vue'
import GPUMesh from '../../../../src/index'
import { DataMap } from '../index.vue'
import { _throttle } from '../utils'

export default function useView({
  el,
  dataMap
}: {
  el: ShallowRef<HTMLElement | null>
  dataMap: Ref<DataMap>
}) {
  const loading = ref(false)
  onMounted(async () => {
    await GPUMesh.Mesh.loadDevice()
    const observer = new ResizeObserver(renderGPUMesh)
    observer.observe(el.value!)
    loading.value = true
  })
  watch(
    [dataMap, el, loading],
    () => {
      if (!loading.value) return
      renderGPUMesh()
    },
    { deep: true, immediate: true, flush: 'pre' }
  )

  const WAIT_TIME = 600
  const renderGPUMesh = _throttle(() => {
    if (!el.value) return
    el.value.innerHTML = ''
    new GPUMesh.Mesh(el.value, {
      vertices: new Float32Array([
        -0.8, -0.8, 0.8, -0.8, 0.8, 0.8,
        // Triangle 2
        -0.8, -0.8, 0.8, 0.8, -0.8, 0.8
      ]),
      shader: {
        vertex: `${dataMap.value.vertex}`,
        fragment: `${dataMap.value.fragment}`
      }
    })
  }, WAIT_TIME)
}
