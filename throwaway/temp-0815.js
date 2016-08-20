
var w = 400, h = 200; // width and height for both canvases
var angle = 0;

var Package = new CanvasForm();
var MCase = new CanvasForm();

// init()
(function () {
    var a = document.getElementById('pkgCanvas');
    Package.canvas = new Canvas(a, a.getContext('2d'), w, h, "white");

    //setInterval(render, 30);

})();

function render() {
    var t = [];
    var tcube = [];

    // TODO: clear canvas
    Package.canvas.c.clearRect(0, 0, w, h);

    // Calculates new points according to angle and projection
    for (var i = 0; i < axis_vertices.length; i++) {
        var v = axis_vertices[i];
        var r = v.rotateX(angle).rotateY(angle).rotateZ(angle);
        var p = r.project(w, h, 128, 3.5);
        t.push(p);
    }
    // Calculates the cube points
    for (var i = 0; i < cube_vertices.length; i++) {
        var v = cube_vertices[i];
        var r = v.rotateX(angle).rotateY(angle).rotateZ(angle);
        var p = r.project(w, h, 128, 3.5);
        tcube.push(p);
    }

    Package.canvas.drawAxis(t);
    Package.canvas.drawCube(tcube);

    // TODO: clear t and tcube? I don't remember my Interactive 3Ds.

    angle += 2;
}





        <!-- TODO: Make an animation of the arrows and change width/depth on click -->
        <div id="flipArrows" style="display: none">
            &#8645;&#x21C5; <!-- up down arrow -->
            &#8693;&#x21F5; <!-- down up arrow -->
        </div>




     <!-- User clicks on qty, two hidden inputs will show -->
     <!--<input name="qtyCover" type="number"
id="qtyCover" class=".noRange" readonly/>-->