function addSleepers(scene) {
    var n = 21;
    var m = new THREE.MeshBasicMaterial({color:0xA07000});
    var g = new THREE.BoxGeometry(0.2, 0.1, 2);
    for (var i = 0; i < n; i++) {
        var o = new THREE.Mesh(g, m);
        o.position.x = (i - (n - 1) / 2) * 1.0;
        scene.add(o);
    }
}

function addRails(scene) {
    var s = 21;
    var n = 2;
    var m = new THREE.MeshBasicMaterial({color:0x909090});
    var g = new THREE.BoxGeometry(1.0, 0.2, 0.1);
    for (var j = 0; j < s; j++) {
        for (var i = 0; i < n; i++) {
            var o = new THREE.Mesh(g, m);
            o.position.z = (i - (n - 1) / 2) * 1.2;
            o.position.y = 0.2;
            o.position.x = (j - (s - 1) / 2) * 1.0;
            scene.add(o);
        }
    }
}

var canvas = $('#myscreen').get(0);
var width = $(canvas).width();
var height = $(canvas).height();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

var rendererProperties = {'canvas':canvas};
var renderer;
try {
    renderer = new THREE.WebGLRenderer(rendererProperties);
} catch (e) {
    renderer = new THREE.CanvasRenderer(rendererProperties);
}
renderer.setSize(width, height);

addSleepers(scene);
addRails(scene);
/*
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
*/

camera.position.z = 5;
camera.position.y = 2;
var controls = new THREE.OrbitControls(camera, renderer.domElement);

function render() {
	requestAnimationFrame(render);
	//cube.rotation.x += 0.1;
    //cube.rotation.y += 0.1;
	renderer.render(scene, camera);
}
render();
