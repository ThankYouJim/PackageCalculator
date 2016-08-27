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


//$('#saveAsExcelBtn').on('click', function () {
//    alert("Excel");
//});



// Magic stuff where when the qty input is clicked, it switch to a split input form
// that display x * y value that equals the qty
// It is 6(2*3) by default
// TODO: smart calculation determine which config formation is optimal (via smaller cubic value?)
function setQtyBy() {
    var cover = document.getElementById('qtyByCover');
    var hide = document.getElementById('qtyByHidden');

    if (cover.style.display == "inline" && hide.style.display == "none") {
        cover.style.display = "none";
        hide.style.display = "inline";
    }
    else if (cover.style.display == "none" && hide.style.display == "inline") {
        cover.style.display = "inline";
        hide.style.display = "none";
    }
};




$(document).ready(function () {
    $("#btnExport").click(function () {
        $("#tblExport").btechco_excelexport({
            containerid: "tblExport"
           , datatype: $datatype.Table
        });
    });
});