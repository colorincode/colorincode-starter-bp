// for this script you only *need* canvas ts and probably mouse, simulator and gui are simply for seeing the controls and changing them on the front end. only need to import three on the canvas scripp

// import jquery , will need this for build to compile correctly when using jquery
import * as jquery from 'jquery';
(window as any).$ = (window as any).jQuery = jquery;
console.log("stepped through imports, help me");

//ELE module
// function menuEle() {
//     // stuff
// }
// export { menuEle };

import { Canvas } from './Canvas'

const canvas = new Canvas(document.querySelector<HTMLCanvasElement>('.webgl-canvas')!)

window.addEventListener('beforeunload', () => {
  canvas.dispose()
})
