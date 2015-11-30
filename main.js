var dataSource = './data.json';

var dim = {
    n: 1, // overriden from data
    step: 1.0,
    ws: 4.0,
    wr: 2.4,
    wd: 0.2,
    sWidth: 0.4,
    h: 0.2
};

function addSleepers(scene) {
    var m = new THREE.MeshLambertMaterial({color:0x704000});
    w0 = dim.wr - 4 * dim.wd;
    w1 = (dim.ws - w0 - 8 * dim.wd) / 2;
    var g = new THREE.BoxGeometry(dim.sWidth, dim.h, w0);
    var gd = new THREE.BoxGeometry(dim.sWidth, dim.h, dim.wd);
    var ge = new THREE.BoxGeometry(dim.sWidth, dim.h, w1);
    for (var i = 0; i < dim.n; i++) {
        var o = new THREE.Mesh(g, m);
        var x = (i - (dim.n - 1) / 2) * dim.step;
        o.position.x = x;
        scene.add(o);
        addSleeperSide(scene, x, -1, gd, ge, m, w0, w1, data.values[i].slice(0, 4).reverse());
        addSleeperSide(scene, x, 1, gd, ge, m, w0, w1, data.values[i].slice(4));
    }
}

function addSleeperSide(scene, x, f, gd, ge, m, w0, w1, values) {
    var o = new THREE.Mesh(ge, m);
    o.position.x = x;
    o.position.z = f * ((w0 + w1) / 2 + dim.wd * 4);
    scene.add(o);
    for (var j = 0; j < 4; j++) {
        var md = colors[Math.round(values[j] * 100)];
        var od = new THREE.Mesh(gd, md);
        od.position.x = x;
        od.position.z = f * (w0 / 2 + dim.wd * (j + 0.5));
        scene.add(od);
    }
}
function addRails(scene) {
    var n = 2;
    var m = new THREE.MeshLambertMaterial({color:0x909090});
    var g = new THREE.BoxGeometry(dim.step, dim.h, 0.1);
    for (var j = 0; j < dim.n; j++) {
        for (var i = 0; i < n; i++) {
            var o = new THREE.Mesh(g, m);
            o.position.z = (i - (n - 1) / 2) * dim.wr;
            o.position.y = dim.h;
            o.position.x = (j - (dim.n - 1) / 2) * dim.step;
            scene.add(o);
        }
    }
}

function addBallast(scene) {
    var m = new THREE.MeshLambertMaterial({color:0xA0AAAA, transparent: true, opacity: 0.5,
        side: THREE.DoubleSide});
    var p1 = new THREE.PlaneGeometry(dim.step, dim.ws + 0.1);
    var p2 = new THREE.PlaneGeometry(dim.step, 1.6);
    for (var i = 0; i < dim.n; i++) {
        var x = (i - (dim.n - 1) / 2) * dim.step;
        var o1 = new THREE.Mesh(p1, m);
        o1.position.y = -0.1;
        o1.position.x = x;
        o1.rotateX(-Math.PI / 2);
        var o2 = new THREE.Mesh(p2, m);
        o2.position.y = -0.5;
        o2.position.z = - dim.ws / 2 - 0.7;
        o2.position.x = x;
        o2.rotateX(-Math.PI * 2 / 3);
        var o3 = new THREE.Mesh(p2, m);
        o3.position.y = -0.5;
        o3.position.z = dim.ws / 2 + 0.7;
        o3.position.x = x;
        o3.rotateX(-Math.PI / 3);
        scene.add(o1);
        scene.add(o2);
        scene.add(o3);
    }
}

var data = $.ajax(dataSource, {async: false, dataType: "json"});
var data = JSON.parse(data.responseText);
dim.n = data.values.length;
var colors = [];
for (i = 0; i <= 100; i++) {
    var mi0 = 1 - i / 100.0;
    var mi1 = i / 100.0;
    var mcol = new THREE.Color(
        data.color0[0] * mi0 + data.color1[0] * mi1,
        data.color0[1] * mi0 + data.color1[1] * mi1,
        data.color0[2] * mi0 + data.color1[2] * mi1
    );
    colors.push(new THREE.MeshLambertMaterial({color: mcol}));
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
var light2 = new THREE.AmbientLight(0xaaaaaa);
scene.add(light2);

addSleepers(scene);
addRails(scene);
addBallast(scene);

camera.position.z = 5;
camera.position.y = 2;
var controls = new THREE.OrbitControls(camera, renderer.domElement);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();
