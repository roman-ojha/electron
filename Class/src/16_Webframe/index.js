const { webFrame } = require("electron");

function zoomOut() {
  webFrame.setZoomFactor(webFrame.getZoomFactor() - 1);
}

function zoomIn() {
  webFrame.setZoomFactor(webFrame.getZoomFactor() + 1);
}
