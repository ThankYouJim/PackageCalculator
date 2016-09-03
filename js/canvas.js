/******************************************************************************
 * CANVAS.JS - 
 ******************************************************************************/
 
 // TODO: redraw the canvas -> or resave an image and reload page to show the change.

// GLOBAL
var WIDTH = 400,
    HEIGHT = 300;
var container, scene, camera, renderer;
var controls;
// CAMERA
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// CUSTOM
var pkg, mCase;
var axis;

init();
render();

function init() {
    // SCENE
    var scene = new THREE.Scene();
    // Camera
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(150, 150, 400);
    camera.lookAt(scene.position);
    scene.add(camera);
    // RENDERER
    var renderer_P = new THREE.WebGLRenderer({ antialias: true });
    renderer_P.setPixelRatio(window.devicePixelRatio);
    renderer_P.setSize(WIDTH, HEIGHT);

    var renderer_MC = new THREE.WebGLRenderer({ antialias: true });
    renderer_MC.setPixelRatio(window.devicePixelRatio);
    renderer_MC.setSize(WIDTH, HEIGHT);

    var $canvas_P = $('#pkgCanvas');
    $canvas_P.append(renderer_P.domElement);
    var $canvas_MC = $('#caseCanvas');
    $canvas_MC.append(renderer_MC.domElement);

    // MESH & MATERIALS
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ wireframe: true });
    pkg = new THREE.Mesh(geometry, material);
    pkg.scale.set(pkg_MET.w, pkg_MET.w, pkg_MET.h);
    scene.add(pkg);

    //mCase = new THREE.Mesh(geometry, material);
    //mCase.scale.set(case_MET.w, case_MET.d, case_MET.h);
    //scene.add(mCase);

    // AXIS
    axis = new THREE.AxisHelper(50);
    axis.position.x = -(PKG_DEFAULT.x + 30);  // Always slightly left of the shape

    // CONTROLS
    //controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.addEventListener('change', render);
    //controls.enableDamping = true;
    //controls.dampingFactor = 0.9;

}

function render() {
    // To see the dark sides of the cube against the background, set the background color to grey.
    //camera.lookAt(scene.position);
    //renderer_P.setClearColor(0xdddddd, 1);
    renderer_P.render(scene, camera);
    renderer_MC.render(scene, camera);
}
