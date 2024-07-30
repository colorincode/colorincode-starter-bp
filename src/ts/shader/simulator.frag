uniform vec2 uMouse;
uniform float uSpeed;
uniform float uAspect;
uniform vec2 uCell;

void main()	{
	vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 sUv = uv * 2.0 - 1.0;
  vec2 aspect = vec2(uAspect, 1.0);

  vec4 center = texture2D(textureHeight, uv);
  vec4 px = texture2D(textureHeight, uv + vec2(1.0, 0.0) * uCell);
  vec4 nx = texture2D(textureHeight, uv - vec2(1.0, 0.0) * uCell);
  vec4 py = texture2D(textureHeight, uv + vec2(0.0, 1.0) * uCell);
  vec4 ny = texture2D(textureHeight, uv - vec2(0.0, 1.0) * uCell);
  
  float acc = px.x + nx.x + py.x + ny.x - 4.0 * center.x;
  acc *= 0.5;

  float velo = center.y + acc;
  velo *= 0.99;

  float height = center.x + velo;
  float dist = max(1.0 - distance(sUv * aspect, uMouse * aspect) * 30.0, 0.0);
  height += dist * uSpeed * 2.0;
  height *= 0.998;

	gl_FragColor = vec4(height, velo, 0.0, 1.0);
}