precision mediump float;

uniform sampler2D tSim;
uniform sampler2D tSimPrev;
uniform vec2 uSimCell;
uniform sampler2D tImage;
uniform vec2 uCoveredScale;
uniform int uMode; 

varying vec2 vUv;

void main() {
  vec2 uv = (vUv - 0.5) * uCoveredScale + 0.5;

  float height = texture2D(tSim, vUv).x;
  float prevHeight = texture2D(tSimPrev, vUv).x;
  
  float py = texture2D(tSim, vUv + vec2(0.0, 1.0) * uSimCell).x;
  float ny = texture2D(tSim, vUv - vec2(0.0, 1.0) * uSimCell).x;
  float px = texture2D(tSim, vUv + vec2(1.0, 0.0) * uSimCell).x;
  float nx = texture2D(tSim, vUv - vec2(1.0, 0.0) * uSimCell).x;

  vec3 tangent = normalize(vec3(0.0, uSimCell.y * 2.0, py - ny));
  vec3 bitangent = normalize(vec3(uSimCell.x * 2.0, 0.0, px - nx));
  vec3 normal = normalize(cross(bitangent, tangent));

  float dH = abs(height - prevHeight);
  
  vec3 image;
  image.r = texture2D(tImage, uv - normal.xy * dH * 1.0).r;
  image.g = texture2D(tImage, uv - normal.xy * dH * 1.1).g;
  image.b = texture2D(tImage, uv - normal.xy * dH * 1.2).b;

  if (uMode == 1) {
    // color
    gl_FragColor = vec4(image, 1.0);
  } else if (uMode == 2) {
    // normal
    gl_FragColor = vec4(normal.xy * dH * 10.0, dH * 10.0, 1.0);
  } else {
    // height
    gl_FragColor = vec4(vec3(height), 1.0);
  }
}