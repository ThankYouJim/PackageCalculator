/*******************************************
 * Modified functions from gemmy.js 
 *******************************************/
/* Global vars */
/* TODO: change to constant?
 * var constant = function(val) {
 *   return function() {
 *      return val;
 *   }
 * }
 * a = constant(10);
 * a(); // 10
 */
var IMP_TO_IN = 0.028317;
var INCHES_IN_FT = 12;

function subCalcCube() {
    var itemCube = 0;

}

var modValues = [1.5, 2, 2.5];
// I guess this is not quite optimal?
function setMod() {
    var lo = 0;
    for (var i = 1; i <= 3; i++) {
        var opt = document.getElementById('opt' + i);
        opt.innerHTML = "+" + modValues[lo+modFlag];    // TODO: make nicer
        lo = 1 - lo;
    }
    //console.log('Mod: ' + modFlag);
}

function setQty() {
    var div = document.getElementById('qtyCover')

}


/* Copy'n'Paste straight from gemmy.js */
function RoundToNearest(dblNumber) {
    var dblTemp;
    var lngTemp;
    dblTemp = parseFloat(dblNumber) / 0.0001;
    lngTemp = parseInt(dblTemp);
    if (lngTemp == dblTemp) {
        return dblNumber;
    }
    else {
        // round up
        dblTemp = lngTemp + 1;
        return dblTemp * 0.0001;
    }
}
function RoundNumber(obj) {
    if (obj.value == "")
        obj.value = "0";
    obj.value = Math.round(obj.value);
}
function ToFixed(nNumber, nDigits) {
    return FormatNumber(nNumber, nDigits, true)
}
function FormatNumber(num, decimalNum, bolLeadingZero, bolParens, bolCommas)
/**********************************************************************
    IN:
        NUM - the number to format
        decimalNum - the number of decimal places to format the number to
        bolLeadingZero - true / false - display a leading zero for
                                        numbers between -1 and 1
        bolParens - true / false - use parenthesis around negative numbers
        bolCommas - put commas as number separators.
 
    RETVAL:
        The formatted number!
 **********************************************************************/ {
    if (isNaN(parseFloat(num))) return "0." + jReplicate("0", decimalNum);

    var tmpNum = num;
    var iSign = num < 0 ? -1 : 1;		// Get sign of number

	     // Adjust number so only the specified number of numbers after
	     // the decimal point are shown.
    var tmpNum0 = new String(tmpNum)
    tmpNum *= Math.pow(10, decimalNum);
    tmpNum = Math.round(Math.abs(tmpNum))
    var tmpNum1 = new String(tmpNum)
    if (tmpNum1.length < decimalNum)
        tmpNum1 = jReplicate("0", decimalNum - tmpNum1.length) + tmpNum1
    tmpNum /= Math.pow(10, decimalNum);
    tmpNum *= iSign;					// Readjust for sign
    var tmpNum2 = new String(tmpNum)
    if (tmpNum == 0)
        var tmpNumStr = "0." + jReplicate("0", decimalNum)
    else {
        if (tmpNum0.indexOf(".") >= 0) {
            if (tmpNum2.substring(0, 1) == "0")
                var tmpNumStr = "0." + tmpNum1
            else
                var tmpNumStr = tmpNum1.substring(0, tmpNum0.indexOf(".")) + "." + tmpNum1.substring(tmpNum0.indexOf("."), tmpNum1.length)
        }
        else
            var tmpNumStr = tmpNum1.substring(0, tmpNum0.length) + "." + tmpNum1.substring(tmpNum0.length, tmpNum1.length)
    }

	     // Create a string object to do our formatting on
	     //	var tmpNumStr = new String(tmpNum);

	     // See if we need to strip out the leading zero or not.
    if (!bolLeadingZero && num < 1 && num > -1 && num != 0)
        if (num > 0)
            tmpNumStr = tmpNumStr.substring(1, tmpNumStr.length);
        else
            tmpNumStr = "-" + tmpNumStr.substring(2, tmpNumStr.length);

	     // See if we need to put in the commas
    if (bolCommas && (num >= 1000 || num <= -1000)) {
        var iStart = tmpNumStr.indexOf(".");
        if (iStart < 0)
            iStart = tmpNumStr.length;

        iStart -= 3;
        while (iStart >= 1) {
            tmpNumStr = tmpNumStr.substring(0, iStart) + "," + tmpNumStr.substring(iStart, tmpNumStr.length)
            iStart -= 3;
        }
    }

	     // See if we need to use parenthesis
    if (bolParens && num < 0)
        tmpNumStr = "(" + tmpNumStr.substring(1, tmpNumStr.length) + ")";
    return tmpNumStr;		// Return our formatted string!
}

/* General_validation.js */
function CheckNValue(nObj, bNull) {
    var nCapacity = 0;
    nObj.value = nObj.value.replace(/[^0-9|.]/g, '');
    if (nObj.value == '') {
        if (!bNull)
            nObj.value = 0;
        else
            return;
    }
    switch (nObj.ColumnType) {
        case "0":
            nCapacity = 255
            break;
        case "1":
            nCapacity = 32767
            break;
        case "2":
            nCapacity = 2147483647
            break;
        case "3":
            nCapacity = 9223372036854775807
            break;
        default:
            break;
    }
    if (nCapacity == 0)
        return;
    if (parseInt(nObj.value) > nCapacity) {
        alert("Value too big.")
        nObj.value = nObj.OldValue
        return;
    }
    nObj.OldValue = nObj.value;
}

function CheckNumeric(isInteger) {
    // Get ASCII value of key that user pressed
    var key = window.event.keyCode;
    // Was key that was pressed a numeric character (0-9)?
    if (typeof (isInteger) != 'undefined')
        isInteger = isInteger
    else
        isInteger = false;
    if (isInteger) {
        if (key > 47 && key < 58)
            return; // if so, do nothing
        else
            window.event.returnValue = null; // otherwise, 
        // discard character
    }
    else {
        if (key > 45 && key < 58 && key != 47) {
            if (key == 46) {
                var sVal = new String(window.event.srcElement.value);
                if (sVal.indexOf(".", 0) >= 0)
                    window.event.returnValue = null;
            }
            return; // if so, do nothing
        }
        else
            window.event.returnValue = null; // otherwise, 
        // discard character
    }
}