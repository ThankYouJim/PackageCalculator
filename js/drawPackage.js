/* Dunno do stuff here */

// Some general variables

var red = "rgb(255, 0, 0)";
var green = "rgb(0, 255, 0)";
var blue = "rgb(0, 0, 255)";


//function Canvas(a, c) {
//    this.a = a;
//    this.c = c;
//    this.w = 0;
//    this.h = 0;
//    this.color;

//    this.setSize = function(w, h) {
//        this.w = w;
//        this.h = h;
//        this.a.setAttribute('width', w);
//        this.a.setAttribute('height', h);
//    };
//    this.setColor = function(color) {
//        this.color = color;
//        this.c.save();
//        this.c.fillStyle = color;
//        this.c.fillRect(0, 0, w, h);
//        this.c.restore();
//    }
//};

function Canvas(a, c, w, h, color) {
    this.a = a;
    this.c = c;
    this.w = w;
    this.h = h;
    this.a.setAttribute('width', w);
    this.a.setAttribute('height', h);

    this.color = color;
    this.c.save();
    this.c.fillStyle = color;
    this.c.fillRect(0, 0, w, h);
    this.c.restore();
}

function Form() {
    this.w = 0;
    this.d = 0;
    this.h = 0;
    this.cube = 0;
}

// I dunno what to name this so
function CanvasForm() {
    this.canvas;
    this.form_imperial = new Form();
    this.form_metric = new Form();
}


// Unlike in C++, the canvas starts the origin on the left upper corner. 
// Hence, reverse the 1's on y and z
var axis_vertices = [
    new Point3D(0, 0, 0),
    new Point3D(1, 0, 0),
    new Point3D(0, -1, 0),
    new Point3D(0, 0, -1)
];

// copied from http://codentronix.com/2011/04/27/first-experiment-with-html5-a-wireframe-cube/
var cube_vertices = [
    new Point3D(-1, 1, -1),
    new Point3D(1, 1, -1),
    new Point3D(1, -1, -1),
    new Point3D(-1, -1, -1),
    new Point3D(-1, 1, 1),
    new Point3D(1, 1, 1),
    new Point3D(1, -1, 1),
    new Point3D(-1, -1, 1)
];
// Define the vertices that compose each of the 6 faces. These numbers are
// indices to the vertex list defined above.
var cube_faces = [[0, 1, 2, 3], [1, 5, 6, 2], [5, 4, 7, 6], [4, 0, 3, 7], [0, 4, 5, 1], [3, 2, 6, 7]]

function Point2D(x, y) { /* TODO */ }

function Point3D(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.rotateX = function (angle) {
        var rad, cosa, sina, y, z;
        rad = angle * Math.PI / 180;
        cosa = Math.cos(rad);
        sina = Math.sin(rad);
        y = this.y * cosa - this.z * sina;
        z = this.y * sina + this.z * cosa;
        return new Point3D(this.x, y, z);
    }

    this.rotateY = function (angle) {
        var rad, cosa, sina, x, z;
        rad = angle * Math.PI / 180;
        cosa = Math.cos(rad);
        sina = Math.sin(rad);
        z = this.z * cosa - this.x * sina;
        x = this.z * sina + this.x * cosa;
        return new Point3D(x, this.y, z);
    }

    this.rotateZ = function (angle) {
        var rad, cosa, sina, x, y;
        rad = angle * Math.PI / 180;
        cosa = Math.cos(rad);
        sina = Math.sin(rad);
        x = this.x * cosa - this.y * sina;
        y = this.x * sina + this.y * cosa;
        return new Point3D(x, y, this.z);
    }

    this.project = function (viewWidth, viewHeight, fov, viewDistance) {
        var factor, x, y;
        factor = fov / (viewDistance + this.z);
        x = this.x * factor + viewWidth / 2;
        y = this.y * factor + viewHeight / 2;
        return new Point3D(x, y, this.z);
    }
}

// General functions
// TODO: Check if passing a context in the parameter is optimal or not, 
// since it's global anyway
function drawPoint(c, x, y, size, color) {
    c.save();
    c.beginPath();
    c.fillStyle = color;
    c.arc(x, y, size, 0, 2 * Math.PI, true);
    c.fill();
    c.restore();
}

function drawLine(c, p1, p2, width, color) {
    c.save();
    c.beginPath();
    c.moveTo(p1.x, p1.y);
    c.lineTo(p2.x, p2.y);
    c.closePath();
    c.lineWidth = width;
    c.strokeStyle = color;
    c.stroke();
    c.restore();
}

// TODO: how to draw three at once while taking into account the angle and projection
function Axis() {
    //drawLine(c, Origin, pt, 5, blue);
}