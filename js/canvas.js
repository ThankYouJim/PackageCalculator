/******************************************************************************
 * CANVAS.JS - 
 ******************************************************************************/
 
// TODO: redraw the canvas -> or resave an image and reload page to show the change.

// GLOBAL
var WIDTH = 300,
    HEIGHT = 150;
var container, scene, camera, renderer;
var controls;
// CAMERA
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// CUSTOM
var pkg, mCase;
var cvs_P, cvs_MC;
var axis;

init();
//render();

function init() {
    // SCENE
    scene = new THREE.Scene();
    // Camera
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(150, 150, 400);
    camera.lookAt(scene.position);
    scene.add(camera);
    //camera.lookAt(scene_P.position);
    //scene_P.add(camera);
    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    //renderer_P = new THREE.WebGLRenderer({ antialias: true });
    //renderer_P.setPixelRatio(window.devicePixelRatio);
    //renderer_P.setSize(WIDTH, HEIGHT);

    //var $canvas_MC = $('#caseCanvas');
    //$canvas_MC.append(renderer_MC.domElement);
    //var $canvas_P = $('#pkgCanvas');
    //$canvas_P.append(renderer_P.domElement);

    // MESH & MATERIALS
    //var geometry = new THREE.BoxGeometry(1, 1, 1);
    //var material = new THREE.MeshBasicMaterial({ wireframe: true });
    //pkg = new THREE.Mesh(geometry, material);
    //pkg.scale.set(pkg_MET.w, pkg_MET.w, pkg_MET.h);
    //scene_P.add(pkg);

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ wireframe: true });
    mCase = new THREE.Mesh(geometry, material);
    mCase.scale.set($('#case_MET_w'), $('#case_MET_d'), $('#case_MET_h'));
    scene.add(mCase);

    // AXIS
    //axis = new THREE.AxisHelper(50);
    //axis.position.x = -(30);  // Always slightly left of the shape
    //scene.add(axis);

    // CONTROLS
    //controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.addEventListener('change', render);
    //controls.enableDamping = true;
    //controls.dampingFactor = 0.9;

    cvs_MC = document.getElementById('caseCanvas');
    cvs_MC.appendChild(renderer.domElement);
    //cvs_P = document.getElementById('pkgCanvas');
    //cvs_P.appendChild(renderer_P.domElement);
}

function render() {
    // To see the dark sides of the cube against the background, set the background color to grey.
    camera.lookAt(scene.position);
    renderer.setClearColor(0xdddddd, 1);
    renderer.render(scene, camera);
}
