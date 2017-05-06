'use strict';

var U = {};

U.getBinarySearchIndex = function(arr, x){

	var i = 0, j = arr.length - 1, k;   

	while (i <= j) {
		k = Math.floor((i+j) / 2);
		if (x === arr[k] || Math.abs(i - j) <= 1 )
			return k;
		else if (x < arr[k])
			j = k-1;
		else
			i = k+1;
	}

	return -1;
};

// forEach for any type of arrays including NodeList
U.fe = function(list, callback){
	// Array.prototype.forEach.call(list, callback);
	[].forEach.call(list, callback);
}

U.disableHoverOnTouch = function(){
	// disable :hover on touch devices
	// based on https://gist.github.com/4404503
	// via https://twitter.com/javan/status/284873379062890496
	// + https://twitter.com/pennig/status/285790598642946048
	// re http://retrogamecrunch.com/tmp/hover
	if ('createTouch' in document) {
		try {
			var ignore = /:hover/;
			for (var i=0; i<document.styleSheets.length; i++) {
				var sheet = document.styleSheets[i];
				if (sheet.cssRules) {
					for (var j=sheet.cssRules.length-1; j>=0; j--) {
						var rule = sheet.cssRules[j];
						if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
							sheet.deleteRule(j);
						}
					}
				}
			}
		}
		catch(e){}
	}
};

U.getConnectionSpeed = function(img_src, img_size, callback, callback_args){

	// http://stackoverflow.com/questions/5529718/how-to-detect-internet-speed-in-javascript

	var downloadSize = img_size; //bytes
	var startTime, endTime;
	var download = new Image();
	download.onload = function(){
		endTime = (new Date()).getTime();
		// return results();
		var duration = (endTime - startTime) / 1000;
		var bitsLoaded = downloadSize * 8;
		var speedBps = (bitsLoaded / duration).toFixed(2);
		var speedKbps = (speedBps / 1024).toFixed(2);
		var speedMbps = (speedKbps / 1024).toFixed(2);

		var _result = {
			duration: duration,
			bits: bitsLoaded,
			bps: speedBps,
			Kbps: speedKbps,
			Mbps: speedMbps
		};

		callback(_result, callback_args);
	};

	download.onerror = function (err, msg) {
		console.log(err);
		console.log(msg);
	}

	startTime = (new Date()).getTime();
	var cacheBuster = '?cb=' + startTime;
	download.src = img_src + cacheBuster;
};

module.exports = U;
