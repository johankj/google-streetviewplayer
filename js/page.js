
var streetviewPlayer = null;

$(function() {

	$("#progress").mousedown(function(e) {
		var jProgress = $("#progress");
		var iFrame = Math.floor(streetviewPlayer.getTotalFrames() * ((e.pageX-jProgress.offset().left)/jProgress.width()))
		streetviewPlayer.setProgress(iFrame);
	});

	var sQuery = window.location.hash;
	if(sQuery && sQuery.length) {
		if(sQuery.indexOf("origin=")!=-1) {
			var sStart = sQuery.substring(sQuery.indexOf("=")+1,sQuery.indexOf("&"));
			var sEnd = sQuery.substring(sQuery.lastIndexOf("=")+1);

			document.getElementById("origin").value = unescape(sStart);
			document.getElementById("destination").value = unescape(sEnd);

			initMovie()
		}
	}
})

function pauseMovie(btn) {
	if(streetviewPlayer.getPaused()===false) {
		streetviewPlayer.setPaused(true);
		btn.value = "Play";
	} else {
		streetviewPlayer.setPaused(false);
		btn.value = "Pause";
	}
}

function initMovie() {
	streetviewPlayer = new google.maps.StreetViewPlayer({
		origin: document.getElementById("origin").value,
		destination: document.getElementById("destination").value,
		travelMode: google.maps.TravelMode.DRIVING,
		movieCanvas: document.getElementById("draw"),
		mapCanvas: document.getElementById("map"),
		onLoading: function() {
			document.getElementById("draw").className = "loading"
			document.getElementById("controls").style.visibility = "hidden";
		},
		onPlay: function() {
			document.getElementById("draw").className = "";
			document.getElementById("controls").style.visibility = "visible";
		},
		onProgress: function(progress) {
			document.getElementById("progressbar").style.width = progress + "%"
		}
	})
}

function speedUpMovie() {
	streetviewPlayer.setPlaySpeed(streetviewPlayer.getPlaySpeed()-100);
}

function slowDownMovie() {
	streetviewPlayer.setPlaySpeed(streetviewPlayer.getPlaySpeed()+100);
}

function buildLink() {
	window.location = "#origin="+escape(document.getElementById("origin").value)+"&destination="+escape(document.getElementById("destination").value);
}
