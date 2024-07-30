import * as THREE from 'three'
import { GPUComputationRenderer, Variable } from 'three/examples/jsm/misc/GPUComputationRenderer'
import simulator from './shader/simulator.frag'
import { mouse2d } from './Mouse2D'

export class Simulator {
  private gpuCompute: GPUComputationRenderer
  private heightData: { variable: Variable; material: THREE.ShaderMaterial }

  constructor(
    gl: THREE.WebGLRenderer,
    private width: number,
    private height: number,
  ) {
    this.gpuCompute = this.createGPUComputationRenderer(gl, width, height)
    this.heightData = this.createTextureHeight()

    this.setVariableDependencies()
    this.gpuCompute.init()
  }

  private createGPUComputationRenderer(gl: THREE.WebGLRenderer, width: number, height: number) {
    const gpuCompute = new GPUComputationRenderer(width, height, gl)
    if (gl.capabilities.isWebGL2 === false) {
      this.gpuCompute.setDataType(THREE.HalfFloatType)
    }
    return gpuCompute
  }

  private createTextureHeight() {
    const texture = this.gpuCompute.createTexture()

    const variable = this.gpuCompute.addVariable('textureHeight', simulator, texture)
    variable.wrapS = THREE.MirroredRepeatWrapping
    variable.wrapT = THREE.MirroredRepeatWrapping

    const material = variable.material
    material.uniforms['uMouse'] = { value: mouse2d.position }
    material.uniforms['uSpeed'] = { value: 0 }
    material.uniforms['uAspect'] = { value: innerWidth / innerHeight }
    material.uniforms['uCell'] = { value: this.cell }

    return { variable, material }
  }

  private setVariableDependencies() {
    this.gpuCompute.setVariableDependencies(this.heightData.variable, [this.heightData.variable])
  }

  get currentHeihgtTexture() {
    return this.gpuCompute.getCurrentRenderTarget(this.heightData.variable).texture
  }

  get prevHeihgtTexture() {
    return this.gpuCompute.getAlternateRenderTarget(this.heightData.variable).texture
  }

  get cell(): [number, number] {
    return [1 / this.width, 1 / this.height]
  }

  resize(aspect: number) {
    this.heightData.material.uniforms.uAspect.value = aspect
  }

  update() {
    const speed = Math.hypot(...mouse2d.lerp(0.05))
    this.heightData.material.uniforms.uSpeed.value = Math.min(speed * 10.0, 1)
    this.heightData.material.uniforms.uMouse.value = mouse2d.position

    for (let i = 0; i < 5; i++) {
      this.gpuCompute.compute()
    }
  }
}
