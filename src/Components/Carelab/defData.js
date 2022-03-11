import { useState, useEffect } from "react";
// import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { careLabTestListApi } from '../../services/careLabService';
import { Markup } from 'interweave';
import SubTestModal from "./SubTestModal";

function asdf() {

    var smsMessageTemplate = "";
    var smsMessageTemplateId = 0;
    var emailMessageTemplate = "";
    var emailMessageTemplateId = 0;
    var emailMessageSubject = "";
    $('.searchInSelect').select2();
    //$('.testNote').select2();
    // testNote


    $(".testResultOptions").select2({
        tags: true,
        createTag: function (tag) {

            var term = $.trim(tag.term);
            if (term === '') {
                return null;
            }
            return {
                id: tag.term,
                text: tag.term,
                isNew: true
            };
        },
        minimumInputLength: 0,
        ajax: {
            method: 'POST',
            dataType: 'json',
            delay: 250,
            url: '/ReportEntry/ReportEntry/GetTestResultOption',
            data: function (params) {
                var query = {
                    TestDiagnosisGroupId: $('.select2-container--open').prev('select').data('dignosisid'),
                    TestId: 0,
                    SubTestId: 0,
                }
                return query;
            },
            processResults: function (data, params) {
                params.page = 1;

                return {
                    results: data.map(function (item) {
                        return {
                            id: item.TestResult,
                            text: item.TestResult
                        };
                    }),
                    cache: true
                };
            },

        }
    }).on("select2:select", function (e) {

        var isModified = e.currentTarget.getAttribute("ismodified");
        var testResult = e.currentTarget.getAttribute("modelid");

        document.getElementById(isModified).value = "True";
        document.getElementById(testResult).value = e.params.data.id;



    });

    $('.testResultOptions').on("select2:open", function () {
        $('.select2-dropdown').css('min-width', '227px');
    })

    $('#btnBack').on('click', function () {
        parent.history.back();
        return false;
    });
    var aliasList = 'System.Collections.Generic.List`1[System.String]';
    var date_input = $('.datePicker');
    var container = $('form').length > 0 ? $('form').parent() : "body";
    var options = {
        format: 'dd M yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
        endDate: new Date(),

    };

    date_input.datepicker(options).datepicker("setDate", date_input.val());




    $('#normalReportForm :checkbox').change(function () {
        var inputText = $('#' + $(this).attr("inputid")).val();

        // Final TestResult text value
        var TestResultText = inputText;

        if (this.checked) {
            TestResultText = "<b>" + inputText + "</b>";
            // Change abnormality
            $('#' + $(this).attr("abnormality")).val(2);
        } else {
            $('#' + $(this).attr("abnormality")).val(0);

        }

        // Display TestResult in preview
        $("#" + $(this).attr("previewid")).html(TestResultText);

        // Assign value to the model
        $("#" + $(this).attr("modelid")).val(TestResultText);

    });
    var _lastInputFocus;

    /// added rajiv to catch prev focus input 14 may 2019
    $("#normalReportForm input").on("focus", function (e) {
        _lastInputFocus = $(this);
    });


    //$("#normalReportForm input").on("change", function (e) {
    //    var isModified =$('#'+$(this).attr("ismodified"));
    //    isModified.val(true);
    //    alert('here');
    //});
    //HideMe
    $(".HideMe").on("change", function (e) {
        var HideStatus = $(this).prop("checked") == true ? true : false;
        // alert(HideStatus);
        var currentControlId = $(this).attr("data-for");
        $("#" + currentControlId + " .HideInPrintCB").attr('checked', HideStatus);
        $("#" + currentControlId + " .HideInPrintCbIsModified").val(true);
        // alert("#"+currentControlId+" input[type=checkbox] .HideInPrint");
        //console.log("#"+currentControlId+" input[type=checkbox] .HideInPrint");
    });

    //yo milaauna parchha// euta lai matra change garna parneho
    //handled by input on input
    //$(".HideInPrintCB").on("change",function(e){
    //    $(".HideInPrintCbIsModified").val(true);
    //   });


    $("#normalReportForm textarea").on("input", function (e) {
        //console.log('textarea '+$(this).attr("ismodified"));
        SetModifiedFlag($(this).attr("ismodified"));
    });


    function ResetAllModifiedFlag() {
        //implement check with previous model for better operation
        $('.HideInPrintCbIsModified').val(false);
    }

    function SetModifiedFlag(isModifiedId) {
        //implement check with previous model for better operation
        $('#' + isModifiedId).val(true);
    }

    function inputAbnormalColorChange(selectedInput) {

        var inputText = selectedInput.val();
        var id = selectedInput.attr("testid");

        SetModifiedFlag(selectedInput.attr("ismodified"));
        if (typeof id !== "undefined") {
            var abnormality = $('#' + selectedInput.attr("abnormality"));

            var referenceRangeWithBr = $('#' + selectedInput.attr("referencerangewithbrid")).val();

            // Final TestResult text value
            var TestResultText = inputText;

            //gender
            var gender = 'Male';

            // check for out of range
            var formattedresult = "";
            if (referenceRangeWithBr != undefined && referenceRangeWithBr != null && referenceRangeWithBr != "") {
                referenceRangeWithBr = referenceRangeWithBr.replace("<br>", "</br>").replace('&lt;', '<').replace('&gt;', '>');
                formattedresult = IsOutOfRange(TestResultText, referenceRangeWithBr, gender);
            }

            var rangeOutPutDisplay = "";
            var param = selectedInput.parent('td').parent('tr');
            if (formattedresult == "high") {
                //rangeOutPutDisplay = "Result is greater than Specified Range";
                rangeOutPutDisplay = "high";
                //var param= $(this).parent('td').parent('tr');
                param.addClass('resultHigh');
                param.removeClass('resultLow');
                abnormality.val(1);
            }
            else if (formattedresult == "low") {
                //rangeOutPutDisplay = "Result is lower than Specified Range";
                rangeOutPutDisplay = "low";
                param.removeClass('resultHigh');
                param.addClass('resultLow');
                abnormality.val(-1);

            }
            else {
                param.removeClass('resultHigh');
                param.removeClass('resultLow');
                abnormality.val(0);
                rangeOutPutDisplay = formattedresult;
            }
            var resultChanged = formattedresult == "high" || formattedresult == "low";

            if (resultChanged) {
                TestResultText = "<b>" + inputText + "</b>";
                $('#NormalTestList_' + id + '__IsHigh').prop('checked', true);
                selectedInput.attr("validation", rangeOutPutDisplay);
            } else {
                $('#NormalTestList_' + id + '__IsHigh').prop('checked', false);
                selectedInput.attr("validation", false);
            }
            // Display TestResult in preview
            $("#" + $(this).attr("previewid")).html(TestResultText);

            // Assign value to the model
            $("#" + selectedInput.attr("modelid")).val(TestResultText);
        }
    }
    $('#normalReportForm .testResultOptions').on('select2:select', function (e) {
        if (e.which === 9) return;
        inputAbnormalColorChange($(this))
        return;
    });

    $("#normalReportForm input").on("input", function (e) {
        //console.log($(this)[0].id);
        //console.log($(this).val());
        if (e.which === 9) return;
        inputAbnormalColorChange($(this))
        // Get input Text value rajiv
        // if($(this).attr('type')==="text")

        return;
    });

    $("#subTestEntry").on("select2:select", ".testResultOption", function (e) {
        if (e.which === 9) return;
        subtestInputAbNormalColorChange($(this));
    })

    function subtestInputAbNormalColorChange(subtestInput) {
        var inputText = subtestInput.val();

        var abnormality = $('#' + subtestInput.attr("abnormality").trim());

        var referenceRangeWithBr = subtestInput.attr("referencerangewithbrid");

        // Final TestResult text value
        var TestResultText = inputText;

        //gender
        var gender = 'Male';

        // check for out of range
        var formattedresult = "";
        if (referenceRangeWithBr != undefined && referenceRangeWithBr != null && referenceRangeWithBr != "") {
            referenceRangeWithBr = referenceRangeWithBr.replace("<br>", "</br>");
            formattedresult = IsOutOfRange(TestResultText, referenceRangeWithBr, gender);
        }

        var param = subtestInput.parent('td').parent('tr');
        var rangeOutPutDisplay = "";
        if (formattedresult == "high") {

            param.addClass('resultHigh');
            param.removeClass('resultLow');
            rangeOutPutDisplay = "high";
            abnormality.val(1);
        }
        else if (formattedresult == "low") {
            param.removeClass('resultHigh');
            param.addClass('resultLow');
            rangeOutPutDisplay = "low";
            abnormality.val(-1);

        }
        else {
            param.removeClass('resultHigh');
            param.removeClass('resultLow');
            abnormality.val(0);
            rangeOutPutDisplay = formattedresult;
        }
        var resultChanged = formattedresult == "high" || formattedresult == "low";

        if (resultChanged) {
            TestResultText = "<b>" + inputText + "</b>";
            $('#' + subtestInput.attr("subtestishighid")).prop('checked', true);
            subtestInput.attr("validation", rangeOutPutDisplay);
        } else {
            $('#' + subtestInput.attr("subtestishighid")).prop('checked', false);
            subtestInput.attr("validation", false);
        }
        // Display TestResult in preview
        $("#" + subtestInput.attr("previewid")).html(TestResultText);

        // Assign value to the model
        $("#" + subtestInput.attr("modelid")).val(TestResultText);
    }
    // Subtest
    $("#subTestEntry").on("input", "input", function (e) {
        if (e.which === 9) return;
        subtestInputAbNormalColorChange($(this));
        ////RJ ADDED FOR AUTO RESULT
        //var inputText = $(this).val();
        //if ($('#showSubTest').is(':contains("SARS-CoV-2")')) {
        //    var inputText = $(this).val();
        //    if(inputText >0) $("#NormalTestList_0__Note").val("POSITIVE");
        //    else  $("#NormalTestList_0__Note").val("NEGATIVE");
        //}
        ////END
        // Get input Text value

        //return;
    });



    $('#subTestEntry').on('change', ':checkbox', function () {
        var inputText = $('#' + $(this).attr("inputid")).val();

        // Final TestResult text value
        var TestResultText = inputText;

        if (this.checked) {
            TestResultText = "<b>" + inputText + "</b>";
            // Change abnormality
            $('#' + $(this).attr("abnormality")).val(2);
        } else {
            $('#' + $(this).attr("abnormality")).val(0);

        }

        // Display TestResult in preview
        $("#" + $(this).attr("previewid")).html(TestResultText);

        // Assign value to the model
        $("#" + $(this).attr("modelid")).val(TestResultText);

    });


    // Result input  focus lost event
    $("#normalReportForm input").change(function (e) {
        var input = $(this);

        if ($(e.relatedTarget).prop('type') === 'submit') {
            e.preventDefault();
            return;
        }

        if ($(this).attr("validation") != "false" && $(this).attr("validation") != undefined) {
            if ($(this).attr("validation") == 'high') {
                $.toaster({ priority: 'danger', title: 'Info', message: "Result is greater than Specified Range." });
            }
            if ($(this).attr("validation") == 'low') {
                $.toaster({ priority: 'secondary', title: 'Info', message: "Result is lower than Specified Range." });
            }
            //showOkDialog("","Warning", $(this).attr("validation"));
            // alert('here comes1');
            // $(this
        }

    });
    // added rajiv to correct focus when custom label is called
    var prevCalledControl;
    $('#customDialogBox').on('hidden.bs.modal', function () {
        //console.log('enter here');
        if (prevCalledControl != _lastInputFocus) {
            if (typeof _lastInputFocus == 'undefined') console.log('undefined');
            else _lastInputFocus.focus();
            prevCalledControl = _lastInputFocus;
        }
        //else $(_lastInputFocus).next('.testInputText').focus();
        //console.log($(_lastInputFocus).next('.testInputText'));
    })
    // added rajiv to correct focus when subtest enty is called
    $('#subTestEntry').on('hidden.bs.modal', function () {
        //console.log('subtest entry close'+_lastInputFocus.val());
        if (_lastInputFocus != undefined)
            _lastInputFocus.focus();
    })

    //$("#subTestEntry").on("focusout","input", function (e) {
    //    var input = $(this);
    //    if( $(this).attr("validation") != "false" && $(this).attr("validation") != undefined )
    //        showOkDialog("","Warning", $(this).attr("validation"));
    //});

    // Function for outof range check
    //function IsOutOfRange(result,testRange,gender)
    //{
    //    result = (result == "<") ? "" : result;
    //    if (result.indexOf('<') > 0)
    //    {
    //        var resultChanged = false;
    //        var resultSplit = result.split('<');
    //        for (var i = 0; i < resultSplit.length; i++)
    //        {
    //            if (!resultSplit[i].StartsWith(" "))
    //            {
    //                resultSplit[i] = " " + resultSplit[i];
    //                resultChanged = true;
    //            }
    //        }
    //        if (resultChanged)
    //        {
    //            result = resultSplit+"<";
    //            return true;
    //        }
    //    }

    //    var splitter = "</br>";

    //    var newLineCount = testRange.split(splitter).length-1;

    //    if (newLineCount == 0)
    //    {
    //        var res = GetHighValueOfRange(testRange, result);
    //        if(res == false)
    //            return false;
    //        else{
    //            //    alert(res);
    //            return res;
    //        }
    //    }
    //    else if (newLineCount == 1)
    //    {
    //        var multiRange = testRange.split("</br>");
    //        var currentRange = multiRange[0].trim();
    //        if(multiRange[0].indexOf(gender)<0){
    //            currentRange =  multiRange[1].trim();
    //        }
    //        var res = GetHighValueOfRange(currentRange.split(':')[1], result);
    //        if(res == false)
    //            return false;
    //        else{
    //            //  alert(res);
    //            return res;
    //        }
    //    }


    //    return false;
    //}


    //function GetHighValueOfRange( range,  result)
    //{
    //    try
    //    {

    //        var sp = '\0';

    //        if(range.indexOf('-')>=0)
    //            sp=  '-';
    //        else if(range.indexOf('<')>=0)
    //            sp=  '<';
    //        else if(range.indexOf('>')>=0)
    //            sp=  '>';

    //        if (sp != '\0')
    //        {

    //            var resultvalue = Number(result);
    //            var  testRange = range.split(sp);

    //            if (testRange[0] == undefined || testRange[0] == null)
    //                testRange[0] = "0";
    //            var FirstRange = Number(testRange[0]);
    //            var SecondRange =  Number(testRange[1]);

    //            //   console.log(FirstRange +" "+ SecondRange + " " + resultvalue);

    //            if (sp == '-')
    //            {
    //                if (!(resultvalue >= FirstRange && resultvalue <= SecondRange && resultvalue >= 0))
    //                {
    //                    return "Result are not in Reference Range";
    //                }

    //            }
    //            else if (sp == '<' && resultvalue > 0)
    //            {
    //                if (resultvalue > SecondRange)
    //                {
    //                    return "Result are greater than Specified Range";
    //                }

    //            }
    //            else if (sp == '>' && resultvalue > 0)
    //            {
    //                if (resultvalue < SecondRange)
    //                {
    //                    return "Result are less than Specified Range";
    //                }

    //            }

    //            else
    //            {
    //                return "InCorrectFormat";
    //            }

    //            return false;
    //        }
    //    }
    //    catch (e)
    //    {

    //        return "Error" + e;


    //    }
    //}

    // Function for outof range check
    function IsOutOfRange(result, testRange, gender) {
        result = (result == "<") ? "" : result;
        //if (result.indexOf('<') > 0)
        //{
        //    var resultChanged = false;
        //    var resultSplit = result.split('<');
        //    for (var i = 0; i < resultSplit.length; i++)
        //    {
        //        if (!resultSplit[i].StartsWith(" "))
        //        {
        //            resultSplit[i] = " " + resultSplit[i];
        //            resultChanged = true;
        //        }
        //    }
        //    if (resultChanged)
        //    {
        //        result = resultSplit+"<";
        //        return true;
        //    }
        //}

        var splitter = "</br>";

        var newLineCount = testRange.split(splitter).length - 1;

        if (newLineCount == 0) {
            return GetHighValueOfRange(testRange, result);

        }
        else if (newLineCount == 1) {
            var multiRange = testRange.split("</br>");
            var currentRange = multiRange[0].trim();
            if (multiRange[0].indexOf(gender) < 0) {
                currentRange = multiRange[1].trim();
            }
            return GetHighValueOfRange(currentRange.split(':')[1], result);


        }


        return result;
    }


    function GetHighValueOfRange(range, result) {
        try {

            var sp = '\0';

            if (range.indexOf('-') >= 0)
                sp = '-';
            else if (range.indexOf('<') >= 0)
                sp = '<';
            else if (range.indexOf('>') >= 0)
                sp = '>';

            if (sp != '\0') {

                var resultvalue = Number(result);
                var testRange = range.split(sp);

                if (testRange[0] == undefined || testRange[0] == null)
                    testRange[0] = "0";
                var FirstRange = Number(testRange[0]);
                var SecondRange = Number(testRange[1]);

                //   console.log(FirstRange +" "+ SecondRange + " " + resultvalue);

                if (sp == '-') {
                    //if (!(resultvalue >= FirstRange && resultvalue <= SecondRange && resultvalue >= 0))
                    //{
                    //    return "Result are not in Reference Range";
                    //}
                    if ((resultvalue > SecondRange)) {
                        return "high";
                    }

                    if ((resultvalue < FirstRange)) {
                        return "low";
                    }

                }
                else if (sp == '<' && resultvalue > 0) {
                    if (resultvalue > SecondRange) {
                        return "high";
                    }

                }
                else if (sp == '>' && resultvalue > 0) {
                    if (resultvalue < SecondRange) {
                        return "low";
                    }

                }

                else {
                    return "InCorrectFormat";
                }

                return result;
            }
        }
        catch (e) {

            return "Error" + e;


        }
    }

    $('#normalReportForm').submit(async function (e) {
        e.preventDefault();
        $('#yesNoDialogYesBtn').focus();
        if ("Due" == "Due" &&
            !(await showYesNoDialog("", "Warning", "Are you sure to save due bill report?", true)))
            return;

        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function (TestResult) {

                if (TestResult) {
                    ResetAllModifiedFlag();
                    showOkDialog("info", "Saved ", "Record saved !!");
                }
                else
                    showOkDialog("", "Error ", "Unable to save the record, Please try again later.");

            },
            error: function (res) {
                showOkDialog("", "Server Error !", "Unable to save the record, Contact Administrator !!");

            }

        });


        return false;

    });

    // Print normal report
    $(document).on("click", ".printNormalReport", async function (e) {
        e.preventDefault();
        //console.log($(this).attr('reporttype'));
        if ("Due" == "Due" &&
            !(await showYesNoDialog("", "Warning", "Are you sure to print due bill report?", true)))
            return;
        var Patientid = 114;
        var ReportType = 7;
        var ReportFormat = $(this).attr('reporttype');
        var IsCulture = $(this).attr('isculture');
        var IsDigitalSignatureEnabled = 'True';
        var isFirstCheckerDsAccessible = $('#FirstChecker').find(":selected").attr("data-isdsaccessible") == undefined ? false : $('#FirstChecker').find(":selected").attr("data-isdsaccessible");
        var firstCheckerChkValue = $('#chkFirstCheckerDs').prop('checked') == true;
        var IsAllowDigitalSignatureOfFirstChecker = firstCheckerChkValue && isFirstCheckerDsAccessible;

        var isSecondCheckerDsAccessible = $('#SecondChecker').find(":selected").attr("data-isdsaccessible") == undefined ? false : $('#SecondChecker').find(":selected").attr("data-isdsaccessible");
        var secondCheckerChkValue = $('#chkSecondCheckerDs').prop('checked') == true;
        var IsAllowDigitalSignatureOfSecondChecker = isSecondCheckerDsAccessible && secondCheckerChkValue;

        var isThirdCheckerDsAccessible = $('#ThirdChecker').find(":selected").attr("data-isdsaccessible") == undefined ? false : $('#ThirdChecker').find(":selected").attr("data-isdsaccessible");
        var thirdCheckerChkValue = $('#chkThirdCheckerDs').prop('checked') == true;
        var IsAllowDigitalSignatureOfThirdChecker = isThirdCheckerDsAccessible && thirdCheckerChkValue;

        var UserId = 1;
        var userName = 'admin';
        //var  IsCulture = false;
        var UseConsoleReportViewer = 'false';

        var printReport = {
            "Patientid": Patientid,
            "ReportType": ReportType,
            "IsDigitalSignatureEnabled": IsDigitalSignatureEnabled == "" ? false : IsDigitalSignatureEnabled,
            "PrintFirstCheckerDS": IsAllowDigitalSignatureOfFirstChecker == "" ? false : IsAllowDigitalSignatureOfFirstChecker,
            "PrintSecondCheckerDS": IsAllowDigitalSignatureOfSecondChecker == "" ? false : IsAllowDigitalSignatureOfSecondChecker,
            "PrintThirdCheckerDS": IsAllowDigitalSignatureOfThirdChecker == "" ? false : IsAllowDigitalSignatureOfThirdChecker,
            "IsCulture": (IsCulture == "1") ? true : false,
            "UseConsoleReportViewer": UseConsoleReportViewer,
            "UserId": UserId,
            "UserName": userName,
            "FiscalYearId": '1',
            "RecordId": $(this).attr('rId'),
            "FetchCompany": false,
            "ReportFormat": ReportFormat
        };
        var thirtyMinute = new Date();
        thirtyMinute.setTime(thirtyMinute.getTime() + (30 * 60 * 1000));
        $.cookie('PrintReport', JSON.stringify(printReport), { expires: thirtyMinute, path: '/' });

        if ('False' == 'True') {
            // Update Sequence Number
            var ajaxCall = $.ajax({
                url: '/ReportEntry/Patient/InsertSequnceNumberByPatId',
                type: 'Post',
                //async: false,
                data: {
                    sampleId: Patientid,
                    fiscalYearId: '1'
                },
            });

            ajaxCall.done(function (resp) {
            });

            ajaxCall.fail(function (resp) {
                showOkDialog("info", "Failure", "Server error, please try again later !!");
            });
        }


        // Get report Print Parameter
        var ajaxCall = $.ajax({
            url: '/ReportEntry/Print/GetReportPrintParameter',
            type: 'Post',
            //async: false,
            data: {
                reportProperties: printReport,
            },
        });

        ajaxCall.done(function (resp) {
            if (resp == undefined || resp == null || resp == "null") {
                showOkDialog("info", "Failure", "Server error, please try again later !!");
                return;
            }
            if (resp == "UseWebReportViewer") {
                window.open('/ReportEntry/ReportEntry/PrintReport');
                return;
            }

            LunivaPrinter.Print(resp);


        });

        ajaxCall.fail(function (resp) {
            showOkDialog("info", "Failure", "Server error, please try again later !!");
        });



    });



    // Edit range
    $('#normalReportForm .testRangeTd').on('dblclick', function (e) {
        var tdRange = $(this);
        var dgId = tdRange.attr('data-dignosisid');
        var testName = tdRange.parents('tr').find('.testName').html();

        $('#txtEditRangeDigId').val(dgId);
        $('#edtiRangeTestName').html(testName);
        $('#txtEditRange').html(tdRange.find('.testRange').html().trim());
        $('#editTestRange').modal("show");
    });


    // Save range
    $('#btnSaveEditRange').on('click', function () {

        var digId = $('#txtEditRangeDigId').val();
        var range = $('#txtEditRange').html().replace(/&nbsp;/g, '').replace(/<div>/g, '</br>').replace(/<\/div>/g, '').replace('&lt;', '<').replace('&rt;', '<');//jQuery('<div />').html($('#txtEditRange').html()).text();
        //console.log( $('#txtEditRange').html());
        // Change range in view  //only change after success
        // In range input box
        //$('.testRangeTd[data-dignosisid='+digId+']').find('input').val(range);
        // In view
        //$('.testRangeTd[data-dignosisid='+digId+']').find('.testRange').html(range);
        ShowLoading(true);
        $.ajax({
            url: '/ReportEntry/Test/UpdateTestRange',
            type: 'post',
            data: { dignosisId: digId, range: range },
            success: function (res) {

                if (res) {
                    showOkDialog("info", "Updated ", "Range Updated !!");
                    SetModifiedFlag($('.testRangeTd[data-dignosisid=' + digId + ']').find('.testRange').attr("ismodified"));
                    // Change range in view
                    // In range input box
                    $('.testRangeTd[data-dignosisid=' + digId + ']').find('input').val(range);
                    // In view
                    $('.testRangeTd[data-dignosisid=' + digId + ']').find('.testRange').html(range);
                }
                else
                    showOkDialog("", "Error ", "Unable to save the range, Please try again later.");
                $('#editTestRange').modal("hide");

                ShowLoading(false);
            },
            error: function (res) {
                showOkDialog("", "Server Error !", "Unable to save the record, Contact Administrator !!");
                $('#editTestRange').modal("hide");

                ShowLoading(false);
            }

        });
    });


    /* #region SubTest start */
    // global isCulture for printing subtest

    var globalIsCulture = false;
    var _subTestid;
    var _isDifferentialOpen = false;

    function loadSubTestFromBtn(formThis) {
        _isDifferentialOpen = false;
        var testId = formThis.attr("testid");
        var diagonisisId = formThis.attr("diagnosisedid");
        var isSubGroup = formThis.attr("issubgroup");
        var isDifferential = formThis.attr("isdifferential");
        var isCulture = formThis.attr("isculture");
        var patId = formThis.attr("patrecordid");
        globalIsCulture = isCulture;
        _subTestid = patId;
        /// quick fix rajiv

        _isDifferentialOpen = isDifferential == 'False' ? false : true;
        //
        ShowLoading(true);
        $('#subTestEntryBody').html("");
        $('#subTestEntryBody').load('/ReportEntry/ReportEntry/GetSubTest',
            {
                patRecordId: patId,
                testId: testId,
                diagonisisId: diagonisisId,
                isSubGroup: isSubGroup,
                isDifferential: isDifferential,
                isCulture: isCulture,
                sampleId: $('#patientSampleId').val(),
                fiscalYearId: '1'
            },
            function (responseText, textStatus, req) {
                if (textStatus == "error") {
                    showOkDialog("", "Error", "Server error ! ", "Unable to load sub test, try again.")
                    $('#subTestEntryBody').html("");
                    $('#subTestEntry').modal("hide");
                    ShowLoading(false);
                } else {
                    subTestResultOption_select2Init();
                    $('#subTestEntry').modal({ show: true });
                    //var issync =  formThis.attr("issync");
                    var editEnabled = formThis.attr("editEnabled");
                    //console.log(issync);
                    //if(issync =='true'){
                    if (editEnabled == 'false') {
                        $("#addRemainingSubTest").attr("disabled", "disabled");
                        $("#subTestEntrySave").attr("disabled", "disabled");
                        $("#subTestPrint").attr("disabled", "disabled");
                        $('input[value="Delete"]').attr("disabled", "disabled");
                    } else {
                        $("#addRemainingSubTest").removeAttr("disabled");
                        $("#subTestEntrySave").removeAttr("disabled");
                        $("#subTestPrint").removeAttr("disabled");
                        $('input[value="Delete"]').removeAttr("disabled");
                    }
                    ShowLoading(false);
                    // console.log('yu in here bro');
                }
            }

        );
    }
    $('#subTestEntry').on('shown.bs.modal', function () {
        $('input:first', this).focus();
    });

    $('#normalReportForm .btnSubTest').on('click', function () {
        loadSubTestFromBtn($(this));
    });
    // show save test
    //$('#subTestEntryBody').on('click','#subTestEntrySave',function (e) {
    //    $('#subTestEntryBody #subTestForm').trigger('submit');

    //});

    $('#subTestEntryBody').on('submit', '#subTestForm', async function (e) {
        if (e.keyCode == 13)
            return false;
        e.preventDefault();
        var totalResult = 0;
        if (_isDifferentialOpen) {
            $(this).find('input[id^="txtSubTest_"]').each(function (index, element) {
                var resultToTotal = parseFloat(element.value);
                totalResult += isNaN(resultToTotal) ? 0 : resultToTotal;
                //  console.log(totalResult);
            })
            //console.log('this is the result ==>'+ totalResult +_isDifferentialOpen+'6');
            if (totalResult != 100 && (!await showYesNoDialog("", "Warning", "DLC total is not equal to 100%. DLC is not accurate")))
                return;
        }
        //alert('here');
        ShowLoading(true);
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function (TestResult) {

                if (TestResult)
                    showOkDialog("info", "Saved ", "Record saved !!");

                else
                    showOkDialog("", "Error ", "Unable to save the record, Please try again later.");
                $('#subTestEntry').modal("hide");

                ShowLoading(false);
            },
            error: function (res) {
                showOkDialog("", "Server Error !", "Unable to save the record, Contact Administrator !!");
                $('#subTestEntry').modal("hide");

                ShowLoading(false);
            }

        });


        return false;

    });


    // Delete subTest
    $('#subTestEntryBody').on('click', '#subTestForm input[type=button][value=Delete]', async function (e) {
        if (!(await showYesNoDialog("", "Delete Confirmation", "Are you sure, you want to delete this test?")))
            return;
        var btn = $(this);
        e.preventDefault();
        ShowLoading(true);
        $.ajax({
            url: '/ReportEntry/ReportEntry/DeleteSubTest',
            type: 'Post',
            data: { resultId: btn.attr("resultid") },
            success: function (TestResult) {

                if (TestResult) {
                    //$('#'+btn.attr("deleteresult")).val("");
                    //   $('#'+$(this).attr("deleterow")).addClass("hidden");
                    $('#' + btn.attr("deleterow")).remove();
                    showOkDialog("info", "Successfull ", "Record deleted !!");
                    ShowLoading(false);
                }

                else
                    showOkDialog("", "Error ", "Unable to delete the record, Please try again later.");
                ShowLoading(false);
            },
            error: function (res) {
                showOkDialog("", "Server Error !", "Unable to delete the record, Contact Administrator !!");
                ShowLoading(false);
            }

        });

    });

    // Print SubTest
    $('#subTestEntryBody').on('click', '#subTestForm #subTestPrint', function (e) {
        var Patientid = 114;
        var ReportType = 4;
        var IsDigitalSignatureEnabled = false;

        var isFirstCheckerDsAccessible = $('#FirstChecker').find(":selected").attr("data-isdsaccessible") == undefined ? false : $('#FirstChecker').find(":selected").attr("data-isdsaccessible");
        var firstCheckerChkValue = $('#chkFirstCheckerDs').prop('checked') == true;
        var IsAllowDigitalSignatureOfFirstChecker = firstCheckerChkValue && isFirstCheckerDsAccessible;

        var isSecondCheckerDsAccessible = $('#SecondChecker').find(":selected").attr("data-isdsaccessible") == undefined ? false : $('#SecondChecker').find(":selected").attr("data-isdsaccessible");
        var secondCheckerChkValue = $('#chkSecondCheckerDs').prop('checked') == true;
        var IsAllowDigitalSignatureOfSecondChecker = isSecondCheckerDsAccessible && secondCheckerChkValue;

        var isThirdCheckerDsAccessible = $('#ThirdChecker').find(":selected").attr("data-isdsaccessible") == undefined ? false : $('#ThirdChecker').find(":selected").attr("data-isdsaccessible");
        var thirdCheckerChkValue = $('#chkThirdCheckerDs').prop('checked') == true;
        var IsAllowDigitalSignatureOfThirdChecker = isThirdCheckerDsAccessible && thirdCheckerChkValue;

        var IsCulture = globalIsCulture;
        var SubTestId = _subTestid;
        var UserId = 1;
        var UseConsoleReportViewer = 'false';
        var userName = 'admin';


        var printReport = {
            "Patientid": Patientid,
            "ReportType": ReportType,
            "IsDigitalSignatureEnabled": IsDigitalSignatureEnabled == "" ? false : IsDigitalSignatureEnabled,
            "PrintFirstCheckerDS": IsAllowDigitalSignatureOfFirstChecker == "" ? false : IsAllowDigitalSignatureOfFirstChecker,
            "PrintSecondCheckerDS": IsAllowDigitalSignatureOfSecondChecker == "" ? false : IsAllowDigitalSignatureOfSecondChecker,
            "PrintThirdCheckerDS": IsAllowDigitalSignatureOfThirdChecker == "" ? false : IsAllowDigitalSignatureOfThirdChecker,
            "IsCulture": IsCulture,
            "RecordId": _subTestid,
            "UseConsoleReportViewer": UseConsoleReportViewer,
            "UserId": UserId,
            "UserName": userName,
            "FiscalYearId": '1'
        };

        var thirtyMinute = new Date();
        thirtyMinute.setTime(thirtyMinute.getTime() + (30 * 60 * 1000));
        $.cookie('PrintReport', JSON.stringify(printReport), { expires: thirtyMinute, path: '/' });


        // Get report Print Parameter
        var ajaxCall = $.ajax({
            url: '/ReportEntry/Print/GetReportPrintParameter',
            type: 'Post',
            //async: false,
            data: {
                reportProperties: printReport,
            },
        });

        ajaxCall.done(function (resp) {
            if (resp == undefined || resp == null || resp == "null") {
                showOkDialog("info", "Failure", "Server error, please try again later !!");
                return;
            }
            if (resp == "UseWebReportViewer") {
                window.open('/ReportEntry/ReportEntry/PrintReport');
                return;
            }
            LunivaPrinter.Print(resp);
        });

        ajaxCall.fail(function (resp) {
            showOkDialog("info", "Failure", "Server error, please try again later !!");
        });

    });

    // Add remaining subtest button
    $('#subTestEntryBody').on('click', '#subTestForm #addRemainingSubTest', function () {
        $('#remainingSubTestEntryBody').html("");
        ShowLoading(true);

        var testId = $(this).attr("testid");
        var patRecordId = $(this).attr("patrecordid");

        $('#remainingSubTestEntryBody').load('/ReportEntry/ReportEntry/GetRemainingSubTest',
            {
                patRecordId: patRecordId,
                testId: testId,
                isCulture: globalIsCulture,
                fiscalYearId: '1'
            },
            function (responseText, textStatus, req) {
                if (textStatus == "error") {
                    showOkDialog("", "Error", "Server error ! ", "Unable to load sub test, try again.")
                    $('#remainingSubTestEntryBody').html("");
                    ShowLoading(false);
                    $('#remainingSubTestEntry').modal("hide");

                } else {
                    ShowLoading(false);
                    $('#remainingSubTestEntry').modal({ show: true });
                }
            }

        );

    });

    // Save remaining subtest
    $('#remainingSubTestEntryBody').on('submit', '#remainingSubTestForm', function (e) {
        e.preventDefault();
        ShowLoading(true);

        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function (TestResult) {

                if (TestResult) {
                    showOkDialog("info", "Saved ", "Sub test added !!");
                    $('#subTestEntry').modal("hide");
                    $('#remainingSubTestEntry').modal("hide");
                    ShowLoading(false);


                }
                else {
                    showOkDialog("", "Error ", "Unable to add the sub test, Please try again later.");
                    $('#subTestEntry').modal("hide");
                    $('#remainingSubTestEntry').modal("hide");
                    ShowLoading(false);

                }

            },
            error: function (res) {
                showOkDialog("", "Server Error !", "Unable to save the record, Contact Administrator !!");
                $('#subTestEntry').modal("hide");
                $('#remainingSubTestEntry').modal("hide");
                ShowLoading(false);

            }

        });



        return false;

    });


    /* #endregion */

    // Report Verifier
    $('#FirstChecker').change(function () { // to show checkbox when selecting checker
        $('#firstCheckerDesignation').html($(this).find(":selected").attr("data-designation"));
        $('#firstCheckerRegNumber').html($(this).find(":selected").attr("data-regno"));
        var dsAccessible = $('#FirstChecker').find(":selected").attr("data-isdsaccessible") == undefined ?
            false : $('#FirstChecker').find(":selected").attr("data-isdsaccessible");

        //var checkerId = $('#FirstChecker option:Selected').val();
        var checkerId = this.value;
        var appUserId = $('#FirstChecker').find(":selected").attr("data-appuserid") == undefined ?
            0 : $('#FirstChecker').find(":selected").attr("data-appuserid");
        var userId = 1;
        var listcheckerForReport = [];
        var filteredChecker = listcheckerForReport.filter(x => x.CheckerId == checkerId);

        if (dsAccessible == 'true' || dsAccessible == 'True' || appUserId == userId || filteredChecker.length > 0) {
            $('.firstCheckerDs').removeClass("hidden");
            $('.firstCheckerDs').prop('checked', true);
        }
        else {
            $('.firstCheckerDs').addClass("hidden");
            $('.firstCheckerDs').prop('checked', false);
        }

    });

    $('#SecondChecker').change(function () { // to show checkbox when selecting checker
        $('#secondCheckerDesignation').html($(this).find(":selected").attr("data-designation"));
        $('#secondCheckerRegNumber').html($(this).find(":selected").attr("data-regno"));

        var dsAccessible = $('#SecondChecker').find(":selected").attr("data-isdsaccessible") == undefined ?
            false : $('#SecondChecker').find(":selected").attr("data-isdsaccessible");

        var checkerId = this.value;
        var appUserId = $('#SecondChecker').find(":selected").attr("data-appuserid") == undefined ?
            0 : $('#SecondChecker').find(":selected").attr("data-appuserid");
        var userId = 1;
        var listcheckerForReport = [];
        var filteredChecker = listcheckerForReport.filter(x => x.CheckerId == checkerId);

        if (dsAccessible == 'true' || dsAccessible == 'True' || appUserId == userId || filteredChecker.length > 0) {
            $('.secondCheckerDs').removeClass("hidden");
            $('.secondCheckerDs').prop('checked', true);
        }
        else {
            $('.secondCheckerDs').addClass("hidden");
            $('.secondCheckerDs').prop('checked', false);
        }
    });

    $('#ThirdChecker').change(function () { // to show checkbox when selecting checker
        $('#thirdCheckerDesignation').html($(this).find(":selected").attr("data-designation"));
        $('#thirdCheckerRegNumber').html($(this).find(":selected").attr("data-regno"));

        var dsAccessible = $('#ThirdChecker').find(":selected").attr("data-isdsaccessible") == undefined ?
            false : $('#ThirdChecker').find(":selected").attr("data-isdsaccessible");

        var checkerId = this.value;
        var appUserId = $('#ThirdChecker').find(":selected").attr("data-appuserid") == undefined ?
            0 : $('#ThirdChecker').find(":selected").attr("data-appuserid");
        var userId = 1;
        var listcheckerForReport = [];
        var filteredChecker = listcheckerForReport.filter(x => x.CheckerId == checkerId);

        if (dsAccessible == 'true' || dsAccessible == 'True' || appUserId == userId || filteredChecker.length > 0) {
            $('.thirdCheckerDs').removeClass("hidden");
            $('.thirdCheckerDs').prop('checked', true);
        }
        else {

            $('.thirdCheckerDs').addClass("hidden");
            $('.thirdCheckerDs').prop('checked', false);
        }
    });

    $('#FirstChecker').trigger('change');
    $('#SecondChecker').trigger('change');
    $('#ThirdChecker').trigger('change');
    //$('#firstCheckerDesignation').html($('#FirstChecker').find(":selected").attr("data-designation"));
    //$('#firstCheckerRegNumber').html($('#FirstChecker').find(":selected").attr("data-regno"));
    //$('#secondCheckerDesignation').html($('#SecondChecker').find(":selected").attr("data-designation"));
    //$('#secondCheckerRegNumber').html($('#SecondChecker').find(":selected").attr("data-regno"));



    // Navigation using key arrow
    if ($('input:focus').length == 0) { $('.tabIndex').first().focus(); }
    if ($('select:focus').length == 0) { $('.tabIndex').first().focus(); }
    var currentFocusElement = 0;
    //console.log($('.btnSubTest').is(':focus'));


    $(".tabIndex").on('keydown', function (e) {
        var btnSubTestIsFocus = $('.btnSubTest').is(':focus');
        // Down Key
        if (e.keyCode == 40 || e.keyCode == 13) {
            e.preventDefault();
            // alert("down button key");
            //if(!btnSubTestIsFocus)
            //    btnSubTestIsFocus = $('.btnSubTest').is(':focus');
            if (btnSubTestIsFocus && e.keyCode == 13) {
                btnSubTestIsFocus = false;
                loadSubTestFromBtn($(this));
                return;
            }
            var inputs = $(".tabIndex");
            btnSubTestIsFocus = false;

            if (inputs.index(this) == inputs.length - 1) {
                inputs.get(0).focus();
                return;
            }

            var nextInput = inputs.get(inputs.index(this) + 1);

            if (nextInput) {
                nextInput.focus();
                currentFocusElement = nextInput;
            }


        }
        // Up Key
        if (e.keyCode == 38) {
            e.preventDefault();
            var inputs = $(".tabIndex");
            var previous = inputs.get(inputs.index(this) - 1);
            if (previous) {
                previous.focus();
                currentFocusElement = previous;
            }

        }
    }
    );
    //$("body").on('keydown',":input:not(textarea)",function(e) {
    //    if (e.keyCode == 13) {
    //        if(currentFocusElement != 0)
    //            setTimeout(function(){ currentFocusElement.focus(); },100);

    //    }
    //});

    //$(".select2-selection").on('keydown',function(e) {
    //    // Down Key
    //    if (e.keyCode == 40 || e.keyCode ==13) {
    //        e.preventDefault();
    //        var inputs = $('.select2').next().find('input.tabindex');

    //        var nextInput = inputs.get(inputs.index(this)+1);

    //        if (nextInput) {
    //            console.log(nextInput)
    //            nextInput.focus();
    //            currentFocusElement = nextInput;
    //        }


    //    }
    //    // Up Key
    //    if (e.keyCode == 38) {
    //        e.preventDefault();
    //        var inputs = $(".tabIndex");
    //        var previous = inputs.get(inputs.index(this) - 1);
    //        if (previous) {
    //            previous.focus();
    //            currentFocusElement = previous;
    //        }

    //    }
    //});


    // SubTest
    $("#subTestEntryBody").on('keydown', ".tabIndex", function (e) {
        // Down Key
        if (e.keyCode == 40 || e.keyCode == 13) {
            e.preventDefault();
            // alert("down button key");
            var inputs = $("#subTestEntryBody .tabIndex");

            if (inputs.index(this) == inputs.length - 1) {
                inputs.get(0).focus();
                return;
            }

            var nextInput = inputs.get(inputs.index(this) + 1);

            if (nextInput) {
                nextInput.focus();
            }


        }
        // Up Key
        if (e.keyCode == 38) {
            e.preventDefault();
            var inputs = $("#subTestEntryBody .tabIndex");
            var previous = inputs.get(inputs.index(this) - 1);
            if (previous) {
                previous.focus();
            }

        }
    }
    );

    // Remining Sub Test
    $("#remainingSubTestEntryBody").on('keydown', ".tabIndex", function (e) {
        // Down Key
        if (e.keyCode == 40 || e.keyCode == 13) {
            e.preventDefault();
            // alert("down button key");
            var inputs = $("#remainingSubTestEntryBody .tabIndex");

            if (inputs.index(this) == inputs.length - 1) {
                inputs.get(0).focus();
                return;
            }

            var nextInput = inputs.get(inputs.index(this) + 1);
            if (nextInput) {
                nextInput.focus();
            }


        }
        // Up Key
        if (e.keyCode == 38) {
            e.preventDefault();
            var inputs = $("#remainingSubTestEntryBody .tabIndex");
            var previous = inputs.get(inputs.index(this) - 1);
            if (previous) {
                previous.focus();
            }

        }
    }
    );



    //// To get Nepali date
    //$('#DateOfReporting').change( function(e){
    //    ShowLoading(true);

    //    var ajaxCall = $.ajax({
    //        type: 'Post',
    //        //async: false,
    //        data: {'date':$(this).val()},
    //        url: '../Base/GetNepaliDate'
    //    });

    //    ajaxCall.done(function (resp) {
    //        $('#NepaliDateOfReporting').val(resp);
    //        ShowLoading(false);

    //    });

    //    ajaxCall.fail(function (resp) {
    //        //alert(resp.responseText);
    //        showOkDialog("info", "Failure", "Server error, please try again later !!");
    //        ShowLoading(false);

    //    });
    //});

    $('body').on('shown.bs.modal', '#subTestEntry', function () {
        $('input:visible:enabled:first', this).focus();
        $('select:visible:enabled:first', this).select2('open');
    });


    $('body').on('shown.bs.modal', '#remainingSubTestEntry', function () {
        $('input:visible:enabled:first', this).focus();
    });

    $('#DateOfReporting').on('change', function () {
        var nepaliDate = DateConverter.ad2bs($(this).val());
        $('#dtpNepaliFrom').html("(" + nepaliDate + ")");
        $('#NepaliDateOfReporting').val(nepaliDate);
    });
    $('#DateOfReporting').trigger('change');


    // Note Height length grow
    $('.testNote').on('focus', function () {
        $(this).addClass('focusedTestNote');
    });
    $('.testNote').on('focusout', function () {
        $(this).removeClass('focusedTestNote');
        $(this).css('height', '24px');
    });

    function auto_grow(element) {
        element.style.height = "24px";
        //console.log(element.scrollHeight)
        element.style.height = (element.scrollHeight) + "px";
    }



    // Fix info
    window.onscroll = function () { myFunction() };

    var header = $("#doctorContainer");
    var sticky = header.offset().top;
    // Old
    //function myFunction() {
    //    if (window.pageYOffset > sticky) {
    //        header.addClass("sticky");
    //        $('#fixedIdContainer').removeClass('hidden');
    //        $('#firstCheckerDesignation').addClass('hidden');
    //        $('#firstCheckerRegNumber').addClass('hidden');
    //        $('#secondCheckerDesignation').addClass('hidden');
    //        $('#secondCheckerRegNumber').addClass('hidden');
    //        $('.reportContainer').addClass("fixInfoMargin");

    //    } else {
    //        header.removeClass("sticky");
    //        $('#fixedIdContainer').addClass('hidden');
    //        $('#firstCheckerDesignation').removeClass('hidden');
    //        $('#firstCheckerRegNumber').removeClass('hidden');
    //        $('#secondCheckerDesignation').removeClass('hidden');
    //        $('#secondCheckerRegNumber').removeClass('hidden');
    //        $('.reportContainer').removeClass("fixInfoMargin");
    //    }
    //}
    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.addClass("sticky").addClass("floatContainer");
            $('.reportContainer').addClass("fixInfoMargin");
            $('#fixedIdContainer').removeClass("hidden");
            $('.toBeHidden').addClass("hidden");
            $('#patientInfoCont').removeClass("hidden");

        } else {
            header.removeClass("sticky").removeClass("floatContainer");
            $('.reportContainer').removeClass("fixInfoMargin");
            $('#fixedIdContainer').addClass("hidden");
            $('.toBeHidden').removeClass("hidden");
            $('#patientInfoCont').addClass("hidden");


        }
    }

    // Highlight Row
    $('.testInputText').focus(function () {
        $(this).closest('tr').addClass('highLightRow');
    });
    $('.testInputText').blur(function () {
        $(this).closest('tr').removeClass('highLightRow');
    });

    //$(document).on("keypress", ":input:not(textarea)", function(event) {
    //    if(event.keyCode == 13)
    //      //  $('body').trigger("keydown",".tabIndex");
    //        $('body').trigger(".tabIndex","keydown");
    //   // return event.keyCode != 13;
    //});

    $('tr[disabled]').attr("title", 'Published test cannot be edited');
    $('tr[disabled] input, tr[disabled] textarea').attr("disabled", "disabled");
    if (37 == $('tr[disabled]').length)
        $('input[type="submit"]').attr("disabled", "disabled").attr("title", 'Published test cannot be edited');

    $('#doctorContainer').css('width', $(".reportContainer ").width() - 20)
    $('.navReportEntry').addClass('active');


    // Formula
    $('body').on('click', '.btnEval', function (e) {
        ShowLoading(true);
        var btn = $(this);
        var formula = btn.attr('formula');
        var resultInputId = btn.attr('txtresultid');
        var aliasValues = [];
        var aliasInputs = $('.tabIndex');

        $.each(aliasInputs, function (key, txtResult) {

            if (txtResult != undefined && $(txtResult).attr('alias') != undefined) {
                var alias = $(txtResult).attr('alias');
                if (alias != '' && alias != null && $(txtResult).val().trim() != "" && !isNaN($(txtResult).val()))
                    //aliasValues.push("{Alias:"+alias+",Value:"+$(txtResult).val()+"}");
                    aliasValues.push({ "Alias": alias, "Value": Number($(txtResult).val()) });

                // aliasValues.push("{"+alias+","+$(txtResult).val()+ "}");
                ;
            }
        });


        $.ajax({
            url: '/ReportEntry/ReportEntry/GetEvaluatedResult',
            dataType: 'json',
            type: 'POST',
            data: {
                "Formula": formula,
                "AliasWithValue": aliasValues
            },
            success: function (res) {
                ShowLoading(false);

                if (res == "FormulaInvalid") {
                    showOkDialog("", "Formula Invalid !", "Formula is invalid, Check formula of the test !!");
                    return;
                }
                if (res == "NotEnoughValues") {
                    showOkDialog("", "NotEnoughValues !", "Constraint in formula doesnot have values !!");
                    return;
                }
                if (res == "Error" || isNaN(res)) {
                    showOkDialog("", "Error !", "Unable to evaluate the formula, Contact Administrator !!");
                    return;
                }

                $('#' + resultInputId).val(res).trigger('input');

            },
            error: function (res) {
                showOkDialog("", "Server Error !", "Unable to save the record, Contact Administrator !!");
                $('#subTestEntry').modal("hide");
                $('#remainingSubTestEntry').modal("hide");
                ShowLoading(false);

            }

        });

    });

    function subTestResultOption_select2Init() {
        $("#subTestEntry .testResultOption").select2({
            tags: true,
            createTag: function (tag) {

                var term = $.trim(tag.term);
                if (term === '') {
                    return null;
                }
                return {
                    id: tag.term,
                    text: tag.term,
                    isNew: true
                };
            },
            minimumInputLength: 0,
            ajax: {
                method: 'POST',
                dataType: 'json',
                delay: 250,
                url: '/ReportEntry/ReportEntry/GetTestResultOption',
                data: function (params) {
                    var query = {
                        TestDiagnosisGroupId: null,
                        TestId: (globalIsCulture == 'False') ? $('.select2-container--open').prev('select').data('testid') : 0,
                        SubTestId: $('.select2-container--open').prev('select').data('subtestid')
                    }
                    return query;
                },
                processResults: function (data, params) {
                    params.page = 1;
                    return {
                        results: data.map(function (item) {
                            return {
                                id: item.TestResult,
                                text: item.TestResult
                            };
                        }),
                        cache: true
                    };
                },

            }
        }).on("select2:select", function (e) {

            //var subTestResult = e.currentTarget.id;
            var subTestResult = e.currentTarget.getAttribute("subtestmodelid");
            console.log(subTestResult);
            document.getElementById(subTestResult.trim()).value = e.params.data.id;

        })
        $("#subTestEntry .testResultOption").on("select2:open", function () {
            $('.select2-dropdown').css('width', 'auto')
        })
    };

    jQuery.hotkeys.options.filterInputAcceptingElements = false;
    //jQuery.hotkeys.options.filterContentEditable = false;
    jQuery.hotkeys.options.filterTextInputs = false;
    $(document).bind('keydown', 'Alt+s', function (e) {
        e.preventDefault();
        if ($('#subTestEntry').hasClass('in') && !$('#remainingSubTestEntry').hasClass('in')) {
            $("#subTestForm").submit();
        }
        if ($('#remainingSubTestEntry').hasClass('in') && $('#subTestEntry').hasClass('in')) {
            $('#remainingSubTestForm').submit();
        }

    })

    $("#normalReportForm table").on("keydown", ".select2", function (e) {
        var input = $(this).prevAll("select").first();
        var inputs = input.attr("modelid");
        var inputSplit = inputs.split('_');
        if (inputSplit[1] == undefined)
            inputSplit[1] = 0;

        if (e.keyCode == 40) {
            e.preventDefault();
            var focusIndex = parseInt(inputSplit[1]) + 1;
            setTimeout(function () {
                $(':focus').blur();
                console.log(focusIndex);
                $("#txtTestResult_" + focusIndex).focus();
            }, 1);
        }
        if (e.keyCode == 38) {
            e.preventDefault();
            var focusIndex = parseInt(inputSplit[1]) - 1;
            if (focusIndex == -1)
                focusIndex = 0;
            console.log(focusIndex);
            setTimeout(function () {
                $(':focus').blur();
                $("#txtTestResult_" + focusIndex).focus();
            }, 1);
        }

    });
    $("#subTestEntryBody table").on("keydown", ".select2", function (e) {
        var input = $(this).prevAll("select").first();
        var inputs = input.attr("id");
        var inputSplit = inputs.split('_');
        if (inputSplit[1] == undefined)
            inputSplit[1] = 0;

        if (e.keyCode == 40) {
            e.preventDefault();
            var focusIndex = parseInt(inputSplit[1]) + 1;

            setTimeout(function () {
                $(':focus').blur();
                $("#txtSubTest_" + focusIndex).focus();
            }, 1);
        }
        if (e.keyCode == 38) {
            e.preventDefault();
            var focusIndex = parseInt(inputSplit[1]) - 1;
            if (focusIndex == -1)
                focusIndex = 0;
            setTimeout(function () {
                $(':focus').blur();
                $("#txtSubTest_" + focusIndex).focus();
            }, 1);
        }

    })

    $('.SendSMS').click(async function () {
        await GetSmsCredits();
        if (IsContactNoValid('0000000000')) {
            if (smsMessageTemplateId == 0) {
                var messageTemplates = $.ajax({
                    type: 'Post',
                    url: '/ReportEntry/Message/GetTemplate',
                    data: {
                        //MessageTemplateId: creditPartyCode,
                        MessageTemplateName: 'ReportReadyLink'
                    }

                });
                messageTemplates.done(function (response) {
                    if (response != null) {
                        //var res=JSON.parse(response);
                        if (response.length > 0) {
                            smsMessageTemplate = response[0].MessageBody,
                                smsMessageTemplateId = response[0].MessageTemplateId
                        }
                    }
                    //ShowLoading(false);
                });
                messageTemplates.fail(function () {
                    //ShowLoading(false);
                });
            }

            if (!(await showYesNoDialog("", "Send SMS", "Send SMS to Master Aew  Wae at 0000000000 ?")))
                return;
            SendSMS();
        }
        else {
            alert('Contact number not valid');
        }
    });
    $('.SendEmail').click(async function () {
        if (IsEmailValid('')) {
            if (emailMessageTemplateId == 0) {
                var messageTemplates = $.ajax({
                    type: 'Post',
                    url: '/ReportEntry/Message/GetTemplate',
                    data: {
                        MessageTemplateName: 'Send Report'
                    }

                });
                messageTemplates.done(function (response) {
                    if (response != null) {
                        //var res=JSON.parse(response);
                        if (response.length > 0) {
                            emailMessageTemplate = response[0].MessageBody;
                            emailMessageTemplateId = response[0].MessageTemplateId;
                            emailMessageSubject = response[0].Subject
                        }
                    }
                    //ShowLoading(false);
                });
                messageTemplates.fail(function () {
                    //ShowLoading(false);
                });
            }

            if (!(await showYesNoDialog("", "Send Email", "Send Email to Master Aew  Wae at  ?")))
                return;


            SendEmail(7, $(this).attr('reporttype'), $(this).attr('rId'), ($(this).attr('isculture') == "1") ? true : false);
        }
        else {
            alert('EmailId not valid');
        }
    });

    function IsEmailValid(email) {
        var emailReg = /^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*@((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/i;
        //var emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return emailReg.test(email);
    }
    function IsContactNoValid(contactNo) {
        var conReg = /^9[87]\d{8}$/;
        return conReg.test(contactNo);
    }
    function SendSMS() {

        if (smsMessageTemplateId == 0) {
            alert('Template could not be loaded. Please try again later.');
            return;
        }
        var ajaxCall = $.ajax({
            type: 'Post',
            data: {
                isSms: true
                , template: smsMessageTemplateId
                , subject: ''
                , PatientId: ['114']
                , PatientName: ['Master Aew  Wae']
                , MobileNo: ['0000000000']
                , Email: ['']
                , MessageTextArea: smsMessageTemplate.replace('{0}', 'Master Aew  Wae').replace('{1}', '114')
                , fiscalYearId: 1
            },
            url: "/ReportEntry/Message/Send"
        });
        ajaxCall.done(function (response) {
            if (response != null) {
                if (response.Response != null) {
                    //response = JSON.Parse(response);
                    if (response.Response.NotificationResponseViewModel.Success) {
                        alert("Message sent");
                    }
                    else {
                        alert("Message couldnot be sent");
                    }
                }
            }
            ShowLoading(false);
        });
        ajaxCall.fail(function (res) {
            console.log(res);
            ShowLoading(false);
        });
    }
    var selectedReportTemplate = 1;
    function SendEmail(reportType, reportFormat, recordId, isCulture) {

        if (emailMessageTemplateId == 0) {
            alert('Template could not be loaded. Please try again later.');
            return;
        }
        var ajaxCall = $.ajax({
            type: 'Post',
            data: {
                IsSms: false
                , Template: emailMessageTemplateId
                , Subject: emailMessageSubject
                , PatientId: ['114']
                , PatientName: ['Master Aew  Wae']
                , MobileNo: ['0000000000']
                , Email: ['']
                , MessageTextArea: emailMessageTemplate.replace('{0}', 'Master Aew  Wae').replace('{1}', '114')
                , FiscalYearId: 1
                , ReportType: [reportType]
                , ReportFormat: [reportFormat]
                , RecordId: [recordId]
                , IsCulture: [isCulture]
            },
            url: "/ReportEntry/Message/Send"
        });
        ajaxCall.done(function (response) {
            if (response != null) {
                if (response.Response != null) {
                    //response = JSON.Parse(response);
                    if (response.Response.Success) {
                        alert("Message sent");
                    }
                    else {
                        alert("Message couldnot be sent");
                    }
                }
            }
            ShowLoading(false);
        });
        ajaxCall.fail(function (res) {
            console.log(res);
            ShowLoading(false);
        });
    }

    function FetchOldBills() {
        ShowLoading(true);
        var ajaxCall = $.ajax({
            type: 'Post',
            url: "/ReportEntry/Patient/GetOldBillsBySampleId?q=TfsUCzv2sBPnPYlbrsr5FJ/PPSN32jVJSUBBPyejbBqjWKVzXE1sXQ=="
        });
        ajaxCall.done(function (response) {

            if (response != null) {
                let respo = JSON.parse(response);
                respo.forEach(r => {
                    let allDa = '';
                    if (r.Tests != null) {
                        let splDa = r.Tests.split(',');
                        da = "<ul class='test_lister'>" + splDa.map(function (resa) {
                            return "<li>" + resa + "</li>";
                        }).join('') + "</ul>";
                        allDa = da;
                    }
                    $('#oldBillModal .modal-body tbody').append('<tr><td title="Click to view full Bill"><a href="' + r.URL + '" target="_blank">' + r.BillNo + '</a></td><td class="tester" data-toggle="tooltip" data-placement="bottom" data-html="true" title="' + allDa + '">' + r.Tests + '</td></tr>');
                })
            }



            ShowLoading(false);
            $('[data-toggle="tooltip"]').tooltip()
        });
        ajaxCall.fail(function (res) {
            console.log(res);
            ShowLoading(false);
        });
    }

    $('body').on('click', '.older_bills', function (e) {
        e.preventDefault();
        FetchOldBills()
        $('#oldBillModal').modal('show')
    })

    $('body').on('click', '.tester', function (e) {
        if (this.style.display != 'block') {
            this.style.display = 'block';
        } else {
            this.style.display = '-webkit-box';
        }
    })


    async function GetSmsCredits() {
        var ajaxCall = $.ajax({
            type: 'Post',
            url: "/ReportEntry/Message/GetSmsCredit"
        });
        ajaxCall.done(function (response) {
            response = JSON.parse(JSON.parse(response));
            if (response != null) {
                if (response.response_code != null) {
                    if (response.response_code == 200) {
                        $.toaster({ priority: 'success', title: 'Success', message: response.credits_available + " Credits Available" });
                    }
                    else
                        console.log(response);
                }
                else
                    console.log(response);
            }
            ShowLoading(false);
        });
        ajaxCall.fail(function (res) {
            console.log(res);
            ShowLoading(false);
        });
    }

}

const DefData = (props) => {
    const { visible, setClickedId, newFiscalId, allDataRet, handleOk, isDataVerified, isMaleFemale } = props
    const dispatch = useDispatch();
    const [newArData, setNewArData] = useState([]);
    const [isVerified, setIsVerified] = useState(false);
    const [showSubModal, setshowSubModal] = useState(false);

    const handleEnterTest = () => {
        setshowSubModal(true)
    }

    const handleCancel = () => {
        setshowSubModal(false);
    };

    const verifyAllData = () => {
        let isAllDataVerified = false
        let allVerButtonData = document.querySelectorAll('.panelStart button')
        for (let index = 0; index < allVerButtonData.length; index++) {
            const element = allVerButtonData[index];
            let singleEleData = element.closest('tr').children[1].children[0].value
            let allSingleData = JSON.parse(element.dataset.all)
            // console.log(allSingleData, singleEleData);
            isAllDataVerified = true
        }
        isDataVerified(isAllDataVerified)
    }

    useEffect(() => {
        if (handleOk === true) {
            verifyAllData()
        }
    }, [handleOk])

    useEffect(() => {
        setNewArData([])
        if (visible === true) {
            let fullDa = {
                sampleid: setClickedId,
                fiscalyear: newFiscalId
            };
            dispatch(careLabTestListApi(fullDa, (res) => {
                let newArray = {}
                let newJSON = {}
                let newSub = {}

                allDataRet(res)

                for (const key in res) {
                    if (Object.hasOwnProperty.call(res, key)) {
                        const ele = res[key];

                        let panelName = ele?.Panel
                        let groupName = `${ele?.Panel}_${ele?.GroupName}`
                        let subTypeName = `${ele?.Testname}?q=&${ele?.Panel}_${ele?.GroupName}`

                        if (!newArray[panelName]) {
                            newArray[panelName] = [];
                        }

                        if (!newJSON[groupName]) {
                            newJSON[groupName] = [];
                        }

                        //subtype
                        if (subTypeName !== null && !newSub[subTypeName]) {
                            newSub[subTypeName] = [];
                        }

                        newSub[subTypeName] = [...newSub[subTypeName], ele];
                        //subtype

                        // newJSON[groupName] = [...newJSON[groupName], ele];
                    }
                }

                for (const key in newSub) {
                    if (Object.hasOwnProperty.call(newSub, key)) {
                        let spKey = key.split('?q=&')[1];
                        const element = newSub[key];
                        newJSON[spKey].push(element)
                    }
                }


                for (const key in newJSON) {
                    if (Object.hasOwnProperty.call(newJSON, key)) {
                        let spKey = key.split('_')[0];
                        const element = newJSON[key];
                        newArray[spKey].push(element)
                    }
                }

                setNewArData(newArray);

            }))
        }
    }, [visible])

    const verifyOne = (e) => {
        let allData = JSON.parse(e.target.dataset.all)
        let testResultValue = e.target.closest('tr').children[1].children[0].value;
        console.log(allData, testResultValue);
    }

    const testResultChange = (e) => {
        let testValue = e.target.value;
        let closeTr = e.target.closest('tr')
        closeTr.removeAttribute('class')
        let ranger = closeTr.children[3].children[0].innerHTML;
        let formattedresult = '';
        if (ranger != undefined && ranger != null && ranger != "") {
            ranger = ranger.replace("<br>", "</br>").replace('&lt;', '<').replace('&gt;', '>');
            formattedresult = IsOutOfRange(testValue, ranger);
        }
        closeTr.classList.add(formattedresult)
    }

    const IsOutOfRange = (inputText, rangeValue) => {
        // isMaleFemale
        var splitter = "</br>";

        var newLineCount = rangeValue.split(splitter).length - 1;
        if (newLineCount == 0) {
            return highLowFinder(rangeValue, inputText);
        } else if (newLineCount == 1) {
            var multiRange = rangeValue.split("</br>");
            var currentRange = multiRange[0].trim();
            if (multiRange[0].indexOf(isMaleFemale) < 0) {
                currentRange = multiRange[1].trim();
            }
            return highLowFinder(currentRange.split(':')[1], inputText);
        }
        return inputText;
    }

    const highLowFinder = (range, result) => {
        try {

            var sp = '\0';

            if (range.indexOf('-') >= 0)
                sp = '-';
            else if (range.indexOf('<') >= 0)
                sp = '<';
            else if (range.indexOf('>') >= 0)
                sp = '>';

            if (sp != '\0') {

                var resultvalue = Number(result);
                var testRange = range.split(sp);

                if (testRange[0] == undefined || testRange[0] == null)
                    testRange[0] = "0";
                var FirstRange = Number(testRange[0]);
                var SecondRange = Number(testRange[1]);
                if (sp == '-') {
                    if (resultvalue > SecondRange) {
                        return "high";
                    }
                    if (resultvalue < FirstRange) {
                        return "low";
                    }
                }
                else if (sp == '<' && resultvalue > 0) {
                    if (resultvalue > SecondRange) {
                        return "high";
                    }

                }
                else if (sp == '>' && resultvalue > 0) {
                    if (resultvalue < SecondRange) {
                        return "low";
                    }

                }

                else {
                    return "InCorrectFormat";
                }

                return result;
            }
        }
        catch (e) {

            return "Error" + e;


        }
    }

    return (
        <>
            {
                newArData && Object.entries(newArData).map(def => {
                    let panelName = def[0];
                    let panelValue = def[1]
                    return (
                        <div className="panelStart">
                            <div className='panelClass'>{panelName}</div>
                            <hr />
                            {
                                panelValue && Object.entries(panelValue).map(pan => {
                                    let groupName = pan[1][0][0]?.GroupName
                                    let groupValue = pan[1]
                                    return (
                                        <>
                                            {
                                                panelName !== groupName ?
                                                    (
                                                        <>
                                                            <div className="groupHead">{groupName}</div>
                                                            <hr />
                                                        </>
                                                    )
                                                    : ''
                                            }
                                            <table className='testTable'>
                                                <thead>
                                                    <tr>
                                                        <th className="testNameHead">Test Name</th>
                                                        <th className="testNameResult">Test Result</th>
                                                        <th className="testNameUnit">Units</th>
                                                        <th className="testNameRange">Range</th>
                                                        <th className="testNameNote">Note</th>
                                                        <th className="testNameAction">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        groupValue && groupValue.map(gou => {
                                                            if (gou.length > 1) {
                                                                let testNameHeader = gou[0]?.Testname;
                                                                return (
                                                                    <>
                                                                        {
                                                                            gou[0]?.subtestId !== null ?
                                                                                <tr>
                                                                                    <th>{testNameHeader}</th>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                                :
                                                                                ''
                                                                        }

                                                                        {
                                                                            gou.map(tesLi => {
                                                                                let isSubtest = tesLi?.subtestId !== null;
                                                                                return (
                                                                                    <tr className={isSubtest ? "subTestClass" : ''}>
                                                                                        {
                                                                                            isSubtest ? <td>{tesLi?.TestSubType}</td> : <th>{tesLi?.Testname}</th>
                                                                                        }
                                                                                        <td>
                                                                                            {
                                                                                                tesLi?.IsCulture === true || tesLi?.SubGroupId === true ?
                                                                                                    <button>Enter Test</button>
                                                                                                    :
                                                                                                    <input type={'text'} defaultValue=
                                                                                                        {
                                                                                                            isSubtest ?
                                                                                                                tesLi?.subresult !== null ? tesLi?.subresult : ''
                                                                                                                :
                                                                                                                tesLi?.TestResult !== null ? tesLi?.TestResult : ''
                                                                                                        }
                                                                                                        onChange={testResultChange}
                                                                                                    />
                                                                                            }
                                                                                        </td>
                                                                                        <td>{tesLi?.Units}</td>
                                                                                        <td className="ranger">{<Markup content={isSubtest ? tesLi?.Range : tesLi?.Max} />}</td>
                                                                                        <td>{<Markup content={gou[0]?.Note} />}</td>
                                                                                        <td><button tabIndex={-1} data-all={JSON.stringify(gou[0])} onClick={verifyOne}>Verify</button></td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </>
                                                                )
                                                            } else {
                                                                return (
                                                                    <tr>
                                                                        <th>{gou[0]?.Testname}</th>
                                                                        <td>
                                                                            {
                                                                                gou[0]?.IsCulture === true || gou[0]?.SubGroupId === true ?
                                                                                    <button onClick={handleEnterTest}>Enter Test</button>
                                                                                    :
                                                                                    <input
                                                                                        type={'text'}
                                                                                        defaultValue={gou[0]?.TestResult !== null ? gou[0]?.TestResult : ''}
                                                                                        onChange={testResultChange}
                                                                                    />
                                                                            }
                                                                        </td>
                                                                        <td>{gou[0]?.Units}</td>
                                                                        <td className="ranger">{<Markup content={gou[0]?.Max} />}</td>
                                                                        <td>{<Markup content={gou[0]?.Note} />}</td>
                                                                        <td>
                                                                            {/* <Button type="primary" tabIndex={-1} data-all={JSON.stringify(gou[0])} onClick={verifyOne}>
                                                                                Verify
                                                                            </Button> */}
                                                                            <button tabIndex={-1} data-all={JSON.stringify(gou[0])} onClick={verifyOne}>Verify</button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }

            <SubTestModal visible={showSubModal} handleCancel={handleCancel} />
        </>
    )

}

export default DefData