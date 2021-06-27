let audioBtn = document.querySelector("#record");
let audio = document.querySelector("audio");
let constraints = { audio: true, video: false };
let audioRecorder;
let isRecording = false;
let chunks = [];

audioBtn.addEventListener('click', function () {
    let recorderDiv = document.querySelector(".record-button-div");
    if (isRecording) {
        audioRecorder.stop();
        isRecording = false;
        recorderDiv.classList.remove("record-animation");
    }
    else {
        audioRecorder.start();
        isRecording = true;
        recorderDiv.classList.add("record-animation");
    }
});

navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    audio.srcObject = mediaStream;
    audioRecorder = new MediaRecorder(mediaStream);

    audioRecorder.addEventListener('dataavailable', function (e) {
        chunks.push(e.data);
    })

    audioRecorder.addEventListener('stop', function () {
        let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "audio";
        a.click();
        a.remove();
    });
});
