import './style.css'


import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let wingAngle = 0;
let wingSpeed = 0.30;
const maxAngle = 0.5; 
let beeRotationTime = 0;
let beeRotationSpeed = 0.02; 
const beeMaxAngle = THREE.MathUtils.degToRad(30); 



window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); 
});

function animate(){
  requestAnimationFrame( animate );
  block.rotation.y += 0.03;
  block2.rotation.y += 0.03;
  block3.rotation.y += 0.03;
  wingAngle += wingSpeed;

  // Invertir dirección si excede límites
  if (wingAngle > maxAngle || wingAngle < -maxAngle) {
    wingSpeed *= -1;
  }

  // Aplicar rotación relativa al eje X
  rightWingGroup.rotateOnAxis(new THREE.Vector3(1, 0, 0), wingSpeed);
  leftWingGroup.rotateOnAxis(new THREE.Vector3(1, 0, 0), -wingSpeed);
  renderer.render(scene, camera);

  //Hacer animacion de la abeja
  beeRotationTime += beeRotationSpeed;
  const easedRotation = Math.sin(beeRotationTime) * beeMaxAngle;

  block4.rotation.y = easedRotation;
};

function moveCamera() {
  const scrollWidth = window.innerWidth;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const scrollProgress = scrollTop / docHeight; // between 0 and 1

  // Try a moderate camera movement
  camera.position.y = -scrollProgress * 230;

  console.log("Camera position Y: ", camera.position.y);
}
document.body.onscroll = moveCamera;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);


//Bloque de cesped

const geometry = new THREE.BoxGeometry(15, 15, 15);
const textureTop = new THREE.TextureLoader().load('/img/grass_top.jpg');
const textureBottom = new THREE.TextureLoader().load('/img/grass_bottom.jpg');
const textureSides = new THREE.TextureLoader().load('/img/grass_side.jpg');

textureTop.colorSpace = THREE.SRGBColorSpace;
textureBottom.colorSpace = THREE.SRGBColorSpace;
textureSides.colorSpace = THREE.SRGBColorSpace;

const materials = [
  new THREE.MeshStandardMaterial({ map: textureSides, roughness: 0.8}), // right
  new THREE.MeshStandardMaterial({ map: textureSides, roughness: 0.8}), // left
  new THREE.MeshStandardMaterial({ map: textureTop, roughness: 0.8}),   // top
  new THREE.MeshStandardMaterial({ map: textureBottom, roughness: 0.8}),// bottom
  new THREE.MeshStandardMaterial({ map: textureSides, roughness: 0.8}), // front
  new THREE.MeshStandardMaterial({ map: textureSides, roughness: 0.8})  // back
];

const block = new THREE.Mesh(geometry, materials);
block.position.set(20, 0, 0);
scene.add(block);


//bloque de ladrillos
const geometry2 = new THREE.BoxGeometry(15, 15, 15);
const texture2 = new THREE.TextureLoader().load('/img/brickwall.jpg');
texture2.colorSpace = THREE.SRGBColorSpace; 
const material2 = new THREE.MeshStandardMaterial({ map: texture2, roughness: 0.8 });
const block2 = new THREE.Mesh(geometry2, material2);
block2.position.set(-20, -47, 0);
scene.add(block2);

//Bloque tnt
const textureTop3 = new THREE.TextureLoader().load('/img/tnt_top.jpg');
const textureBottom3 = new THREE.TextureLoader().load('/img/tnt_bottom.png');
const textureSides3 = new THREE.TextureLoader().load('/img/tnt_front.png');

textureTop3.colorSpace = THREE.SRGBColorSpace;
textureBottom3.colorSpace = THREE.SRGBColorSpace;
textureSides3.colorSpace = THREE.SRGBColorSpace;

const materials3 = [
  new THREE.MeshStandardMaterial({ map: textureSides3, roughness: 0.8}), // right
  new THREE.MeshStandardMaterial({ map: textureSides3, roughness: 0.8}), // left
  new THREE.MeshStandardMaterial({ map: textureTop3, roughness: 0.8}),   // top
  new THREE.MeshStandardMaterial({ map: textureBottom3, roughness: 0.8}),// bottom
  new THREE.MeshStandardMaterial({ map: textureSides3, roughness: 0.8}), // front
  new THREE.MeshStandardMaterial({ map: textureSides3, roughness: 0.8})  // back
];

const block3 = new THREE.Mesh(geometry, materials3);
block3.position.set(20, -47-47, 0);
scene.add(block3);


//Fondo
const backgroundTexture = new THREE.TextureLoader().load('/img/background.png');
backgroundTexture.colorSpace = THREE.SRGBColorSpace;

scene.background = backgroundTexture;

// AYUDAS E ILUMINACIÓN

//const pointLight = new THREE.PointLight(0xffffff, 1);
//pointLight.position.set(20, 10, 12);
//scene.add(pointLight);
//const LightHelper = new THREE.PointLightHelper(pointLight, 1);
//const gridHelper = new THREE.GridHelper(100, 50);
//scene.add(LightHelper, gridHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

//const controls = new OrbitControls( camera, renderer.domElement );



//ABEJA
const geometry4 = new THREE.BoxGeometry(15, 15, 17);
const textureTop4 = new THREE.TextureLoader().load('/img/bee/beetop.jpg');
const textureBottom4 = new THREE.TextureLoader().load('/img/bee/beebotom.jpg');
const textureSidesRight4 = new THREE.TextureLoader().load('/img/bee/beesideright.jpg');
    textureSidesRight4.repeat.x = -1;
    textureSidesRight4.wrapS = THREE.RepeatWrapping;
const textureSidesLeft4 = new THREE.TextureLoader().load('/img/bee/Beesideleft.jpg');
    textureSidesLeft4.repeat.x = -1;
    textureSidesLeft4.wrapS = THREE.RepeatWrapping;
const textureSidesFront4 = new THREE.TextureLoader().load('/img/bee/beeface.jpg');
const textureSidesBack4 = new THREE.TextureLoader().load('/img/bee/beeback.jpg');
const wingtexture = new THREE.TextureLoader().load('/img/bee/wingright.png');
const patitastexture = new THREE.TextureLoader().load('/img/bee/patitasbee.png');

textureTop4.minFilter = THREE.NearestFilter;
textureBottom4.minFilter = THREE.NearestFilter;
textureSidesRight4.minFilter = THREE.NearestFilter;
textureSidesLeft4.minFilter = THREE.NearestFilter;
textureSidesFront4.minFilter = THREE.NearestFilter;
textureSidesBack4.minFilter = THREE.NearestFilter;
wingtexture.minFilter = THREE.NearestFilter;
patitastexture.minFilter = THREE.NearestFilter; 

textureTop4.magFilter = THREE.NearestFilter;
textureBottom4.magFilter = THREE.NearestFilter;
textureSidesRight4.magFilter = THREE.NearestFilter;
textureSidesLeft4.magFilter = THREE.NearestFilter;
textureSidesFront4.magFilter = THREE.NearestFilter;
textureSidesBack4.magFilter = THREE.NearestFilter;
wingtexture.magFilter = THREE.NearestFilter;
patitastexture.magFilter = THREE.NearestFilter;

textureTop4.generateMipmaps = false;
textureBottom4.generateMipmaps = false;
textureSidesRight4.generateMipmaps = false;
textureSidesLeft4.generateMipmaps = false;
textureSidesFront4.generateMipmaps = false;
textureSidesBack4.generateMipmaps = false;
wingtexture.generateMipmaps = false;
patitastexture.generateMipmaps = false;

const leftwing = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 0.01),
  new THREE.MeshBasicMaterial({ map: wingtexture, transparent: true})
);
const rightwing = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 0.01),
  new THREE.MeshBasicMaterial({ map: wingtexture, transparent: true})
);
const patitasbee = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 0),
  new THREE.MeshBasicMaterial({ map: patitastexture, transparent: true})
);


textureTop4.colorSpace = THREE.SRGBColorSpace;
textureBottom4.colorSpace = THREE.SRGBColorSpace;
textureSidesRight4.colorSpace = THREE.SRGBColorSpace;
textureSidesLeft4.colorSpace = THREE.SRGBColorSpace;
textureSidesFront4.colorSpace = THREE.SRGBColorSpace;
textureSidesBack4.colorSpace = THREE.SRGBColorSpace;
wingtexture.colorSpace = THREE.SRGBColorSpace;
patitastexture.colorSpace = THREE.SRGBColorSpace;
const leftWingGroup = new THREE.Group();
const rightWingGroup = new THREE.Group();

leftWingGroup.add(leftwing);
rightWingGroup.add(rightwing);
leftwing.position.set(0, 5,0);   // Mueve el ala hacia la derecha dentro del grupo
rightwing.position.set(0, 5, 0);

const materials4 = [
  new THREE.MeshStandardMaterial({ map: textureSidesRight4, roughness: 0.8}), // right
  new THREE.MeshStandardMaterial({ map: textureSidesLeft4, roughness: 0.8}), // left
  new THREE.MeshStandardMaterial({ map: textureTop4, roughness: 0.8}),   // top
  new THREE.MeshStandardMaterial({ map: textureBottom4, roughness: 0.8}),// bottom
  new THREE.MeshStandardMaterial({ map: textureSidesFront4, roughness: 0.8}), // front
  new THREE.MeshStandardMaterial({ map: textureSidesBack4, roughness: 0.8})  // back
];


const block4 = new THREE.Mesh(geometry4, materials4);
block4.position.set(-20, -47-47-45, 0);
scene.add(block4);

leftWingGroup.position.set(5, 7, 0);
rightWingGroup.position.set(-5, 7, 0);
rightWingGroup.rotation.y = 190;
leftWingGroup.rotation.y = 190;
patitasbee.rotation.x = 20;
patitasbee.position.set(0, -8, 0);



block4.add(leftWingGroup);
block4.add(rightWingGroup);
block4.add(patitasbee);



// Animación
animate();