;(() => {
  const GRID_SIZE = 32
  return {
    instanceCount: GRID_SIZE * GRID_SIZE,
    vertices: new Float32Array([
      -0.8, -0.8, 0.8, -0.8, 0.8, 0.8,
      // Triangle 2
      -0.8, -0.8, 0.8, 0.8, -0.8, 0.8
    ]),
    uniform: {
      grid: {
        group: 0,
        binding: 0,
        value: new Float32Array([GRID_SIZE, GRID_SIZE])
      }
    }
  }
})()
