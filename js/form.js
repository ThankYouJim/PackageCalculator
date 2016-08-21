// GLOBAL VARIABLES
var modFlag = 0;
var modValues = [1.5, 2, 2.5];

//Const values
var IMP_MET = 2.54;
var IMP_TO_MET_CUBE = 0.028317;
var INCHES = 12;
var FT_CUBE = 1728;
var M_CUBE = 1000000;

/* TODO: change to constant?
 * var constant = function(val) {
 *   return function() {
 *      return val;
 *   }
 * }
 * a = constant(10);
 * a(); // 10
 */

// I guess this is not quite optimal?
function setMod() {
    var lo = 0;
    for (var i = 1; i <= 3; i++) {
        var opt = document.getElementById('opt' + i);
        opt.innerHTML = "+" + modValues[lo + modFlag];    // TODO: make nicer
        lo = 1 - lo;
    }
    modFlag = 1 - modFlag;
}

// Object to store the package/casing values
function Config() {
    this.w = 0;
    this.d = 0;
    this.h = 0;
    this.cube = 0;
}
var pkg_IMP = new Config(), pkg_MET = new Config(), case_IMP = new Config(), case_MET = new Config();

// Convert val(cm) to inch, and pass the value to the ele reference object
function convertCMtoIN(ele, imperial) {
    var metric = roundToNearest(imperial / IMP_MET);
    ele.val(metric);
    return metric;
}

// Convert inch to cm, and pass the value to the ele reference object
function convertINtoCM(ele, metric) {
    var imperial = roundToNearest(metric * IMP_MET);
    ele.val(imperial);
    return imperial;
}

// Round to 4 places max, but only when necessary.
// (The number of 0's determines desired decimal places.)
function roundToNearest(num) {
   return Math.round((num + 0.00001) * 10000) / 10000;
}

// Calculate and returns cube to 4 decimal places (if applicable)
function calcMCube(w, d, h) {
    return roundToNearest((w * d * h) / M_CUBE);
}
// Same as above but in Metric
function calcFTCube(w, d, h) {
    return roundToNearest((w * d * h) / FT_CUBE);
}

function updateMCaseCube() {
	var opt;
	var q1 = $('#qty1').val();
	var q2 = $('#qty2').val();
	
    opt = parseFloat(document.getElementById('opt' + 1).innerHTML);
    case_IMP.w = pkg_IMP.w * q1 + opt;
    $('#case_IMP_w').val(case_IMP.w);
    opt = parseFloat(document.getElementById('opt' + 3).innerHTML);
    case_IMP.d = pkg_IMP.d * q2 + opt;
    $('#case_IMP_d').val(case_IMP.d);
    opt = parseFloat(document.getElementById('opt' + 2).innerHTML);
    case_IMP.h = parseFloat(pkg_IMP.h) + opt;
    $('#case_IMP_h').val(case_IMP.h);
    
    case_IMP.cube = calcMCube(case_IMP.w, case_IMP.d, case_IMP.h);
    $('#case_IMP_c').val(case_IMP.cube);
    case_IMP.cube = calcMCube(case_IMP.w, case_IMP.d, case_IMP.h);
    $('#case_MET_c').val(case_MET.cube);
}

// All editable inputs will recalculated Imperial to Metric or vice versa on their respective pair.
// And recalculates the cube.
// TODO: redraw the canvas -> or resave an image and reload page to show the change.

// Below: JQuery version for the new 'oninput' listener
//$("#myId").on('change keydown paste input', function () {
//    doSomething();
//});
$('.cell').on('input', function () {
    // Detects which input is changed and updates the respective object values.
    switch (this.name) {
        // PACKAGE : IMPERIAL
        case 'pkg_IMP_w':
            pkg_IMP.w = $('#pkg_IMP_w').val();
            pkg_MET.w = convertCMtoIN($('#pkg_MET_h'), pkg_IMP.w);
            break;
        case 'pkg_IMP_d':
            pkg_IMP.d = $('#pkg_IMP_d').val();
            pkg_MET.d = convertCMtoIN($('#pkg_MET_d'), pkg_IMP.d);
            break;
        case 'pkg_IMP_h':
            pkg_IMP.h = $('#pkg_IMP_h').val();
            pkg_MET.h = convertCMtoIN($('#pkg_MET_h'), pkg_IMP.h);
            break;

        // PACKAGE : METRIC
        case 'pkg_MET_h':
            pkg_MET.w = $('#pkg_MET_h').val();
            pkg_IMP.w = convertINtoCM($('#pkg_IMP_w'), pkg_MET.w);
            break;
        case 'pkg_MET_d':
            pkg_MET.d = $('#pkg_MET_d').val();
            pkg_IMP.d = convertINtoCM($('#pkg_IMP_d'), pkg_MET.d);
            break;
        case 'pkg_MET_h':
            pkg_MET.h = $('#pkg_MET_h').val();
            pkg_IMP.h = convertINtoCM($('#pkg_IMP_h'), pkg_MET.h);
            break;

            /*** CHANGING MASTER CASE VALUES WILL NOT INFLUENCE THE PACKAGE SIDE ***/
            // MASTER CASE : IMPERIAL
        case 'case_IMP_w':
            case_IMP.w = $('#case_MET_w').val();
            case_MET.w = convertCMtoIN($('#case_MET_w'), case_IMP.w);
            break;
        case 'case_IMP_d':
            case_IMP.d = $('#case_IMP_d').val();
            case_MET.d = convertCMtoIN($('#case_MET_d'), case_IMP.d);
            break;
        case 'case_IMP_h':
            case_IMP.h = $('#case_IMP_h').val();
            case_MET.h = convertCMtoIN($('#case_MET_h'), case_IMP.h);

            // MASTER CASE : IMPERIAL
        case 'case_MET_w':
            case_MET.w = $('#case_MET_w').val();
            case_IMP.w = convertINtoCM($('#case_MET_w'), case_MET.w);
            break;
        case 'case_MET_d':
            case_MET.d = $('#case_MET_d').val();
            case_IMP.d = convertINtoCM($('#case_MET_d'), case_MET.d);
            break;
        case 'case_MET_h':
            case_MET.h = $('#case_MET_h').val();
            case_IMP.h = convertINtoCM($('#case_MET_h'), case_MET.h);
            break;

        case 'qty1':
	        q1 = $('#qty1').val();
	        break;
        case 'qty2':
	        q2 = $('#qty2').val();
	        break;
        default:
            break;
    }

    // Upon getting all 3 figures, calculate the cube of the package and calculates master case
    if ((pkg_IMP.w != 0 && pkg_IMP.d != 0 && pkg_IMP.h != 0) || (pkg_MET.w != 0 && pkg_MET.d != 0 && pkg_MET.h != 0)) {
        // Recalculates the cube when the inputs get changed
        pkg_IMP.cube = calcMCube(pkg_IMP.w, pkg_IMP.d, pkg_IMP.h);
        $('#pkgC_M').val(pkg_IMP.cube);

        pkg_MET.cube = calcFTCube(pkg_MET.w, pkg_MET.d, pkg_MET.h);
        $('#pkgC_FT').val(pkg_MET.cube);
        
        // Calculates the Master Case 
    	updateMCaseCube();
    }

});

$('#flip').on('click', function () {
	var temp;
	temp = $('#qty1').val();
	$('#qty1').val($('#qty2').val());
	$('#qty2').val(temp);
	
	updateMCaseCube();
});

function setQty() {
    var div = document.getElementById('qtyCover')

}


// init
(function () {
    setMod();   // This has a delay than rest of the form. Uh?
})();
