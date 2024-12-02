# Getting Started

## Adding GPU Mesh to Your Project

::: code-group

```bash [npm]
npm install @ccjr/gpu-mesh
```

```bash [yarn]
yarn add @ccjr/gpu-mesh
```

```bash [pnpm]
pnpm add @ccjr/gpu-mesh
```

```bash [bun]
bun add @ccjr/gpu-mesh
```

:::

## Quick Start

```ts
import GPUMesh from '@ccjr/gpu-mesh'

await GPUMesh.Mesh.loadDevice() // 加载WebGPU Device
const gpt = new GPUMesh(el.value, {
  vertex: `@vertex
          fn vertexMain(@location(0) position: vec2<f32>) ->
          @builtin(position) vec4<f32> {
            return vec4<f32>(position, 0.0, 1.0);
          }`,
  fragment: `@fragment
             fn fragmentMain() -> @location(0) vec4f {
               return vec4<f32>(1.0, 0.0, 0.0, 1.0); // 红色
             }`,
  options: {
    instanceCount: 1,
    vertices: new Float32Array([
      -0.8, -0.8, 0.8, -0.8, 0.8, 0.8,
      // Triangle 2
      -0.8, -0.8, 0.8, 0.8, -0.8, 0.8
    ])
  }
})
```

## Options Params

- `instanceCount`: 实例数量，默认为 1
- `vertices`: 顶点数据，类型为 `Float32Array`
- `uniforms`: 传递给顶点着色器的 uniform 数据，格式为`{[k:string]:{group:number,binding:number,value:ArrayBuffer}}`
  - `group`: 组号，用于标识 uniform 属于哪个组
  - `binding`: 绑定点，用于标识 uniform 绑定到哪个插槽
  - `value`: 值，ArrayBuffer 类型，用于传递数据
