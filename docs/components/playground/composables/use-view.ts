import { onMounted, Ref, ShallowRef, watch } from 'vue'
import GPUMesh from '../../../../src/index'
import { DataMap } from '../index'

export default function useView({
  el,
  dataMap
}: {
  el: Readonly<ShallowRef<HTMLElement | null>>
  dataMap: Ref<DataMap>
}) {
  watch(
    dataMap,
    () => {
      console.log('dataMap changed')
    },
    { deep: true }
  )
  onMounted(async () => {
    if (!el.value) return
    await GPUMesh.Mesh.loadDevice()
    new GPUMesh.Mesh(el.value, {
      vertices: new Float32Array([
        -0.8, -0.8, 0.8, -0.8, 0.8, 0.8,
        // Triangle 2
        -0.8, -0.8, 0.8, 0.8, -0.8, 0.8
      ]),
      shader: {
        vertex: `
        @vertex
  fn vertexMain(@location(0) pos: vec2f) ->
    @builtin(position) vec4f {
    return vec4f(pos, 0, 1);
  }`,
        fragment: `
          @fragment
  fn fragmentMain() -> @location(0) vec4f {
    return vec4f(1, 0, 0, 1); // (Red, Green, Blue, Alpha)
  }`
      }
    })
  })
}
