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

## 缓冲区

GPU 很可能会对 uniform 缓冲区进行特殊处理，以使它们的更新和读取速度比存储缓冲区更快，因此对于可能会频繁更新且数量较少的数据（例如模型、视图和投影矩阵），uniform 通常是一种更安全的选择，可以实现更好的性能。

- uniform缓冲区
  - uniform 缓冲区的大小有限，无法支持动态大小的数组（您必须在着色器中指定数组大小），并且无法由计算着色器写入。
- 存储缓冲区
  - 存储缓冲区是通用缓冲区，可以在计算着色器中读取和写入，并在顶点着色器中读取。它们可能非常大，并且不需要在着色器中声明特定大小，因此它们更类似于常规内存。
