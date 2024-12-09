;(() => {
  // 生成3000个随机点, 坐标是[-1, 1]的范围内
  const vertices = new Float32Array(3000 * 2).map(() => Math.random() * 2 - 1)
  const alpha = 0.01
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
  const targetVertices = normalizeArrayToCenterRange(generateHeartVertices())
  // const targetVertices = vertices.map((_, i) => {
  //   const theta = (2 * Math.PI * i) / 3000
  //   return i % 2 === 0
  //     ? 0 + radius * Math.cos(theta)
  //     : 0 + radius * Math.sin(theta)
  // })
  let verticesSnapShot = vertices
  function updateVertices(v, i) {
    const target = targetVertices[i]
    return v + alpha * (target - v)
  }

  return {
    animationTime: 30,
    animation: () => {
      // 每次动画帧更新3000个点的坐标，每次移动0.01的距离
      verticesSnapShot = verticesSnapShot.map((v, i) => updateVertices(v, i))
      return {
        instanceCount: 1,
        vertices: verticesSnapShot,
        primitive: { topology: 'point-list' },
        uniforms: {
          count: {
            value: new Float32Array([3000]),
            group: 0,
            binding: 0
          }
        }
      }
    },
    instanceCount: 1,
    vertices: vertices,
    primitive: { topology: 'point-list' },
    uniforms: {
      count: {
        value: new Float32Array([3000]),
        group: 0,
        binding: 0
      }
    }
  }
})()
