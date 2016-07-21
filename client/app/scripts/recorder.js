'use strict';
var Recorder = function (playSelector, stopSelector) {

  function captureUserMedia(mediaConstraints, successCallback, errorCallback) {
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);
  }

  var mediaConstraints = {
    audio: true
  };

  var mediaRecorder;

  if( document.querySelector(playSelector)) {
    document.querySelector(playSelector).onclick = function() {
      this.removeAttribute('disabled')
      captureUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
    };
  }

  if( document.querySelector(stopSelector)) {
    document.querySelector(stopSelector).onclick = function() {
      this.addAttribute('disabled')
      mediaRecorder.stop();
      mediaRecorder.stream.stop();
    };
  }

  function onMediaSuccess(stream) {
    mediaRecorder = new MediaStreamRecorder(stream);
    mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
    mediaRecorder.ondataavailable = function (blob) {
        // POST/PUT "Blob" using FormData/XHR2
        var blobURL = URL.createObjectURL(blob);
        document.write('<a href="' + blobURL + '">' + blobURL + '</a>');
    };
    mediaRecorder.start(3000);
  }

  function onMediaError(e) {
    console.error('media error', e);
  }
}
