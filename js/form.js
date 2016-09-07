/******************************************************************************
 * FORM.JS - 
 * All editable inputs will recalculated Imperial to Metric or vice versa on 
 * their respective pair, and recalculates the cube.
 ******************************************************************************/

// CONST
/* TODO: change to constant?
 * var constant = function(val) {
 *   return function() {
 *      return val;
 *   }
 * }
 * a = constant(10);
 * a(); // 10
 */
var MET_IMP = 2.54;
var MET_TO_IMP_CUBE = 0.028317;
var INCHES = 12;
var FT_CUBE = 1728;
var M_CUBE = 1000000;

// PKG_DEFAULT VALUES
var PKG_DEFAULT = {
    w: 20,
    d: 10,
    h: 23,
    q1:3, q2: 2
}

// CUSTOM
var mod = 0;
var modValues = [1.5, 2, 2.5];
var q1, q2;
var pkg_MET, pkg_IMP, case_MET, case_IMP;

init();

/******************************************************************************
 * Math! Yay!
 *****************************************************************************/
// Round to 4 places max, but only when necessary.
// The number of 0's determines no. of desired decimal places.
function roundToNearest(num) {
   return Math.round((num + 0.00001) * 10000) / 10000;
}

// Calculate and returns cube to 4 decimal Metric places (if applicable)
function calcMCube(w, d, h) {
    return roundToNearest((w * d * h) / M_CUBE);
}
// Same as above but in Imperial
function calcFTCube(w, d, h) {
    return roundToNearest((w * d * h) / FT_CUBE);
}

// Convert inch to cm
function convertToMetric(val) {
    return roundToNearest(val * MET_IMP);
}

// Convert cm to inch
function convertToImperial(val) {
    return roundToNearest(val / MET_IMP);
}

/******************************************************************************
 * HTML Event Listeners and Modifiers
 *****************************************************************************/
// Object to store the package/case values
function Config() {
    this.w = 0;
    this.d = 0;
    this.h = 0;
    this.cube = 0;
}

function calcQty() {
    document.getElementById('qtyCover').innerHTML = $('#qty1').val() * $('#qty2').val();
}
function setQty(a, b) {
    $('#qty1').val(a);
    $('#qty2').val(b);
    calcQty();
}

// On button clicked: change appeared modifier values (CM) = [1.5, 2, 2.5];
// a) +1.5, +1.5, +2; or b) +2, +2, +2.5
function setMod() {
    document.getElementById('optW').innerHTML = "+" + modValues[mod];
    document.getElementById('optD').innerHTML = "+" + modValues[mod];
    document.getElementById('optH').innerHTML = "+" + modValues[mod + 1];
    mod = 1 - mod; // so it'll only switch b/w modValues[0] or [1]

    updateMCase();
}

function setMod_Sp() {
    // TODO: As sometimes the padding of the master case might be +2, +2, +2 (CM)
}

// pass the value to the ele reference object
function updateMetricCell(ele, num) {
    ele.val(convertToMetric(num));
}
function updateImperialCell(ele, num) {
    ele.val(convertToImperial(num));
}

function updateAll() {
    pkg_IMP.w = updateImperialCell($('#pkg_IMP_w'), pkg_MET.w);
    pkg_IMP.d = updateImperialCell($('#pkg_IMP_d'), pkg_MET.d);
    pkg_IMP.h = updateImperialCell($('#pkg_IMP_h'), pkg_MET.h);
    //pkg_MET.w = updateMetricCell($('#pkg_MET_w'), pkg_IMP.w);
    //pkg_MET.d = updateMetricCell($('#pkg_MET_d'), pkg_IMP.d);
    //pkg_MET.h = updateMetricCell($('#pkg_MET_h'), pkg_IMP.h);
    case_IMP.w = updateImperialCell($('#case_IMP_w'), case_MET.w);
    case_IMP.d = updateImperialCell($('#case_IMP_d'), case_MET.d);
    case_IMP.h = updateImperialCell($('#case_IMP_h'), case_MET.h);
    calcMCube();
    calcFTCube();
}

// Calculates the case config values according to user input qty and modifier (above)
// This is only in Metric as the modifiers are only considered in Metric on China's side
function updateMCase() {
	var opt;
	var q1 = $('#qty1').val();
	var q2 = $('#qty2').val();
	calcQty();
	
	if (pkg_MET.cube != 0) {
        // W
        opt = parseFloat(document.getElementById('optW').innerHTML);
        case_MET.w = pkg_MET.w * q1 + opt;
        $('#case_MET_w').val(case_MET.w);
        // D
        opt = parseFloat(document.getElementById('optD').innerHTML);
        case_MET.d = pkg_MET.d * q2 + opt;
        $('#case_MET_d').val(case_MET.d);
        // H
        opt = parseFloat(document.getElementById('optH').innerHTML);
        case_MET.h = parseFloat(pkg_MET.h) + opt;
        $('#case_MET_h').val(case_MET.h);
        // Cube
        case_MET.cube = calcMCube(case_MET.w, case_MET.d, case_MET.h);
        $('#case_MET_c').val(case_MET.cube);
        case_IMP.cube = calcFTCube(case_IMP.w, case_IMP.d, case_IMP.h);
        $('#case_IMP_c').val(case_IMP.cube);
	}
}

function setDefault() {
    setQty(PKG_DEFAULT.q1, PKG_DEFAULT.q2);

    $('#pkg_MET_w').val(PKG_DEFAULT.w);
    pkg_MET.w = PKG_DEFAULT.w;
    //pkg_IMP.w = updateImperialCell($('#pkg_IMP_w'), pkg_MET.w);

    $('#pkg_MET_d').val(PKG_DEFAULT.d);
    pkg_MET.d = PKG_DEFAULT.d;
    //pkg_IMP.d = updateImperialCell($('#pkg_IMP_d'), pkg_MET.d);

    $('#pkg_MET_h').val(PKG_DEFAULT.h);
    pkg_MET.h = PKG_DEFAULT.h;
    //pkg_IMP.h = updateImperialCell($('#pkg_IMP_h'), pkg_MET.h);

    pkg_MET.cube = calcMCube(pkg_MET.w, pkg_MET.d, pkg_MET.h);
    //pkg_IMP.cube = calcFTCube(pkg_IMP.w, pkg_IMP.d, pkg_IMP.h);

    updateMCase();
}

// Below: JQuery version for the new 'oninput' listener
// $("#myId").on('change keydown paste input', function () {
//    doSomething();
//});
$('.cell').on('input', function () {
    // Detects which input is changed and updates the respective object values.
    switch (this.name) {
        // PACKAGE : METRIC
        case 'pkg_MET_w':
            pkg_MET.w = $('#pkg_MET_w').val();
            pkg_IMP.w = updateCell($('#pkg_IMP_w'), convertToImperial(pkg_MET.w));
            break;
        case 'pkg_MET_d':
            pkg_MET.d = $('#pkg_MET_d').val();
            pkg_IMP.d = updateImperialCell($('#pkg_IMP_d'), pkg_MET.d);
            break;
        case 'pkg_MET_h':
            pkg_MET.h = $('#pkg_MET_h').val();
            pkg_IMP.h = updateImperialCell($('#pkg_IMP_h'), pkg_MET.h);
            break;

        // PACKAGE : IMPERIAL
        case 'pkg_IMP_w':
            pkg_IMP.w = $('#pkg_IMP_w').val();
            pkg_MET.w = updateMetricCell($('#pkg_MET_w'), pkg_IMP.w);
            break;
        case 'pkg_IMP_d':
            pkg_IMP.d = $('#pkg_IMP_d').val();
            pkg_MET.d = updateMetricCell($('#pkg_MET_d'), pkg_IMP.d);
            break;
        case 'pkg_IMP_h':
            pkg_IMP.h = $('#pkg_IMP_h').val();
            pkg_MET.h = updateMetricCell($('#pkg_MET_h'), pkg_IMP.h);
            break;

            // << CHANGING MASTER CASE VALUES WILL NOT INFLUENCE THE PACKAGE SIDE >>

            // MASTER CASE : METRIC
        case 'case_MET_w':
            case_MET.w = $('#case_MET_w').val();
            case_IMP.w = updateImperialCell($('#case_IMP_w'), case_MET.w);
            break;
        case 'case_MET_d':
            case_MET.d = $('#case_MET_d').val();
            case_IMP.d = updateImperialCell($('#case_IMP_d'), case_MET.d);
            break;
        case 'case_MET_h':
            case_MET.h = $('#case_MET_h').val();
            case_IMP.h = updateImperialCell($('#case_IMP_h'), case_MET.h);

            // MASTER CASE IN IMPERIAL: IS NEVER NEEDED TO BE MODIFIED

        case 'qty1':
	        q1 = $('#qty1').val();
	        break;
        case 'qty2':
	        q2 = $('#qty2').val();
	        break;
        default:
            break;
    }

    // Upon getting all 3 figures (on any side), calculate the cube of the package and calculates master case
    if ((pkg_MET.w != 0 && pkg_MET.d != 0 && pkg_MET.h != 0) || (pkg_IMP.w != 0 && pkg_IMP.d != 0 && pkg_IMP.h != 0)) {
        // Recalculates the cube when the inputs get changed
        pkg_MET.cube = calcMCube(pkg_MET.w, pkg_MET.d, pkg_MET.h);
        $('#pkg_MET_c').val(pkg_MET.cube);

        pkg_IMP.cube = calcFTCube(pkg_IMP.w, pkg_IMP.d, pkg_IMP.h);
        $('#pkg_IMP_c').val(pkg_IMP.cube);
        
        // Calculates the Master Case 
    	  updateMCase();
    }
});

// Switch the two qty values and updates the master case
$('#times').on('click', function () {
	var temp;
	temp = $('#qty1').val();
	$('#qty1').val($('#qty2').val());
	$('#qty2').val(temp);
	calcQty();
	
	updateMCase();
});

// TODO: Show a qty count above the current qty form. 
// Tried but didn't work last time
//function setQty() {
//    var div = document.getElementById('qtyCover')
//}


// init
function init() {
    pkg_MET = new Config(), pkg_IMP = new Config(), case_MET = new Config(), case_IMP = new Config();
    setDefault();
    setMod();   // This has a delay than rest of the form. Uh?
};
