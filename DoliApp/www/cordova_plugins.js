cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-camerapicturebackground.CameraPictureBackground",
      "file": "plugins/cordova-plugin-camerapicturebackground/www/CameraPictureBackground.js",
      "pluginId": "cordova-plugin-camerapicturebackground",
      "clobbers": [
        "window.plugins.CameraPictureBackground"
      ]
    },
    {
      "id": "cordova-plugin-fetch.FetchPlugin",
      "file": "plugins/cordova-plugin-fetch/www/fetch.js",
      "pluginId": "cordova-plugin-fetch",
      "clobbers": [
        "cordovaFetch"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-camera": "6.0.0",
    "cordova-plugin-camerapicturebackground": "0.0.4",
    "cordova-plugin-fetch": "0.1.0"
  };
});