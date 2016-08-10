/********************************************
 * Copied straight from Gemmy page 
 ********************************************/
var oRow;
var searchStr;
var allowfocus;
var bShowItem = false;

function xmlCallProcLG(oCbx) {   // parentElement is replaced by parentNode
    // 16.06.09		
    var cbxTextId = oCbx.getAttribute('textId');
    var cbxFunction = oCbx.getAttribute('changeFunction');
    var procname = oCbx.getAttribute('ProcName')
    oRowTemp = oCbx.parentNode.parentNode;
    oTable = oRowTemp.parentNode.parentNode;
    var nRowIndex = 1;
    if (oTable.getAttribute("lastRow"))
        nRowIndex = oTable.getAttribute("lastRow");
    oRow = oTable.rows[nRowIndex];
    //oldRequestNo = oRow.cells[6].children[1].value;
    //oldStatus = oRow.cells[7].children[0].innerHTML;			
    sURL = "GIMFetchItemsLG.aspx?isConfig=1&MatchValue=" + document.getElementById(oCbx.getAttribute('textId')).value + "&CurrentValue=" + getCbxTextValue(oCbx) + "&ProcName=" + procname + "&textId=" + cbxTextId + "&comboId=" + oCbx.id + "&comboWidth=" + oCbx.nWidth + "&changeFunction=" + cbxFunction + "&ItemNo=" + document.getElementById('txtItemNo').value + "&CustId=" + oRow.cells[7].childNodes[3].value;
    var canItWork = importXML(sURL, 'managestatechangeLG', false, oCbx.id);
}

function managestatechangeLG(retStr, cboId) {
    var oCbx = document.getElementById(cboId)
    var OldValue, OldText;
    OldValue = "";
    OldText = "";
    if (oCbx.selectedIndex > -1) {
        OldValue = oCbx.options[oCbx.selectedIndex].value;
        OldText = oCbx.options[oCbx.selectedIndex].text;
    }
    var curIndex;
    if (retStr.length == 0 || retStr.indexOf("emptyhtml") >= 0) {
        alert("No matching records found.");
        curIndex = 0
        if (oCbx.selectedIndex >= 0)
            curIndex = oCbx.selectedIndex;
        if (oCbx.options.length > 0)
            document.getElementById(oCbx.getAttribute('textId')).value = oCbx.options[curIndex].text
        document.getElementById(oCbx.getAttribute('textId')).allowfocus = "false";
        return;
    }
    document.getElementById(oCbx.getAttribute('textId')).allowfocus = "false";
    var cmbData = retStr.split("=END=");
    // Fire Fox
    if (browserName == 'Netscape')
        oCbx.innerHTML = cmbData[0];
        // IE
    else
        oCbx.outerHTML = cmbData[0];
    oCbx = document.getElementById(cboId)
    curIndex = 0
    if (oCbx.selectedIndex >= 0)
        curIndex = oCbx.selectedIndex;
    oCbx.OldValue = OldValue;
    oCbx.OldText = OldText;
    if (document.getElementById(oCbx.getAttribute('textId')).value.toUpperCase() != oCbx.options[curIndex].text.toUpperCase()) {
        if (document.getElementById(oCbx.getAttribute('textId')).getAttribute('isEnter') == "true") {
            alert("Stock does not exist or Invalid Request Number.")
            oRow.cells[6].childNodes[0].innerHTML = oRow.cells[7].childNodes[5].value; //oldRequestNo;
            oRow.cells[6].childNodes[1].value = oRow.cells[7].childNodes[5].value; //oldRequestNo;
            oRow.cells[7].childNodes[0].innerHTML = oRow.cells[7].childNodes[6].value; //oldStatus;
        }
        if (OldValue != "")
            oCbx.value = OldValue;
        document.getElementById(oCbx.getAttribute('textId')).value = OldText;
        return;
    }
    document.getElementById(oCbx.getAttribute('textId')).value = oCbx.options[oCbx.selectedIndex].text;
    oCbx.onchange();
}
function getCbxTextValue(oCbx) {
    CbxTextValue = "";
    if (oCbx.options.length > 0) {
        if (oCbx.selectedIndex >= 0)
            CbxTextValue = oCbx.options[oCbx.selectedIndex].text;
    }
    return CbxTextValue;
}
function GetPkgDetails(obj) {
    var requestId = document.getElementById(obj.getAttribute('textId')).value
    if (obj.value == "")
        return;
    oRowTemp = obj.parentElement.parentElement;
    oTable = oRowTemp.parentElement.parentElement;
    var nRowIndex = 1;
    if (oTable.getAttribute("lastRow"))
        nRowIndex = oTable.getAttribute("lastRow");
    oRow = oTable.rows[nRowIndex];
    sURL = "GIMFetchPkgRequestDetails.aspx?ItemNo=" + document.getElementById('txtItemNo').value + "&CustId=" + oRow.cells[7].childNodes[3].value + "&RequestNo=" + requestId;
    var canItWork = importXML(sURL, 'managestatechangeStock');
}

function managestatechangeStock(retStr) {
    if (retStr.length == 0 || retStr.indexOf("emptyhtml") >= 0) {
        oRowTemp = GIMItemConfig_LGGemmyStock_LG_PackageRequestNo.parentNode.parentNode;
        oTable = oRowTemp.parentNode.parentNode;
        var nRowIndex = 1;
        if (oTable.getAttribute("lastRow"))
            nRowIndex = oTable.getAttribute("lastRow");
        oRow = oTable.rows[nRowIndex];
        oRow.cells[6].childNodes[0].innerHTML = oRow.cells[7].childNodes[5].value; //oldRequestNo;
        oRow.cells[6].childNodes[1].value = oRow.cells[7].childNodes[5].value; //oldRequestNo;
        oRow.cells[7].childNodes[0].innerHTML = oRow.cells[7].childNodes[6].value; //oldStatus;
        return alert("The request number cannot be assigned to the selected stock number.");
    }
    arrRetStr = retStr.split("=seperator=");
    oTable = oRow.parentNode.parentNode;
    oRowLast = oTable.rows[oTable.rows.length - 1];
    oRow.cells[6].childNodes[0].innerHTML = arrRetStr[0];
    oRow.cells[6].childNodes[1].value = arrRetStr[0];
    oRow.cells[7].childNodes[0].innerHTML = arrRetStr[1];
    //Set hidden fields to save new values
    oRow.cells[7].childNodes[5].value = arrRetStr[0];
    oRow.cells[7].childNodes[6].value = arrRetStr[1];
}

function subCalcItemCube() {
    var itemCube = 0;

    if ("" != $('#D').val() || "" != $('#W').val() || "" != $('#H').val()) {
        itemCube = RoundToNearest((parseFloat($('#W').val()) / 12) * (parseFloat($('#D').val()) / 12) * (parseFloat($('#H').val()) / 12));

        $('#ImperialCube').val(ToFixed(itemCube, 4));
    }

    // I think this converts from Ft cube to M cube. Weird.
    if ("" != $('#D').val() || "" != $('#W').val() || "" != $('#H').val()) {
        itemCube = parseFloat($('#ImperialCube').val()) * 0.028317;

        $('#MetricCube').val(ToFixed(RoundToNearest(itemCube), 4));
    }

    subGetELC();
}

function subCalcRetailPkCube() {
    var itemCube = 0;

    if ("" != $('#GIMItemConfig_txtRetailPkImperialLength_txtNumeric').val() || "" != $('#GIMItemConfig_txtRetailPkImperialWidth_txtNumeric').val() || "" != $('#GIMItemConfig_txtRetailPkImperialHeight_txtNumeric').val()) {
        itemCube = RoundToNearest((parseFloat($('#GIMItemConfig_txtRetailPkImperialWidth_txtNumeric').val()) / 12) * (parseFloat($('#GIMItemConfig_txtRetailPkImperialLength_txtNumeric').val()) / 12) * (parseFloat($('#GIMItemConfig_txtRetailPkImperialHeight_txtNumeric').val()) / 12));

        $('#GIMItemConfig_txtRetailPkImperialCube_txtNumeric').val(ToFixed(itemCube, 4));
    }

    if ("" != $('#GIMItemConfig_txtRetailPkMetricLength_txtNumeric').val() || "" != $('#GIMItemConfig_txtRetailPkMetricWidth_txtNumeric').val() || "" != $('#GIMItemConfig_txtRetailPkMetricHeight_txtNumeric').val()) {
        itemCube = parseFloat($('#GIMItemConfig_txtRetailPkImperialCube_txtNumeric').val()) * 0.028317;

        $('#GIMItemConfig_txtRetailPkMetricCube_txtNumeric').val(ToFixed(RoundToNearest(itemCube), 4));
    }
}

function subCalcPackageCube() {
    var itemCube = 0;

    if ("" != $('#GIMItemConfig_txtPackageImperialLength_txtNumeric').val() || "" != $('#GIMItemConfig_txtPackageImperialWidth_txtNumeric').val() || "" != $('#GIMItemConfig_txtPackageImperialHeight_txtNumeric').val()) {
        itemCube = RoundToNearest((parseFloat($('#GIMItemConfig_txtPackageImperialWidth_txtNumeric').val()) / 12) * (parseFloat($('#GIMItemConfig_txtPackageImperialLength_txtNumeric').val()) / 12) * (parseFloat($('#GIMItemConfig_txtPackageImperialHeight_txtNumeric').val()) / 12));

        $('#GIMItemConfig_txtPackageImperialCube_txtNumeric').val(ToFixed(itemCube, 4));
    }

    if ("" != $('#GIMItemConfig_txtPackageMetricLength_txtNumeric').val() || "" != $('#GIMItemConfig_txtPackageMetricWidth_txtNumeric').val() || "" != $('#GIMItemConfig_txtPackageMetricHeight_txtNumeric').val()) {
        itemCube = parseFloat(frmItem.GIMItemConfig_txtPackageImperialCube_txtNumeric.value) * 0.028317;

        $('#GIMItemConfig_txtPackageMetricCube_txtNumeric').val(ToFixed(RoundToNearest(itemCube), 4));
    }
}

function subCalcCaseCube() {
    var itemCube = 0;

    if ("" != $('#GIMItemConfig_txtMasterImperialLength_txtNumeric').val() || "" != $('#GIMItemConfig_txtMasterImperialWidth_txtNumeric').val() || "" != $('#GIMItemConfig_txtMasterImperialHeight_txtNumeric').val()) {
        itemCube = (parseFloat($('#GIMItemConfig_txtMasterImperialWidth_txtNumeric').val()) / 12) * (parseFloat($('#GIMItemConfig_txtMasterImperialLength_txtNumeric').val()) / 12) * (parseFloat($('#GIMItemConfig_txtMasterImperialHeight_txtNumeric').val()) / 12);

        $('#GIMItemConfig_txtMasterImperialCube_txtNumeric').val(ToFixed(RoundToNearest(itemCube), 4));
    }

    if ("" != $('#GIMItemConfig_txtMasterMetricLength_txtNumeric').val() || "" != $('#GIMItemConfig_txtMasterMetricWidth_txtNumeric').val() || "" != $('#GIMItemConfig_txtMasterMetricHeight_txtNumeric').val()) {
        itemCube = parseFloat($('#GIMItemConfig_txtMasterImperialCube_txtNumeric').val()) * 0.028317;

        $('#GIMItemConfig_txtMasterMetricCube_txtNumeric').val(ToFixed(RoundToNearest(itemCube), 4));
    }

    subGetELC();
}

function subCalcInneCaseCube() {
    var itemCube = 0;

    if ("" != $('#GIMItemConfig_txtInnerImperialLength_txtNumeric').val() || "" != $('#GIMItemConfig_txtInnerImperialWidth_txtNumeric').val() || "" != $('#GIMItemConfig_txtInnerImperialHeight_txtNumeric').val()) {
        itemCube = RoundToNearest((parseFloat($('#GIMItemConfig_txtInnerImperialWidth_txtNumeric').val()) / 12) * (parseFloat($('#GIMItemConfig_txtInnerImperialLength_txtNumeric').val()) / 12) * (parseFloat($('#GIMItemConfig_txtInnerImperialHeight_txtNumeric').val()) / 12));

        $('#GIMItemConfig_txtInnerImperialCube_txtNumeric').val(ToFixed(itemCube, 4));
    }

    if ("" != $('#GIMItemConfig_txtInnerImperialLength_txtNumeric').val() || "" != $('#GIMItemConfig_txtInnerImperialWidth_txtNumeric').val() || "" != $('#GIMItemConfig_txtInnerImperialHeight_txtNumeric').val()) {
        itemCube = parseFloat($('#GIMItemConfig_txtInnerImperialCube_txtNumeric').val()) * 0.028317;

        $('#GIMItemConfig_txtInnerMetricCube_txtNumeric').val(ToFixed(RoundToNearest(itemCube), 4));
    }
}

function subGetELC() {
    var elc = 0;
    var duty = 0;
    var dutyPerValue = 0;
    var dutyPerWeight = 0;
    var dutyPerPiece = 0;
    var itemWeightKgs = 0;
    var masterCasePackQty = 0;
    var fobPrice = 0;
    var freightRate = 0;
    var freight = 0;

    itemWeightKgs = parseFloat($('#GIMItemConfig_txtItemMetricWeight_txtNumeric').val());
    masterCasePackQty = parseInt($('#GIMItemConfig_txtMasterMetricPackQty_txtNumeric').val());
    fobPrice = parseFloat($('#configFldFOBPrice').val());
    freightRate = parseFloat($('#configSngFreightRate').val());
    dutyPerValue = fobPrice * (parseFloat($('#GIMItemConfig_hdnTotalDutyRatePerValue').val()) / 100);

    if ('3' == $('#configFldUnit').val()) {
        dutyPerWeight = (itemWeightKgs * masterCasePackQty) * parseFloat($('#GIMItemConfig_hdnTotalDutyRatePerWeight').val());
        dutyPerPiece = (itemWeightKgs * masterCasePackQty) * parseFloat($('#GIMItemConfig_hdnTotalDutyRatePerPiece').val());

        freight = parseFloat($('#GIMItemConfig_txtMasterImperialCube_txtNumeric').val()) * freightRate;
    }
    else {
        dutyPerWeight = itemWeightKgs * parseFloat($('#GIMItemConfig_hdnTotalDutyRatePerWeight').val());
        dutyPerPiece = itemWeightKgs * parseFloat($('#GIMItemConfig_hdnTotalDutyRatePerPiece').val());

        freight = (parseFloat($('#GIMItemConfig_txtMasterImperialCube_txtNumeric').val()) / masterCasePackQty) * freightRate;
    }

    duty = dutyPerValue + dutyPerWeight + dutyPerPiece;

    elc = fobPrice + duty + freight;

    $('#GIMItemConfig_txtELC').val(formatCurrencyVB(ToFixed(elc, 5)));
}

function chkMasterPack(obj) {
    if (obj.value == 0) {
        alert('Value cannot be 0');
        obj.value = obj.oldVal;
        return;
    }
    obj.oldVal = obj.value;
    subGetELC();
}

function rNearest(cVal) {
    var tmp = new Number(cVal)
    //return tmp.toFixed(4)
    return ToFixed(tmp, 4)
}
function subConvertFTtoM(ctlCM, v) {
    var varIn;
    ctlIN = document.getElementById(v);
    ctlCM.value = ToFixed(ctlCM.value, 4);

    if (ctlCM.value != "") {
        varIn = RoundToNearest(parseFloat(ctlCM.value) * .3048)

        ctlIN.value = ToFixed(varIn, 4);
    }
}

function subConvertMtoFT(ctlCM, v) {
    var varIn;
    ctlIN = document.getElementById(v);
    ctlCM.value = ToFixed(ctlCM.value, 4);
    if (ctlCM.value != "") {
        varIn = RoundToNearest(parseFloat(ctlCM.value) * 3.281)
        //ctlIN.value=varIn.toFixed(4);// rNearest(varIn);
        ctlIN.value = ToFixed(varIn, 4);// rNearest(varIn);
    }
}

function subConvertCMtoIN(ctlCM, v, ctlSubChange) {
    var varIn;
    ctlCM.value = ToFixed(ctlCM.value, 4);
    ctlIN = document.getElementById(v);
    if (ctlCM.value != "") {
        varIn = RoundToNearest(parseFloat(ctlCM.value) * .3937)
        //ctlIN.value=varIn.toFixed(4);
        ctlIN.value = ToFixed(varIn, 4);
    }
    if (ctlSubChange) {
        document.getElementById(ctlSubChange).value = ctlCM.value;
        document.getElementById(ctlSubChange).onchange();
    }
}

function subConvertINtoCM(ctlIN, v, ctlSubChange) {
    ctlCM = document.getElementById(v);
    var varCM;
    ctlIN.value = ToFixed(ctlIN.value, 4);
    if (ctlCM.value != "") {
        varCM = RoundToNearest(parseFloat(ctlIN.value) / .3937)
        //ctlCM.value=varCM.toFixed(4);
        ctlCM.value = ToFixed(varCM, 4);
    }
    if (ctlSubChange) {
        document.getElementById(ctlSubChange).value = ctlIN.value;
        document.getElementById(ctlSubChange).onchange();
    }
}
function subConvertKGStoLBS(ctlKGS, v) {
    ctlLBS = document.getElementById(v);
    var varLBS;
    ctlKGS.value = ToFixed(ctlKGS.value, 4);
    if (ctlKGS.value != "") {
        varLBS = RoundToNearest(parseFloat(ctlKGS.value) * 2.205)
        //ctlLBS.value=varLBS.toFixed(4);
        ctlLBS.value = ToFixed(varLBS, 4);
    }
}
function subConvertLBStoKGS(ctlLBS, v) {
    ctlKGS = document.getElementById(v);
    var varKGS;
    ctlLBS.value = ToFixed(ctlLBS.value, 4);
    if (ctlLBS.value != "") {
        varKGS = RoundToNearest(parseFloat(ctlLBS.value) * 0.4536)
        //ctlKGS.value=varKGS.toFixed(4);
        ctlKGS.value = ToFixed(varKGS, 4);
    }
}
function subTakeAction(sId) {
    if (frmItem.GIMItemConfig_hdAction.value == "A") {
        frmItem.GIMItemConfig_hdAction.value = ""
    }


    if (document.frmItem.GIMItemConfig_hdConfigDefault.value == "1") {
        if (document.frmItem.GIMItemConfig_chkDefaultConfig.checked == false) {
            alert("Atleast One Configuaration value must be Default.")
            document.frmItem.GIMItemConfig_chkDefaultConfig.checked = true
            return false
        }
    }
    frmItem.HdnAction.value = "Edit"
    frmItem.HdnId.value = sId.getAttribute("idProperty");
    blockPage();
    loadSpan.innerText = "Loading Configuration...";
    document.getElementById('cbxText').focus();
    frmItem.submit();
}
// Modified On:03.23.09
// New Rule to delete the config Id CR-39
function ConfirmDelete(sId, flag, ordQty, inOrder, IsConfigInUse) {
    if (document.forms[0].rightsDelete.value == "0")
        return alert("No rights to Delete.")
    if (document.forms[0].rightsSite.value == "0")
        return alert("No rights to Delete.")
    if (IsConfigInUse == 1)
        return alert("Configuration is in package request and cannot be deleted.");
    if (inOrder != "0")
        return alert("Configuration is ordered or in Assortment sub item. Cannot be delete.")
    if (flag == "Yes") {
        alert("Cannot delete default Configuration")
        return false;
    }
    if (window.confirm("Are you sure, you want to delete this Item") == true) {
        frmItem.HdnAction.value = "Delete"
        frmItem.HdnId.value = sId.getAttribute("idProperty");
        frmItem.submit();

    }
}
//New code on 02/28/2007
function ChangeBatteryInc(obj) {
    /*if (frmItem.GIMItemConfig_ChkTryMe.checked == true)
    {
        obj.checked=true;
    }
    else
    {
        obj.checked=false;		
    }
    return true;*/
}
//End
function ChangeTryme(obj) {
    if (obj.checked == true) {
        frmItem.GIMItemConfig_cboConfigTryMe_List.disabled = false;
        setCmbIndex(frmItem.GIMItemConfig_cboConfigTryMe_List, "1")
        //ADDED ON 02/28/2007
        frmItem.GIMItemConfig_chkBatteriesIncl.checked = true;
        //END
    }
    else {
        setCmbIndex(frmItem.GIMItemConfig_cboConfigTryMe_List, "0")
        //frmItem.GIMItemConfig_cboConfigTryMe_List.disabled=true;
        //ADDED ON 02/28/2007
        //frmItem.GIMItemConfig_chkBatteriesIncl.checked=false;
        //END
    }
}
function checkTryMe(obj) {
    if (obj.options[obj.selectedIndex].value == "0" && document.frmItem.GIMItemConfig_ChkTryMe.checked == true) {
        alert("Invalid selection.");
        setCmbIndex(frmItem.GIMItemConfig_cboConfigTryMe_List, obj.oldVal)
    }
    if (obj.options[obj.selectedIndex].value != "0" && document.frmItem.GIMItemConfig_ChkTryMe.checked == false) {
        alert("Invalid selection.");
        setCmbIndex(frmItem.GIMItemConfig_cboConfigTryMe_List, obj.oldVal)
    }

    obj.oldVal = obj.options[obj.selectedIndex].value
}
function RoundToNearest(dblNumber) {
    var dblTemp
    var lngTemp
    dblTemp = parseFloat(dblNumber) / 0.0001
    lngTemp = parseInt(dblTemp)
    if (lngTemp == dblTemp) {
        return dblNumber
    }
    else {
        // round up
        dblTemp = lngTemp + 1
        return dblTemp * 0.0001
    }
}
function RoundNumber(obj) {
    if (obj.value == "")
        obj.value = "0"
    obj.value = Math.round(obj.value)
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
function jReplicate(str, nTimes) {
    var replCtr, retStr;
    retStr = ""
    for (replCtr = 0; replCtr < nTimes; replCtr++) {
        retStr = retStr + str;
    }
    return retStr;
}
function funcNewStock() {
    if (confirm("Have you selected a configuration?") == false)
        return;
    var sAttr = "center:yes;help:no;status:no;resizable:no;scroll:no;dialogTop=180px;dialogLeft:150px;dialogWidth:510px;dialogHeight:260px";
    var sReturnValue = window.showModalDialog("GIMFrameContainer.aspx?PageName=GIMNewStock.aspx&ItemNo=" + document.frmItem.txtItemNo.value + "&custId=" + document.getElementById("GIMItemConfig_cboConfigCustomer_List").options[document.getElementById("GIMItemConfig_cboConfigCustomer_List").selectedIndex].value + "&configId=" + document.getElementById("GIMItemConfig_hdConfigId").value + "&PageTitle=Create New Stock#", "Get Item Number", sAttr);
    if (typeof (sReturnValue) == "undefined")
        return alert("Operation Cancelled.");
    document.frmItem.submit();
}
function checkActiveStock(oCmb) {
    if (oCmb.value == "1") {
        oTable = oCmb.parentElement.parentElement.parentElement.parentElement;
        var nRowIndex = 1;
        if (oTable.getAttribute("lastRow"))
            nRowIndex = oTable.getAttribute("lastRow")
        oTrCurrent = oTable.rows[nRowIndex]
        oTdCurrent = oTr.cells[oTr.cells.length - 1]
        nRowIndex = parseInt(nRowIndex);
        var foundDuplicate = false
        var statusVal = ""
        for (i = 1; i < oTable.rows.length - 1; i++) {
            if (i == nRowIndex)
                continue;
            oTr = oTable.rows[i]
            oTd = oTr.cells[oTr.cells.length - 1]
            statusVal = oTr.cells[4].currentValue;
            if (oTd.children[2].value == oTdCurrent.children[2].value && oTd.children[3].value == oTdCurrent.children[3].value && statusVal == "1") {
                foundDuplicate = true;
                break;
            }
        }
        if (foundDuplicate) {
            alert("Only one Active StockNo is allowed for same Configuration and Customer.")
            setCmbIndex(oCmb, "3");
            changeList(oCmb);
        }
    }
}
function showOrderMsg() {
    window.event.returnValue = false;
    alert("Item or configuration is ordered by the customer. Quantity cannot be modified.")
}
function AddConfig() {
    blockPage();
    loadSpan.innerText = "Adding Configuration...";
    document.getElementById('cbxText').focus();
}
function DuplicateConfig() {
    blockPage();
    loadSpan.innerText = "Duplicating Configuration...";
    document.getElementById('cbxText').focus();
}
function SaveStock() {
    blockPage();
    loadSpan.innerText = "Saving Stock...";
    document.getElementById('cbxText').focus();
}

function showItemImage(obj) {
    return;
}
function showDocument(obj) {
    var FileName = obj.parentElement.parentElement.parentElement.cells[5].children[1].value;
    //window.open("RNDFiles/" + FileName);
    //location.href = "GIMDownload.aspx?FileName=" + FileName + "&RND=Y";
    obj.href = "GIMDownload.aspx?FileName=" + FileName + "&RND=Y";
}
function chgDocument(obj) {
    var varFldConfigId = document.getElementById("GIMItemConfig_hdConfigId").value;
    var sAttr = "center:yes;help:no;status:no;resizable:no;scroll:no;dialogTop=220px;dialogLeft:150px;dialogWidth:540px;dialogHeight:165px";
    var sReturnValue = window.showModalDialog("GIMFrameContainer.aspx?PageName=GIMUploadItemConfigReference.aspx&fldConfigId=" + varFldConfigId, "Upload Item Config Documents", sAttr);
    if (typeof (sReturnValue) == "undefined") {
        obj.focus();
        return alert("Operation Cancelled.");
    }
    //document.frmItem.submit();
    sTemp = sReturnValue.split("=r=")
    oRow = obj.parentElement.parentElement.parentElement;
    oTable = oRow.parentElement.parentElement;
    var nRowIndex = 1;
    if (oTable.getAttribute("lastRow"))
        nRowIndex = oTable.getAttribute("lastRow")
    if (sTemp[0] != "") {
        oRow.cells[2].children[1].value = sTemp[0];
    }
    oRow.cells[1].children[0].innerText = sTemp[1];
    oRow.cells[1].children[1].value = sTemp[1];
    obj.focus()
}
function chgDocumentLoad() {
    try {
        //        var varFldConfigId = document.getElementById("GIMItemConfig_hdConfigId").value;        
        //        var sAttr = "center:yes;help:no;status:no;resizable:no;scroll:no;dialogTop=220px;dialogLeft:150px;dialogWidth:540px;dialogHeight:145px";
        //        var sReturnValue = window.showModalDialog("GIMFrameContainer.aspx?PageName=GIMUploadItemConfigReference.aspx&fldConfigId=" + varFldConfigId, "Upload Item Config Documents", sAttr);
        //        if (typeof (sReturnValue) == "undefined") {
        //            return alert("Operation Cancelled.");
        //        }
        // document.frmItem.submit();
        var sReturnValue = "=r=";
        sTemp = sReturnValue.split("=r=")
        try {
            oTable = document.getElementById("GIMItemConfig_LGItemConfigReference_TblDDList")
        }
        catch (e) {
        }
        oRow = oTable.rows[oTable.rows.length - 2]
        var nRowIndex = 1;
        if (oTable.getAttribute("lastRow"))
            nRowIndex = oTable.getAttribute("lastRow")
        if (sTemp[0] != "") {
            oRow.cells[2].children[1].value = sTemp[0];
        }
        oRow.cells[1].children[0].innerText = sTemp[1];
        oRow.cells[1].children[1].value = sTemp[1];
    }
    catch (y) {
    }
}
function OpenDocumentOnClick() {
    var sAttr = "resizable=yes, width=600px, height=180px, Top=0, left=0, scrollbars=no";
    var varFldConfigId = document.getElementById("GIMItemConfig_hdConfigId").value;
    if (varFldConfigId == 0 || varFldConfigId == "")
        alert("Please save configuration.");
    else
        //window.open("../GIM/GIMUploadItemConfigReference.aspx?fldConfigId=");
        window.open("GIMUploadItemConfigReference.aspx?fldConfigId=" + varFldConfigId, "Documents", sAttr);
    return false;
}
function UpdateComment(obj) {
    var sAttr = "resizable=yes, width=600px, height=180px, Top=250, left=250, scrollbars=no";
    var varFldId = obj.parentElement.parentElement.parentElement.cells[5].children[2].value;
    window.open("GIMUpdateItemConfigComment.aspx?fldId=" + varFldId, "Documents", sAttr);
    return false;
}

function OpenItemConfigCommentsOnClick() {
    var sAttr = "resizable=yes, width=600px, height=180px, Top=0, left=0, scrollbars=no";
    var varFldConfigId = document.getElementById("GIMItemConfig_hdConfigId").value;
    if (varFldConfigId == 0 || varFldConfigId == "")
        alert("Please save configuration.");
    else
        window.open("GIMSaveItemConfigComment.aspx?fldID=0&fldConfigId=" + varFldConfigId, "ConfigComments", sAttr);
    return false;
}
function UpdateItemConfigComments(obj) {
    var sAttr = "resizable=yes, width=600px, height=180px, Top=250, left=250, scrollbars=no";
    var varFldId = obj.parentElement.parentElement.parentElement.cells[4].children[2].value;
    var varFldConfigId = obj.parentElement.parentElement.parentElement.cells[4].children[3].value;
    window.open("GIMSaveItemConfigComment.aspx?fldId=" + varFldId + "&fldConfigId=" + varFldConfigId, "ConfigComments", sAttr);
    return false;
}
function delRowComments(obj) {
    oRow = obj.parentNode.parentNode.parentNode;
    oTable = oRow.parentNode.parentNode;
    if (oTable.getAttribute("disabled") == true || oTable.getAttribute("GridEnabled") == "0" || oTable.getAttribute("GridReadOnly") == "1")
        return;
    var otherRights = false;
    if (typeof (document.forms[0].rightsPropertiesUpdateOnly) != "undefined") {
        if (document.forms[0].tabId.value == "1" && document.forms[0].rightsPropertiesUpdateOnly.value == "1")
            otherRights = true;
        if (document.forms[0].tabId.value == "2" && document.forms[0].rightsLegalUpdateOnly.value == "1")
            otherRights = true;
        if (document.forms[0].tabId.value == "3" && document.forms[0].rightsSoundUpdateOnly.value == "1")
            otherRights = true;
        if (document.forms[0].tabId.value == "5" && document.forms[0].rightsRNDUpdateOnly.value == "1")
            otherRights = true;
    }
    if (otherRights == false && document.forms[0].rightsModify.value == "0" && typeof (document.forms[0].rightsIgnore) == "undefined")
        return;
    if (otherRights == false && document.forms[0].rightsDelete.value == "0" && typeof (document.forms[0].rightsIgnore) == "undefined")
        return alert("No rights to Delete.")
    if (confirm("Are you sure you want to delete this record?") == false)
        return;
    document.getElementById("GIMItemConfig_hdDeleteComments").value = oRow.cells[4].children[2].value;

    oTable.tBodies[0].deleteRow(oRow.rowIndex);
    if (oTable.getAttribute("lastRow") > 1)
        oTable.setAttribute("lastRow", oTable.getAttribute("lastRow") - 1)
    viewList(oTable.rows[1].cells[0])
    showItemImage(oTable.rows[1].cells[0])
    if (typeof (window.triggerDelete) == "function")
        triggerDelete(oTable);
    document.frmItem.tabId.value = "4";
    blockPage();
    if (browserName == 'Netscape')
        loadSpan.textContent = "Document is being deleted...";
    else
        loadSpan.innerText = "Document is being deleted...";
    document.frmItem.submit();
}


function delRow(obj) {
    // Modified On 05.05.09
    // parentElement is replaced by parentNode (Reason:Suport both IE and Firefox)
    // Children[]is replaced by childNodes[](Reason:Suport both IE and Firefox)
    // innertext is replaced by textContent for Firefox 	
    oRow = obj.parentNode.parentNode.parentNode;
    oTable = oRow.parentNode.parentNode;
    if (oTable.getAttribute("disabled") == true || oTable.getAttribute("GridEnabled") == "0" || oTable.getAttribute("GridReadOnly") == "1")
        return;
    //	if(oRow.rowIndex==(oTable.rows.length-2))
    //		return;
    var otherRights = false;
    if (typeof (document.forms[0].rightsPropertiesUpdateOnly) != "undefined") {
        if (document.forms[0].tabId.value == "1" && document.forms[0].rightsPropertiesUpdateOnly.value == "1")
            otherRights = true;
        if (document.forms[0].tabId.value == "2" && document.forms[0].rightsLegalUpdateOnly.value == "1")
            otherRights = true;
        if (document.forms[0].tabId.value == "3" && document.forms[0].rightsSoundUpdateOnly.value == "1")
            otherRights = true;
        if (document.forms[0].tabId.value == "5" && document.forms[0].rightsRNDUpdateOnly.value == "1")
            otherRights = true;
    }

    if (otherRights == false && document.forms[0].rightsModify.value == "0" && typeof (document.forms[0].rightsIgnore) == "undefined")
        return;
    if (otherRights == false && document.forms[0].rightsDelete.value == "0" && typeof (document.forms[0].rightsIgnore) == "undefined")
        return alert("No rights to Delete.")
    if (confirm("Are you sure you want to delete this record?") == false)
        return;
    document.getElementById("GIMItemConfig_hdDeleteRefDoc").value = oRow.cells[5].children[2].value;
    oTable.tBodies[0].deleteRow(oRow.rowIndex);
    if (oTable.getAttribute("lastRow") > 1)
        oTable.setAttribute("lastRow", oTable.getAttribute("lastRow") - 1)
    //oTable.sectionRowIndex=2
    viewList(oTable.rows[1].cells[0])
    showItemImage(oTable.rows[1].cells[0])
    if (typeof (window.triggerDelete) == "function")
        triggerDelete(oTable);
    document.frmItem.tabId.value = "4";
    blockPage();
    if (browserName == 'Netscape')
        loadSpan.textContent = "Document is being deleted...";
    else
        loadSpan.innerText = "Document is being deleted...";
    document.frmItem.submit();
}

function GetPackingNo() {
    document.getElementById('GIMItemConfig_hdnGetPackagingNo').value = 1;
    document.aspnetForm.submit();
}

function CallSrv() {
    if (document.getElementById('GIMItemConfig_txtPackageNo').value.length > 7) {
        CallServer(document.getElementById('GIMItemConfig_txtPackageNo').value);
    }
}

function ReceiveServerData(arg, context) {
    alert(arg)
}

function GetPackageConfiguration() {
    if (document.getElementById('GIMItemConfig_hdnGetPackageConf').value == 1) {
        alert('Current configuration cannot be changed.')
        window.event.returnValue = false;
    }
}

function ResetConfigSection() {
    if (true == $('#GIMItemConfig_chkAssormentOnly').is(':checked')) {
        $('.dimensions input[type=text]').prop('readonly', true).prop('disabled', true).css('background-color', '#f3f3ca').val(ToFixed(0, 4));
        $('#GIMItemConfig_txtMasterMetricPackQty_txtNumeric').prop('readonly', true).prop('disabled', true).css('background-color', '#f3f3ca').val(1);
        $('#GIMItemConfig_txtInnerMetricPackQty_txtNumeric').prop('readonly', true).prop('disabled', true).css('background-color', '#f3f3ca').val(0);
        $('#GIMItemConfig_txtConfigName').val('For Assortment Only');
        $('.merchandisePackageType, .innerPackageType').prop('readonly', true).prop('disabled', true).css('background-color', '#f3f3ca');
    }
    else {
        $('.dimensions input[type=text]').prop('readonly', false).prop('disabled', false).css('background-color', '#fff');
        $('#GIMItemConfig_txtMasterMetricPackQty_txtNumeric, #GIMItemConfig_txtInnerMetricPackQty_txtNumeric').removeAttr('readonly').css('background-color', '#fff').prop('disabled', false);
        $('#GIMItemConfig_txtConfigName').removeAttr('readonly').css('background-color', '#fff').val($('#configName').val());
        $('.innerPackageType, .merchandisePackageType').prop('readonly', false).prop('disabled', false).css('background-color', '#fff');
    }
}
