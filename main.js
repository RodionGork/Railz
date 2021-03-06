function addSleepers(scene) {
    var m = new THREE.MeshLambertMaterial({color: sleeperColor});
    var geom = polyPrismGeometry(sleeperProfile, sleeperWidth);
    for (var i = 0; i < sections; i++) {
        var prism = new THREE.Mesh(geom, m);
        var x = (i - (sections - 1) / 2) * sleeperStep;
        prism.rotation.y = Math.PI / 2;
        prism.position.x += x - sleeperWidth / 2;
        prism.position.y += sleeperShift;
        scene.add(prism);
    }
}

function addRails(scene) {
    var m = new THREE.MeshLambertMaterial({color: railColor});
    var geom = polyPrismGeometry(railProfile, sleeperStep);
    for (var i = 0; i < sections; i++) {
        var x = (i - (sections - 1) / 2) * sleeperStep;
        var rail1 = new THREE.Mesh(geom, m);
        rail1.rotation.y = Math.PI / 2;
        rail1.position.x += x - sleeperStep / 2;
        rail1.position.y += railShift;
        rail1.position.z += railDistance / 2;
        scene.add(rail1);
        var rail2 = new THREE.Mesh(geom, m);
        rail2.rotation.y = Math.PI / 2;
        rail2.position.x += x - sleeperStep / 2;
        rail2.position.y += railShift;
        rail2.position.z -= railDistance / 2;
        scene.add(rail2);
    }
}

function addBallast(scene) {
    var m = new THREE.MeshLambertMaterial({color: ballastColor, transparent: true, opacity: ballastOpacity, side: THREE.DoubleSide});
    var geom = polyPrismGeometry(ballastProfile, sleeperStep * sections);
    var prism = new THREE.Mesh(geom, m);
    prism.rotation.y = Math.PI / 2;
    prism.position.x -= (sleeperStep * sections) / 2;
    prism.position.y += ballastShift;
    scene.add(prism);
}

function addSand(scene) {
    var m = new THREE.MeshLambertMaterial({color: sandColor, transparent: true, opacity: sandOpacity, side: THREE.DoubleSide});
    var geom = polyPrismGeometry(sandProfile, sleeperStep * sections);
    var prism = new THREE.Mesh(geom, m);
    prism.rotation.y = Math.PI / 2;
    prism.position.x -= (sleeperStep * sections) / 2;
    prism.position.y += sandShift;
    scene.add(prism);
}

function addIndicators(scene) {
    window.indicators = [];
    var geom = new THREE.BoxGeometry(indicatorLength, indicatorHeightMax, indicatorWidth);
    var geomTip = new THREE.CylinderGeometry(indicatorWidth / Math.sqrt(2), indicatorWidth / Math.sqrt(2) / 3, indicatorHeightTip, 4);
    geomTip.rotateY(Math.PI / 4);
    geomTip.scale(indicatorLength / indicatorWidth, 1, 1);
    for (var i = 0; i < sections; i++) {
        var row = [];
        for (var j = 0; j < 8; j++) {
            var x = (i - (sections - 1) / 2) * sleeperStep;
            var m = colors[Math.round(data.values[i][j] * 100)];
            var od = new THREE.Mesh(geom, m);
            od.position.x = x;
            od.position.z = indicatorPositions[j];
            od.position.y = indicatorShift;
            scene.add(od);
            var ot = new THREE.Mesh(geomTip, m);
            ot.position.x = x;
            ot.position.z = indicatorPositions[j];
            ot.position.y = indicatorShift - (indicatorHeightMax + indicatorHeightTip) / 2;
            scene.add(ot);
            row.push([[od, od.position.y], [ot, ot.position.y]]);
        }
        window.indicators.push(row);    
    }
}

function loadIndicators() {
    var data = $.ajax(dataSource, {async: false, dataType: "json"});
    return data = JSON.parse(data.responseText);
}

function updateIndicators() {
    var data = loadIndicators();
    if (typeof(data.heights) == 'undefined') {
        data.heights = data.values;
    }
    for (var i = 0; i < sections; i++) {
        for (var j = 0; j < 8; j++) {
            var ind = indicators[i][j];
            var value = data.values[i][j];
            var height = data.heights[i][j];
            var h = (indicatorHeightMax - indicatorHeightMin) * height + indicatorHeightMin;
            var dh = indicatorHeightMax - h;
            ind[0][0].material = colors[Math.round(value * 100)];
            ind[0][0].position.y = ind[0][1] + dh / 2;
            ind[0][0].scale.y = h / indicatorHeightMax;
            ind[1][0].material = colors[Math.round(value * 100)];
            ind[1][0].position.y = ind[1][1] + dh;
        }
    }
}

var data = loadIndicators();
sections = data.values.length;
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
addSand(scene);
addIndicators(scene);

camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 1;
var controls = new THREE.OrbitControls(camera, renderer.domElement);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

render();

setInterval(updateIndicators, updateInterval);

