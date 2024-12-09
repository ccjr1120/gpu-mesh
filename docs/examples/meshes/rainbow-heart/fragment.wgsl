@fragment
fn fragmentMain(input : VertexOutput) -> @location(0) vec4f {
  let grid = vec2f(22, 12);
  return vec4f(input.cell / grid, 0, 1);
}
