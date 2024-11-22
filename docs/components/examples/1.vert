// ; (() => {
//   function generateHeartVertices(segments = 400) {
//     const vertices = [];
//     const center = [0, 0]; // 中心点

//     for (let i = 0; i <= segments; i++) {
//       const t1 = (i / segments) * 2 * Math.PI;
//       const t2 = ((i + 1) / segments) * 2 * Math.PI;

//       // 计算点的坐标
//       const x1 = 16 * Math.pow(Math.sin(t1), 3);
//       const y1 = 13 * Math.cos(t1) - 5 * Math.cos(2 * t1) - 2 * Math.cos(3 * t1) - Math.cos(4 * t1);

//       const x2 = 16 * Math.pow(Math.sin(t2), 3);
//       const y2 = 13 * Math.cos(t2) - 5 * Math.cos(2 * t2) - 2 * Math.cos(3 * t2) - Math.cos(4 * t2);

//       // 添加三角形顶点 (中心点, 当前点, 下一个点)
//       vertices.push(...center, x1, y1, x2, y2);
//     }

//     return new Float32Array(vertices);
//   }
//   const vertices = generateHeartVertices()
//     const min = Math.min(...vertices);
//     const max = Math.max(...vertices);

//   const normalVertices = vertices.map(value => (value - min) / (max - min));
//   return {
//     instanceCount: 1,
//     vertices:normalVertices
//   }
// })()
// @fragment
// fn fragmentMain() -> @location(0) vec4f {
//   return vec4<f32>(1.0, 0.0, 0.0, 1.0); // 红色
// }
// @vertex
// fn vertexMain(@location(0) position: vec2<f32>) ->
// @builtin(position) vec4<f32> {
//   return vec4<f32>(position, 0.0, 1.0);
// }
