let getUserMedia = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

if(getUserMedia === undefined) {
    getUserMedia = function(constraints) {
        return new Promise((resolve, reject) => {
            if(navigator.mozGetUserMedia) {
                navigator.getUserMedia(constraints, resolve, reject);
            } else if(navigator.webkitGetUserMedia) {
                navigator.webkitGetUserMedia(constraints, resolve, reject);
            } else {
                reject('no getUserMedia found');
            }
        });
    }
}

export default getUserMedia;
