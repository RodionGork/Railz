function addSleepers(scene) {
    var n = 21;
    var m = new THREE.MeshLambertMaterial({color:0xA07000});
    var g = new THREE.BoxGeometry(0.4, 0.2, 2);
    for (var i = 0; i < n; i++) {
        var o = new THREE.Mesh(g, m);
        o.position.x = (i - (n - 1) / 2) * 1.0;
        scene.add(o);
    }
}

function addRails(scene) {
    var s = 21;
    var n = 2;
    var m = new THREE.MeshLambertMaterial({color:0x909090});
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

function addBallast(scene) {
    var n = 21;
    var m = new THREE.MeshLambertMaterial({color:0x505555});
    var p1 = new THREE.PlaneGeometry(1, 2.1);
    var p2 = new THREE.PlaneGeometry(1, 1.6);
    for (var i = 0; i < n; i++) {
        var x = (i - (n - 1) / 2) * 1.0;
        var o1 = new THREE.Mesh(p1, m);
        o1.position.y = -0.1;
        o1.position.x = x;
        o1.rotateX(-Math.PI / 2);
        var o2 = new THREE.Mesh(p2, m);
        o2.position.y = -0.5;
        o2.position.z = -1.7;
        o2.position.x = x;
        o2.rotateX(-Math.PI * 2 / 3);
        var o3 = new THREE.Mesh(p2, m);
        o3.position.y = -0.5;
        o3.position.z = 1.7;
        o3.position.x = x;
        o3.rotateX(-Math.PI / 3);
        scene.add(o1);
        scene.add(o2);
        scene.add(o3);
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

var light1 = new THREE.DirectionalLight(0xffffff, 1.0);
light1.position.set(0, 1, 0.5, 0.5);
scene.add(light1);
var light2 = new THREE.AmbientLight(0x777777);
scene.add(light2);

addSleepers(scene);
addRails(scene);
addBallast(scene);
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
