﻿// http://threejs.org/examples/?q=trans#misc_controls_transform
// Kinda buggy?

var camera, scene, renderer, control;

init();
render();

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.sortObjects = false;
    document.body.appendChild(renderer.domElement);

    //

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(1000, 500, 1000);
    camera.lookAt(new THREE.Vector3(0, 200, 0));

    scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(500, 10));

    var light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(1, 1, 1);
    scene.add(light);

    var texture = new THREE.TextureLoader().load('textures/crate.gif', render);
    texture.mapping = THREE.UVMapping;
    texture.anisotropy = renderer.getMaxAnisotropy();

    var geometry = new THREE.BoxGeometry(200, 200, 200);
    var material = new THREE.MeshLambertMaterial({ map: texture });

    control = new THREE.TransformControls(camera, renderer.domElement);
    control.addEventListener('change', render);

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    control.attach(mesh);
    scene.add(control);

    window.addEventListener('resize', onWindowResize, false);

    window.addEventListener('keydown', function (event) {

        switch (event.keyCode) {

            case 81: // Q
                control.setSpace(control.space === "local" ? "world" : "local");
                break;

            case 17: // Ctrl
                control.setTranslationSnap(100);
                control.setRotationSnap(THREE.Math.degToRad(15));
                break;

            case 87: // W
                control.setMode("translate");
                break;

            case 69: // E
                control.setMode("rotate");
                break;

            case 82: // R
                control.setMode("scale");
                break;

            case 187:
            case 107: // +, =, num+
                control.setSize(control.size + 0.1);
                break;

            case 189:
            case 109: // -, _, num-
                control.setSize(Math.max(control.size - 0.1, 0.1));
                break;

        }

    });

    window.addEventListener('keyup', function (event) {

        switch (event.keyCode) {

            case 17: // Ctrl
                control.setTranslationSnap(null);
                control.setRotationSnap(null);
                break;

        }

    });

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

function render() {

    control.update();

    renderer.render(scene, camera);

}