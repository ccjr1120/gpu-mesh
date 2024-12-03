export type RenderParams = {
  canvas: HTMLCanvasElement
  device: GPUDevice
  vertex: string
  fragment: string
  options: {
    vertices: Float32Array
    instanceCount?: number
    uniform?: {
      [k: string]: {
        binding: number
        group: number
        value: ArrayBuffer
      }
    }
    primitive?: GPUPrimitiveState
  }
}
const withDefaultOptions = (
  options: RenderParams['options']
): Required<RenderParams['options']> => {
  return {
    ...options,
    instanceCount: options.instanceCount || 1,
    uniform: options.uniform || {},
    primitive: options.primitive || {
      topology: 'triangle-list'
    }
  }
}
export default class MeshRenderer {
  device: GPUDevice
  vertex: string
  fragment: string
  options: Required<RenderParams['options']>
  canvas: HTMLCanvasElement
  canvasCtx: GPUCanvasContext
  constructor({ vertex, fragment, options, device, canvas }: RenderParams) {
    this.vertex = vertex
    this.fragment = fragment
    this.options = withDefaultOptions(options)
    this.canvas = canvas
    this.device = device
    this.canvasCtx = this.setupCanvasContext()
  }

  render() {
    const device = this.device
    const vertices = this.options.vertices
    const vertexShaderModule = this.createShaderModule()
    const { vertexBuffer, vertexBufferLayout } = this.createVertexBL()
    device.queue.writeBuffer(vertexBuffer, 0, vertices)
    const encoder = device.createCommandEncoder()
    const pipeline = this.createPipeline({
      vertexShaderModule,
      vertexBufferLayout
    })
    const renderPass = this.createRenderPass(encoder)
    this.setupUniform(renderPass, pipeline)
    renderPass.setPipeline(pipeline)
    renderPass.setVertexBuffer(0, vertexBuffer)
    renderPass.draw(vertices.length / 2, this.options.instanceCount || 0)
    renderPass.end() // 完成指令队列的记录
    const commandBuffer = encoder.finish() // 结束编码
    this.device.queue.submit([commandBuffer]) // 提交给 GPU 命令队列
  }

  private setupCanvasContext() {
    const ctx = this.canvas.getContext('webgpu')
    if (!ctx) throw new Error('WebGPU not supported')
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat()
    ctx.configure({
      device: this.device,
      format: canvasFormat,
      alphaMode: 'opaque'
    })
    return ctx
  }

  private createVertexBL() {
    const vertices = this.options.vertices
    const vertexBuffer = this.device.createBuffer({
      // 标识，字符串随意写，报错时会通过它定位
      label: 'Gpu Mesh',
      size: vertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    })
    const vertexBufferLayout: GPUVertexBufferLayout = {
      arrayStride: 2 * 4,
      attributes: [
        {
          format: 'float32x2',
          offset: 0,
          shaderLocation: 0
        }
      ]
    }
    return { vertexBuffer, vertexBufferLayout }
  }

  private createPipeline({
    vertexShaderModule,
    vertexBufferLayout
  }: {
    vertexShaderModule: GPUShaderModule
    vertexBufferLayout: GPUVertexBufferLayout
  }) {
    const pipeline = this.device.createRenderPipeline({
      label: 'pipeline', // 标识，定位错误用
      layout: 'auto', // 自动流水线布局
      vertex: {
        module: vertexShaderModule, // 着色器模块
        entryPoint: 'vertexMain', // 入口函数为 vertexMain
        buffers: [vertexBufferLayout] // 读取缓冲区的方式
      },
      fragment: {
        module: vertexShaderModule,
        entryPoint: 'fragmentMain',
        targets: [
          {
            format: navigator.gpu.getPreferredCanvasFormat() // 输出到 canvas 画布上
          }
        ]
      },
      primitive: this.options.primitive
    })
    return pipeline
  }

  private createShaderModule() {
    const vertexShaderModule = this.device.createShaderModule({
      label: 'Mesh Shader',
      code: `
      ${this.vertex}
      ${this.fragment}
    `
    })
    return vertexShaderModule
  }

  private createRenderPass(encoder: GPUCommandEncoder) {
    const renderPass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.canvasCtx.getCurrentTexture().createView(),
          loadOp: 'clear',
          clearValue: { r: 0, g: 0, b: 0.4, a: 0 },
          storeOp: 'store'
        }
      ]
    })
    return renderPass
  }

  private setupUniform(
    pass: GPURenderPassEncoder,
    pipeline: GPURenderPipeline
  ) {
    const device = this.device
    const groupMap = Object.groupBy(
      Object.entries(this.options.uniform).map((item) => ({
        key: item[0],
        ...item[1]
      })),
      (item) => item.group
    )
    Object.entries(groupMap).forEach(([k, v]) => {
      const bindGroupEntries: GPUBindGroupEntry[] =
        v?.map((item) => {
          const buffer = device.createBuffer({
            label: item.key,
            size: item.value.byteLength,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
          })
          device.queue.writeBuffer(buffer, 0, item.value)
          return { binding: item.binding, resource: { buffer } }
        }) || []
      if (bindGroupEntries.length > 0) {
        const bindGroup = device.createBindGroup({
          label: `Group`,
          layout: pipeline.getBindGroupLayout(+k),
          entries: bindGroupEntries
        })
        pass.setBindGroup(+k, bindGroup)
      }
    })
  }
}
