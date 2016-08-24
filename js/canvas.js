// GLOBAL
var WIDTH = 400,
    HEIGHT = 300;
var VIEW_ANGLE = 33,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 10000;
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.z = 100;
var scene = new THREE.Scene();
    scene.add(camera);

var renderer_P = new THREE.WebGLRenderer();
var renderer_MC = new THREE.WebGLRenderer();
renderer_P.setPixelRatio(window.devicePixelRatio);
renderer_P.setSize(WIDTH, HEIGHT);
renderer_MC.setPixelRatio(window.devicePixelRatio);
renderer_MC.setSize(WIDTH, HEIGHT);

var $canvas_P = $('#pkgCanvas');
var $canvas_MC = $('#caseCanvas');
$canvas_P.append(renderer_P.domElement);
$canvas_MC.append(renderer_MC.domElement);

//var box = new THREE.BoxGeometry(pkg_MET.w, pkg_MET.w, pkg_MET.h);
var box = new THREE.BoxGeometry(40, 40, 40);
var material = new THREE.MeshBasicMaterial({ wireframe: true });
mesh = new THREE.Mesh(box, material);
scene.add(mesh);

renderer_P.render(scene, camera);

(function () {
    animate();
});

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer_P.render(scene, camera);
}

function Canvas(id) {

};

