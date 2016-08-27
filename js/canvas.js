// GLOBAL
var WIDTH = 400,
    HEIGHT = 300;
var VIEW_ANGLE = 33,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.z = 100;
var scene = new THREE.Scene();
scene.add(camera);

var mouse = {
    x: 0,
    y: 0
};
document.addEventListener('mousedown', onDocumentMouseDown, false);

var renderer_P = new THREE.WebGLRenderer();
renderer_P.setPixelRatio(window.devicePixelRatio);
renderer_P.setSize(WIDTH, HEIGHT);

var renderer_MC = new THREE.WebGLRenderer();
renderer_MC.setPixelRatio(window.devicePixelRatio);
renderer_MC.setSize(WIDTH, HEIGHT);

var $canvas_P = $('#pkgCanvas');
var $canvas_MC = $('#caseCanvas');
$canvas_P.append(renderer_P.domElement);
$canvas_MC.append(renderer_MC.domElement);

//var box = new THREE.BoxGeometry(pkg_MET.w, pkg_MET.w, pkg_MET.h);
//var box = new THREE.BoxGeometry(40, 40, 40);
//var material = new THREE.MeshBasicMaterial({ wireframe: true });
//mesh = new THREE.Mesh(box, material);
//scene.add(mesh);
//renderer_P.render(scene, camera);

// TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING 

// Materials
var geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// Light source
var light = new THREE.PointLight( 0xFFFF00 );
light.position.set( 10, 0, 10 );
scene.add( light );
renderer_P.setClearColor(0xdddddd, 1);
// To see the dark sides of the cube against the background, set the background color to grey.

var red = new THREE.LineBasicMaterial({ color: "rgb(255, 0, 0)" });
var green = new THREE.LineBasicMaterial({ color: "rgb(0, 255, 0)" });
var blue = new THREE.LineBasicMaterial({ color: "rgb(0, 0, 255)" });


var axisHelper = new THREE.AxisHelper(1);
scene.add(axisHelper);



// TESTING TESTING TESTING TESTING TESTING TESTING TESTING TESTING 

//(function () {
    animate();
//});

    function onDocumentMouseDown(event) {
        mouse.x = (event.clientX - WIDTH / 2);
        mouse.y = (event.clientY - HEIGHT / 2);
    };

function animate() {
    requestAnimationFrame(animate);

    camera.position.x += (mouse.x - camera.position.x) * .05;
    camera.position.y = THREE.Math.clamp(camera.position.y + (-mouse.y - camera.position.y) * .05, 0, 1000);
    camera.lookAt(scene.position);

    renderer_P.render(scene, camera);
}
