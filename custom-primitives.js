function polyPrismGeometry(polygon, width) {
    var shape = new THREE.Shape();
    var n = polygon.length;
    shape.moveTo(polygon[0][0], polygon[0][1]);
    for (var i = 1; i < n; i++) {
        shape.lineTo(polygon[i][0], polygon[i][1]);
    } 
    shape.lineTo(polygon[0][0], polygon[0][1]);
    return new THREE.ExtrudeGeometry(shape, {amount: width, bevelEnabled: false});
}

