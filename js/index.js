/** 
 * @file 颜色转换为覆盖黑色饱和度图层的明度值
 * @author ltaoo
 */

var lblResult = window.document.getElementById("lblResult");

function SetResultLabel(content) {
    console.log(content);
    lblResult.innerText = content;
}

var gAlertsOn = true;

var gStartDate = new Date();
var gEndDate = new Date();

// Get a reference to a CSInterface object
var csInterface = new CSInterface();

// Get extension ID
var gExtensionID = csInterface.getExtensionID();

// some events we are interested in
var eventMake = 1298866208; // "Mk  "
var eventDelete = 1147958304; // "Dlt " 
var eventClose = 1131180832; // "Cls " 
var eventSelect = 1936483188; // "slct" 
var eventSet = 1936028772; // "setd" 
var gRegisteredEvents = [
  eventMake,
  eventDelete,
  eventClose,
  eventSelect,
  eventSet,
];

// all callbacks need to be unique so only your panel gets them
// for Photoshop specific add on the id of your extension
var eventType = 'com.adobe.PhotoshopJSONCallback' + gExtensionID;
csInterface.addEventListener(eventType, PhotoshopCallbackUnique);

closeBtn.onclick = function () {
    SetResultLabel('hello');
    Register(false, gRegisteredEvents.toString());
    Persistent(false);
    if (window.__adobe_cep__) {
        window.__adobe_cep__.closeExtension();
    }
};

/**
 * Tell Photoshop to not unload us when closed
 * @param {*} inOn - false 表示关闭，true 表示开启
 */
function Persistent(inOn) {
    var event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
    if (inOn) {
        event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
    }
    event.extensionId = gExtensionID;
    csInterface.dispatchEvent(event);
}

/**
 * Tell Photoshop the events we want to listen for
 * @param {boolean} inOn 
 * @param {string} inEvents 
 */
function Register(inOn, inEvents) {
    var event = new CSEvent('com.adobe.PhotoshopUnRegisterEvent', 'APPLICATION');
    if (inOn) {
        event = new CSEvent('com.adobe.PhotoshopRegisterEvent', 'APPLICATION');
    }
    event.extensionId = gExtensionID;
    event.data = inEvents;
    csInterface.dispatchEvent(event);
    SetResultLabel('Register: ' + inOn);
}


function PhotoshopCallbackUnique(csEvent) {
    SetResultLabel(csEvent.data);
    if (typeof csEvent.data === "string") {
        var eventData = csEvent.data.replace("ver1,{", "{");
        var eventDataParse = JSON.parse(eventData);
        var jsonStringBack = JSON.stringify(eventDataParse, null, '\t');
        // console.log(eventDataParse);
        // 选择颜色
        // if (eventDataParse.eventData.source === 'colorPickerPanel') {
        //   var h = eventDataParse.eventData.to.hue._value;
        //   var s = eventDataParse.eventData.to.saturation;
        //   var b = eventDataParse.eventData.to.brightness;
        //   SetResultLabel(hsb2gray(h, s, b));
        // } else {
        // }
        SetResultLabel(jsonStringBack);
        JSLogIt("PhotoshopCallbackUnique: " + jsonStringBack);
    } else {
        JSLogIt("PhotoshopCallbackUnique expecting string for csEvent.data!");
    }
}

// Initialize my panel for first view
function Initialize() {
    document.body.style.backgroundColor = "#" + UIColorToHexString(csInterface.hostEnvironment.appSkinInfo.panelBackgroundColor);
    Persistent(true);
    Register(true, gRegisteredEvents.toString());
    SetResultLabel("Initialize done");
}

function UIColorToHexString(inUIColor) {
    var s = "";
    try {
        if (typeof inUIColor == "undefined") return "undefined";
        if (inUIColor.type != 1) return "type:" + inUIColor.type;
        s += inUIColor.color.red.toString(16);
        s += inUIColor.color.green.toString(16);
        s += inUIColor.color.blue.toString(16);
    } catch (e) {
        s = e.toString();
    }
    return s;
}

function JSLogIt(inMessage) {
    // CSINTERFACE.EVALSCRIPT("LOGIT('" + INMESSAGE + "')");
}
