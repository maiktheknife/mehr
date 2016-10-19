function main() {

	var videoJQ = $('#layer_video');
	var videoJS = videoJQ.get(0);

	function tooglePlayStatus() {
		if (videoJS.paused) {
			videoJS.play();
		} else {
			videoJS.pause();
		}
	}

	function muteUnMute() {
		if (!videoJS.muted) {
			videoJS.muted = 'muted';
		} else {
			videoJS.muted = false;
		}
	}

	function setVolume() {

	}

}

$(document).ready(main);
