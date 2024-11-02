import vert from './assets/vert.wgsl?raw'
import frag from './assets/frag.wgsl?raw'

export const DEFAULT_DATA = {
  vertex: vert,
  fragment: frag,
  options: `(() => {
  return {
    vertices: new Float32Array([
      -0.8, -0.8, 0.8, -0.8, 0.8, 0.8,
      // Triangle 2
      -0.8, -0.8, 0.8, 0.8, -0.8, 0.8
    ])
  }
})()`
}
