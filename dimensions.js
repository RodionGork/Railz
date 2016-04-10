var sleeperColor = 0x704000;
var sleeperWidth = 0.240;
var sleeperStep = 0.625;
var sleeperShift = 0.05;
var sleeperProfile = [
    [-1.375, 0],
    [1.375, 0],
    [1.375, 0.145],
    [1.375 - 0.280, 0.230],
    [1.375 - 0.360, 0.200],
    [1.375 - 0.640, 0.200],
    [1.375 - 0.760, 0.230],
    [1.375 - 1.000, 0.145],
    [-1.375 + 1.000, 0.145],
    [-1.375 + 0.760, 0.230],
    [-1.375 + 0.640, 0.200],
    [-1.375 + 0.360, 0.200],
    [-1.375 + 0.280, 0.230],
    [-1.375, 0.145]
];

var railColor = 0x909090;
var railDistance = 1.760;
var railShift = 0.250;
var railProfile = [
    [-0.075, 0],
    [0.075, 0],
    [0.075, 0.020],
    [0.020, 0.040],
    [0.020, 0.130],
    [0.040, 0.140],
    [0.040, 0.170],
    [0.030, 0.180],
    [-0.030, 0.180],
    [-0.040, 0.170],
    [-0.040, 0.140],
    [-0.020, 0.130],
    [-0.020, 0.040],
    [-0.075, 0.020]
];

var ballastColor = 0x585450;
var ballastShift = -0.5;
var ballastProfile = [
    [-2.0, 0],
    [2.0, 0],
    [1.7, 0.4],
    [1.5, 0.5],
    [-1.5, 0.5],
    [-1.7, 0.4]
];

var sandColor = 0xA09060;
var sandShift = -0.7;
var sandProfile = [
    [-2.4, 0],
    [2.4, 0],
    [2.4, 0.14],
    [2.2, 0.2],
    [-2.2, 0.2],
    [-2.4, 0.14]
];

var indicatorWidth = 0.2;
var indicatorLength = sleeperStep * 0.8;
var indicatorHeight = 0.05;
var indicatorShift = 0.025;
var indicatorPositions = [1.28, 1.08, 0.68, 0.48, -0.48, -0.68, -1.08, -1.28];

