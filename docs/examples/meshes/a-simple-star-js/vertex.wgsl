struct VertexInput{
  @location(0) pos : vec2f,
  @builtin(vertex_index) vertexIndex : u32
};

struct VertexOut{
  @builtin(position) pos : vec4f,
  @location(0) rate : f32
};

@group(0) @binding(0) var<uniform> pointCount : f32;

@vertex
fn vertexMain(input : VertexInput) -> VertexOut {
  var out : VertexOut;
  out.pos = vec4f(input.pos, 0, 1);
  out.rate = f32(input.vertexIndex) / pointCount;
  return out;
}
