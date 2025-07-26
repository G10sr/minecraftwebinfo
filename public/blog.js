
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const beeMaxAngle = THREE.MathUtils.degToRad(30);

// CREAR ESCENA, CÁMARA Y RENDERER ANTES DE USARLOS
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Fondo
const backgroundTexture = new THREE.TextureLoader().load('/img/blog/backgroundblog.jpeg');
backgroundTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = backgroundTexture;

// Luz
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// Animar
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
