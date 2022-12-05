let scene, camera, renderer, space, starGeo;

let height = window.innerHeight;
let width = window.innerWidth;

function init() {
  //creating the scene
  scene = new THREE.Scene();

  //camera
  camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);

  camera.position.z = 10;
  camera.position.y = 20;
  camera.rotation.x = Math.PI / 2;

  //creating a geometry for effect
  starGeo = new THREE.Geometry();
  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    starGeo.vertices.push(star);
  }

  //define a material for the star Geometry
  var starMat = new THREE.PointsMaterial({
    color: "rgb(255,255,255)",
    size: 0.7,
  });

  space = new THREE.Points(starGeo, starMat);
  scene.add(space);

  const canvas = document.getElementById("canvas");
  renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setSize(width, height);

  animate();
}

function animate() {
  starGeo.verticesNeedUpdate = true;
  starGeo.vertices.forEach((e) => {
    e.velocity += e.acceleration;
    e.y -= e.velocity;
    if (e.y < -200) {
      e.y = 200;
      e.velocity = 0;
    }
  });
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
