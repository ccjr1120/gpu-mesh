@group(0) @binding(0) var<uniform> grid : vec2f;
struct VertexOutput {
  @builtin(position) pos : vec4f,
  @location(0) cell : vec2f
};

@vertex
fn vertexMain(@location(0) pos : vec2 < f32>, @builtin(instance_index) instance : u32) ->
VertexOutput {
  //网格大小：12*12
  let grid = vec2f(22, 12);
  //第一个单元格下标
  let i = f32(instance);
  let cell = vec2f(i % grid.x, floor(i / grid.x));
  //将左边系从-1,1转换成0,2
  let convertPos = pos + 1;
  //计算偏移量
  let cellOffset = cell / grid * 2;
  let gridPos = convertPos / grid - 1 + cellOffset;
  var output : VertexOutput;
  output.pos = vec4f(gridPos, 0, 1);
  output.cell = cell;
  return output;
}
