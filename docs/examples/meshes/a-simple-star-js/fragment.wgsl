@fragment
fn fragmentMain(input : VertexOut) -> @location(0) vec4f {
  let rate = input.rate;
  let color = vec3f(1, 0, 1);
  return vec4f(color, 1);
}
