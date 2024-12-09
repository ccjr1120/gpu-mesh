# Learn Notes

一份关于WebGPU的学习笔记，较为离散

## WGSL

- 定义一个函数
  - `fn vertexMain() ->{}`
- 关键字
  - `@location`
  - `@builtin()`
    - `position` 顶点位置
    - `vertex_index` 顶点索引
    - `instance_index` 实例索引

### 一份简单的实例

```js
;(() => {
  const vertices = new Float32Array([-0.8, 0.8, 0.8, 0.8, 0.8, -0.8])
  return {
    instanceCount: 1,
    vertices: vertices
  }
})()
```

```wgsl
@vertex
fn vertexMain(@location(0) pos: vec2f) -> @builtin(position) vec4f {
  return vec4f(pos, 0, 1);
}
@fragment
fn fragmentMain() -> @location(0) vec4f {
  return vec4f(1, 0, 0, 1);
}
```

## Gpu的渲染类型: `primitive.topology`

- `triangle-list` 顶点列表渲染，每个三角形由三个顶点组成，顶点列表中每个顶点的位置都要提供。
- `triangle-strip` 条带渲染，每个三角形由三个顶点组成，顶点列表中每个顶点的位置都要提供，但是每个三角形的顶点顺序是逆时针的。
- `line-list` 线段列表渲染，每个线段由两个顶点组成，顶点列表中每个顶点的位置都要提供。
- `line-strip` 线条带渲染，每个线段由两个顶点组成，顶点列表中每个顶点的位置都要提供，但是每个线段的顶点顺序是逆时针的。
- `point-list` 点列表渲染，每个点由一个顶点组成，顶点列表中每个顶点的位置都要提供。

## Tips

经历这些，我真的很难受😣

- 如果`createRenderPipeline`中设置`layout:'auto'`,那么你的uniform或者storage等需要在shader中使用，否则会报`Bind group layout index (0) doesn't correspond to a bind group for this pipeline`。
  - 我其实还不确定是不是`layout:'auto'`的原因，只是因为目前我还没有自定义过layout，但是我觉得不使用所以没办法自动声明对应的`group layout`是很合理的事情。
  - 不管上面结果如何，这个问题是切实存在的
