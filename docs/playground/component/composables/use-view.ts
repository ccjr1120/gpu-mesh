import { onMounted, ref, Ref, ShallowRef, watch } from 'vue'
import GPUMesh from '../../../../src/index'
import { DataMap } from '../index'
import { _throttle } from '../../../utils/_'

export default function useView({
  el,
  dataMap
}: {
  el: Readonly<ShallowRef<HTMLElement | null>>
  dataMap: Ref<DataMap>
}) {
  const loading = ref(false)
  onMounted(async () => {
    await GPUMesh.Mesh.loadDevice()
    const observer = new ResizeObserver(_throttleRenderGPUMesh)
    observer.observe(el.value!)
    loading.value = true
  })
  watch(
    [dataMap, el, loading],
    () => {
      if (!loading.value) return
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      _throttleRenderGPUMesh()
    },
    { deep: true, immediate: true, flush: 'pre' }
  )

  let timer: ReturnType<typeof setInterval> | null = null
  const _renderGPUMesh = () => {
    if (!el.value) return
    el.value.innerHTML = ''
    const options = eval(dataMap.value.options)
    new GPUMesh.Mesh(el.value, {
      vertex: dataMap.value.vertex,
      fragment: dataMap.value.fragment,
      options
    })
    if (options.animation && timer == null) {
      const timeout = options.animationTime || 1000
      timer = setInterval(() => {
        el.value!.innerHTML = ''
        const aniOptions = options.animation()
        new GPUMesh.Mesh(el.value!, {
          vertex: dataMap.value.vertex,
          fragment: dataMap.value.fragment,
          options: aniOptions
        })
      }, timeout)
    }
  }
  const WAIT_TIME = 600
  const _throttleRenderGPUMesh = _throttle(_renderGPUMesh, WAIT_TIME)
}
