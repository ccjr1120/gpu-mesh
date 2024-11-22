@group(0) @binding(0) var<uniform> grid : vec2f;
struct Input {
  @location(0) pos : vec2f,
  @builtin(instance_index) instance : u32
};
struct Output {
  @builtin(position) pos : vec4f,
  @location(0) cell : vec2f
};
@vertex
fn vertexMain(input : Input) ->
Output {
  let i = f32(input.instance);
  let cell = vec2f(i % grid.x, floor(i / grid.x));
  let cellOffset = cell / grid * 2;
  let gridPos = (input.pos + 1) / grid - 1 + cellOffset;

  var output : Output;
  output.pos = vec4f(gridPos, 0, 1);
  output.cell = cell;
  return output;
}
