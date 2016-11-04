'use strict';
var Recorder = function (playSelector, stopSelector) {


  var mediaRecorder;

  var play = document.querySelector(playSelector);
  var stop = document.querySelector(stopSelector);

  var audioChunks = [];


  function onMediaSuccess(stream) {
    mediaRecorder = new MediaRecorder(stream);
    if(play) {
      play.onclick = function() {
        stop.disabled = false;
        play.disabled = true;
        mediaRecorder.start(3000);
      };
    }

    if(stop) {
      stop.onclick = function() {
        play.disabled = false
        stop.disabled = true;
        mediaRecorder.stop();
      };
    }

    mediaRecorder.ondataavailable = function(blob) {
      audioChunks.push(e.data);
    }

    mediaRecorder.onstop = function(e) {
      console.log('STOP');

      // POST/PUT "Blob" using FormData/XHR2
      var fd = new FormData();
      fd.append('fname', 'test.wav');
      fd.append('data', new Blob(audioChunks));

      $.ajax({
        type: 'POST',
        url: '/recognize',
        data: fd,
        processData: false,
        contentType: false,
        success: function(data) {
          console.log('VAMOSSSSS');
          console.log(data);
        }
      });
    };
  }

  function onMediaError(e) {
    console.error('media error', e);
  }

  navigator.mediaDevices.getUserMedia({ audio: true }).then(onMediaSuccess).catch(onMediaError);
}
