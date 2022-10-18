import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Scene } from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'








///////////////////////////////// creating canvas and scene and appending canvas to the body ///////////////////////////////////
const canvas=document.createElement('canvas');
document.body.append(canvas);
const scene=new THREE.Scene()
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////// creating loaders for loding stuff///////////////////////////////////////////////////////////
const gltf_loader=new GLTFLoader()
//console.log(gltf_loader)


//matrix tv
gltf_loader.load(

'./test/scene.gltf',


(gltf)=>{
    const object=gltf.scene
    object.castShadow='true'
    object.rotation.y=Math.PI/2
   object.position.y=2
   object.rotation.y=6.3
   object.position.z=-3
   object.scale.set(0.0004,0.0004,0.0004)
    scene.add(object)
}
)

//matrix chair 
gltf_loader.load(

    './test2/scene.gltf',
    
    
    (gltf)=>{
        const object=gltf.scene
        object.castShadow='true'
        object.rotation.y=Math.PI/2
       object.position.y=-4
       object.rotation.y=-0
       object.position.z=8
       object.rotation.z=0
       object.scale.set(6,6,6)
        scene.add(object)
    }
    
    )




const texture_loader=new THREE.TextureLoader()
const home_env_texture=texture_loader.load('/textures/home_env_texture2.jpg')

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////LIGHTS STUFF////////////////////////////////////////////////////////////////////////
const ambient_light=new THREE.AmbientLight('white',0.4)
scene.add(ambient_light);

const point_light=new THREE.PointLight('white',0.8)
scene.add(point_light)
point_light.position.y=20

const point_light2=new THREE.PointLight('#7C63AF',0.8)
scene.add(point_light2)
point_light2.position.y=30
point_light2.rotation.y=Math.PI/3

const point_light3=new THREE.PointLight('#6377AF',0.4)
scene.add(point_light3)
point_light3.position.y=5
///point_light3.rotation.y=Math.PI/3

const point_light4=new THREE.PointLight('white',0.6)
scene.add(point_light4)
point_light4.position.y=5


const point_light5=new THREE.PointLight('white',0.4)
scene.add(point_light5)
point_light5.position.y=7
point_light5.position.z=50
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////objects for measurements ////////////////////////////////////////////////////
const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////geometry ////////////////////////////////////////////////////////////////////
//adding plane 
const home_room_geometry=new THREE.BoxBufferGeometry(20,0.5,20)
const home_room_material=new THREE.MeshStandardMaterial({map:home_env_texture})
home_room_material.metalness=0.7
home_room_material.roughness=0.4
home_room_material.side=THREE.DoubleSide
const home_room=new THREE.Mesh(home_room_geometry,home_room_material)
home_room.position.y=-3
home_room.rotation.y=-7
home_room.rotation.x=-3
scene.add(home_room)
home_room.receiveShadow=true


//bcakground 
const home_env_geometry=new THREE.BoxBufferGeometry(69,69,69,2,2,2)
const home_env_material=new THREE.MeshBasicMaterial({color:'white',wireframe:true})
home_env_material.side=THREE.DoubleSide
const home_env=new THREE.Mesh(home_env_geometry,home_env_material)
scene.add(home_env);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////creating camera and adding it to scene////////////////////////////////////////////////////////
const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.01,1000)
camera.position.z=25
camera.position.y=3
camera.rotation.y=-3
scene.add(camera)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////resizing and full screen/////////////////////////////////////////////////////////////////
window.addEventListener('resize',()=>{
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width,sizes.height)
})
const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true
const renderer=new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


const clock =new THREE.Clock()
const tick= ()=>{
   const elapsed_time=clock.getElapsedTime()
    home_env.rotation.x=elapsed_time
    home_env.rotation.y=elapsed_time
    home_env.rotation.z=elapsed_time
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
}
tick()
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement 
    if(!fullscreenElement)
    {
    canvas.requestFullscreen() 
    }
    else
    {  
    document.exitFullscreen()
    }
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////SOME BASIC TESTING AND CODE //////////////////////////////////////////////
/*


GLTF file contains scene camera and material
BIN contains like data geometry uv coordinates colors etc
other files are just textures 





*/