/** 
 * @file 颜色转换为覆盖黑色饱和度图层的明度值
 * @author ltaoo
 */
var debug_mode = false;

var lblResult = window.document.getElementById('value');
var box = document.getElementsByClassName('gray_box__line')[0];
var boxCursor = document.getElementsByClassName('gray_box__cursor')[0];

if (!debug_mode) {
  closeBtn.style.display = 'none';
}

function SetResultLabel(content) {
    lblResult.innerText = content;
}

/**
 * 设置光标在灰色条的位置
 * @param {Element} $box
 * @param {number} value - 灰度值
 */
function setPosition(value) {
  var width = box.clientWidth;
  var leftInstance = width * (value / 100);
  console.log(width, leftInstance);
  boxCursor.style.left = leftInstance + 'px';
}

var gAlertsOn = true;

var gStartDate = new Date();
var gEndDate = new Date();

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
}

var HANDLERS = {
  // 取色器取色
  eyeDropperSample: function (eventDataParse) {
      var r = eventDataParse.eventData.to.red;
      var g = eventDataParse.eventData.to.grain;
      var b = eventDataParse.eventData.to.blue;
      return rgb2gray(r, g, b);
  },
  // 取色面板取色
  colorPickerPanel: function (eventDataParse) {
      var h = eventDataParse.eventData.to.hue._value;
      var s = eventDataParse.eventData.to.saturation;
      var b = eventDataParse.eventData.to.brightness;
      return hsb2gray(h, s, b);
  },
};

function PhotoshopCallbackUnique(csEvent) {
    console.log(csEvent);
    if (typeof csEvent.data !== 'string') {
      return;
    }
    var eventData = csEvent.data.replace('ver1,{', '{');
    var eventDataParse = JSON.parse(eventData);
    var source = eventDataParse.eventData.source;
    var handle = HANDLERS[source];
    console.log(source, handle);
    if (handle) {
      const value = handle(eventDataParse);
      SetResultLabel(value);
      setPosition(value);
      return;
    }
    // SetResultLabel('该操作暂不支持');
}

// Initialize my panel for first view
function Initialize() {
    document.body.style.backgroundColor = "#" + UIColorToHexString(csInterface.hostEnvironment.appSkinInfo.panelBackgroundColor);
    Persistent(true);
    Register(true, gRegisteredEvents.toString());
    // SetResultLabel("Initialize done");
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
