import * as THREE from 'three'
import vertexShader from './shader/screen.vert'
import fragmentShader from './shader/screen.frag'
import { Three } from './core/Three'
import { Simulator } from './Simulator'
import { gui } from './Gui'
// import { resolveObjectURL } from 'buffer'


export class Canvas extends Three {
  private simulator: Simulator
  private screen!: THREE.Mesh<THREE.PlaneGeometry, THREE.RawShaderMaterial>

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    const { renderer, size } = this

    const dpr = window.devicePixelRatio
    this.simulator = new Simulator(renderer, size.width / dpr, size.height / dpr)

    this.loadAsset().then((texture) => {
      this.screen = this.createScreen(texture)
      window.addEventListener('resize', this.resize.bind(this))
      renderer.setAnimationLoop(this.anime.bind(this))
    })
  }

  private async loadAsset() {
    const loader = new THREE.TextureLoader()
    // loader.setPath(import.meta.env.BASE_URL)
    // loader.serviceWorker.register(new URL("../service-worker.js"))
    let img = document.createElement('img')
     let src = new URL("../assets/image03.jpg?as=webp", import.meta.url).href
    img.src = src.toString()

  
    // const imageUrl = new URL(
    //   'unsplash.webp?as=webp',
    //   import.meta.url
     
    // );
    // loader.setPath("../assets/")
    const texture = await loader.loadAsync(img.src)
    texture.userData.aspect = texture.source.data.width / texture.source.data.height
    return texture
  }

  private createScreen(texture: THREE.Texture) {
    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.RawShaderMaterial({
      uniforms: {
        tSim: { value: this.simulator.currentHeihgtTexture },
        tSimPrev: { value: this.simulator.prevHeihgtTexture },
        uSimCell: { value: this.simulator.cell },
        tImage: { value: texture },
        uCoveredScale: { value: this.coveredScale(texture.userData.aspect) },
        uMode: { value: 1 },
      },
      vertexShader,
      fragmentShader,
    })
    const mesh = new THREE.Mesh(geometry, material)
    this.scene.add(mesh)

    const obj = {
      color: () => (material.uniforms.uMode.value = 1),
      normal: () => (material.uniforms.uMode.value = 2),
      height: () => (material.uniforms.uMode.value = 3),
    }
    gui.add(obj, 'color')
    gui.add(obj, 'normal')
    gui.add(obj, 'height')

    return mesh
  }

  private resize() {
    this.simulator.resize(this.size.aspect)

    const uniforms = this.screen.material.uniforms
    uniforms.uCoveredScale.value = this.coveredScale(uniforms.tImage.value.userData.aspect)
  }

  private anime() {
    this.simulator.update()
    this.render()
  }

  dispose() {}
}
