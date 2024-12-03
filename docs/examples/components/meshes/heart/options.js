;(() => {
  function generateHeartVertices(segments = 400) {
    const vertices = []
    const center = [0, 0] // 中心点

    for (let i = 0; i <= segments; i++) {
      const t1 = (i / segments) * 2 * Math.PI
      const t2 = ((i + 1) / segments) * 2 * Math.PI

      // 计算点的坐标
      const x1 = 16 * Math.pow(Math.sin(t1), 3)
      const y1 =
        13 * Math.cos(t1) -
        5 * Math.cos(2 * t1) -
        2 * Math.cos(3 * t1) -
        Math.cos(4 * t1)

      const x2 = 16 * Math.pow(Math.sin(t2), 3)
      const y2 =
        13 * Math.cos(t2) -
        5 * Math.cos(2 * t2) -
        2 * Math.cos(3 * t2) -
        Math.cos(4 * t2)

      // 添加三角形顶点 (中心点, 当前点, 下一个点)
      vertices.push(...center, x1, y1, x2, y2)
    }

    return new Float32Array(vertices)
  }
  function normalizeArrayToCenterRange(arr, center = 0, range = 1) {
    const min = Math.min(...arr)
    const max = Math.max(...arr)
    if (max === min) {
      return arr.map(() => center) // 所有值相等时，全为中心点
    }

    return arr.map(
      (value) => center - range + (2 * range * (value - min)) / (max - min)
    )
  }
  const vertices = generateHeartVertices()
  const normalVertices = normalizeArrayToCenterRange(vertices)
  return {
    instanceCount: 22 * 12,
    vertices: normalVertices
  }
})()
