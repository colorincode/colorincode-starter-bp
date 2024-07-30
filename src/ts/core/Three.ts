import * as THREE from 'three'

export abstract class Three {
  protected readonly renderer: THREE.WebGLRenderer
  protected readonly camera: THREE.PerspectiveCamera
  protected readonly scene: THREE.Scene
  private clock: THREE.Clock

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = this.createRenderer(canvas)
    this.camera = this.createCamera()
    this.scene = this.createScene()
    this.clock = new THREE.Clock()

    window.addEventListener('resize', this._resize.bind(this))
  }

  private createRenderer(canvas: HTMLCanvasElement) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    return renderer
  }

  private createCamera() {
    const camera = new THREE.PerspectiveCamera(50, this.size.aspect, 0.01, 100)
    camera.position.z = 5
    return camera
  }

  private createScene() {
    const scene = new THREE.Scene()
    return scene
  }

  private _resize() {
    const { innerWidth: width, innerHeight: height } = window
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  protected get size() {
    const { width, height } = this.renderer.domElement
    return { width, height, aspect: width / height }
  }

  protected get time() {
    return { delta: this.clock.getDelta(), elapsed: this.clock.getElapsedTime() }
  }

  protected coveredScale(imageAspect: number) {
    const screenAspect = this.size.aspect
    if (screenAspect < imageAspect) return [screenAspect / imageAspect, 1]
    else return [1, imageAspect / screenAspect]
  }

  protected render() {
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.camera)
  }
}
