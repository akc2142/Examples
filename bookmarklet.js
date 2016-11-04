(function() {
	// the minimum version of jQuery we want
	var v = '1.11.3';
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
		var done = false;
		var script = document.createElement('script');
		script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + v + '/jquery.min.js';
		script.onload = script.onreadystatechange = function() {
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
				done = true;
				releaseTheKraken();
			}
		};
		document.getElementsByTagName('head')[0].appendChild(script);
	} else {
		releaseTheKraken();
	}

	function releaseTheKraken() {
    // Clear the expired overlay before initiating again
		jQuery('#yb_box').remove();
		jQuery('#no_box').remove();
		jQuery('#no_init_box').remove();

		if (document.readyState === 'complete') {
			theKraken = function() {
				// Stop automatic page reload
				/*  window.onbeforeunload = function() {
				  return "Are you sure you want to leave? Think of the kittens!";
				} */
				// Blow out the cookies
				document.cookie.split(";").forEach(function(c) {
					document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
				});

				var ybGo, pairs, html, requestId, pvi, dfpSlots, dfpSlotsR, matchSlotsPageR, slots;

        // Intent tag present
				var intentTagSrc = jQuery('script[src*="/js/yieldbot.intent.js"]').attr('src');
				if (undefined === intentTagSrc) {
					var noGo = jQuery('<div id="no_box"><div class="yb_header"><img src="https://raw.githubusercontent.com/akc2142/bookmarklet/master/yb.png"></div></br><div> Client didn\'t check themself and wrickety-wrecked themself. <span style="color:red;font-weight: normal;"> </br> Fatal error: the intent tag is not loaded or is loaded in an iframe. Chickety-check in with a TAM. </span></div></div>');
					jQuery('body').append(noGo);
					noGo.css({
						position: 'fixed',
						top: '0',
						right: '0',
						width: '500px',
						height: 'auto',
						color: 'white',
						padding: '0 2% 2% 3%',
						fontWeight: 'bold',
						zIndex: '999999',
						fontSize: '16px',
						backgroundColor: 'rgba(25,0,51,.85)',
					});
				} else {
					pub = yieldbot.pub(); // Retrieve pub ID
					intentTag = '<span style="color:#66CC00; font-weight:normal;"> loaded </span>';
					ybGo = yieldbot._initialized && ' <span style="font-weight:normal;color: #66CC00;"> and activated ' || ' <span style="font-weight:normal;color:red;"> and isn\'t activated :(';
					//console.log(ybGo);
				}
				//Checking to see if the YB init and DFP scripts are fired;
				var init = jQuery('script[src*="init?cb=yieldbot.updateState"]').attr('src');
				// if init's undefined, don't continue
				if (undefined === init && undefined !== intentTagSrc) {
					var noGoInit = jQuery('<div id="no_init_box"><div class="yb_header"><img src="https://raw.githubusercontent.com/akc2142/bookmarklet/master/yb.png"></div></br><div> Client didn\'t check themself and wrickety-wrecked themself. <span style="color:red;font-weight: normal;"> </br> Init is not defined but the intent tag is loaded. Try to refresh and test again. If the problem persists, chickety-check in with a TAM. </span></div></div>');
					jQuery('body').append(noGoInit);
					noGoInit.css({
						position: 'fixed',
						top: '0',
						right: '0',
						width: '500px',
						height: 'auto',
						color: 'white',
						padding: '0 2% 2% 3%',
						fontWeight: 'bold',
						zIndex: '999999',
						fontSize: '16px',
						backgroundColor: 'rgba(25,0,51,.85)',
					});
				} else {
					//To potentially compare ^ to the system's slot names via API
					/*  for (var key in h) {
          if (h.hasOwnProperty(keys)) {
            //console.log(values + " -> " + JSON.stringify(h[key]));
            //console.log(key + " -> " + h[key]);
          }
        } */
					// Running through all of the history data stored
					var slotsPage = [];
					var dfpSplitArray = [];
					var matchSlotsPage = [];
					var adSlots = [];
					var values = [];
					var slotIndex = [];
					var rendIndex = [];
					var rendPage = [];
					var h = yieldbot._history;
					for (var i in h) {
						values.push(h[i][0]);
					}
					//console.log(values);
					var initTk = JSON.stringify(values).match(/init took \d+/g);
					if (initTk !== null) {
						initTk = values.toString().match(/init took \d+/g);
						initTk = initTk.toString().split(' ');
						initTk = parseInt(initTk[2]) / 1000;
						//console.log(initTk);
					}
					var intentTagAsync = values.includes('yieldbot.enableAsync'),
						getPageCriteria = values.includes('yieldbot.getPageCriteria'),
						setSlotTargeting = values.includes('yieldbot.setSlotTargeting'),
						params = values.includes('yieldbot.params'),
						getSlotCriteria = values.includes('yieldbot.getSlotCriteria'),
						updateReq = values.indexOf('yieldbot.updateState'),
						adOnPage = values.includes('cts_ad'),
						adAvailable = yieldbot.adAvailable(),
						dfp = googletag.service_manager_instance.j.publisher_ads.D.ybot;
            // var render = values.includes('cts_rend');
						// var impression = values.indexOf('cts_imp');

					if (undefined !== dfp) {
						dfpSplit = googletag.service_manager_instance.j.publisher_ads.D.ybot.toString().replace(',', '');
						// console.log(dfpSplit);
						dfpSplitArray.push(dfpSplit);
						dfpSlots = dfpSplitArray.toString();
						dfpSlotsR = dfpSplitArray.toString();
						//console.log('DFP SLOTS' + dfpSlots);
					} else {
						var dfpValues = googletag.slot_manager_instance.l;
						for (var key in dfpValues) {
							// skip loop if the property is from prototype
							if (!dfpValues.hasOwnProperty(key)) continue;
							obj = dfpValues[key].w;
							if (obj.ybot_ad == 'y') {
								dfpSlots = obj.ybot_slot + ':' + obj.ybot_cpm + ':' + obj.ybot_size;
								dfpSlotsR = obj.ybot_slot + ':' + obj.ybot_size + ':' + obj.ybot_cpm;
								// console.log('dfp slots' + dfpSlotsR);
								// console.log('dfp slots reg' + dfpSlots);
							}
						}
					}
					var initTook = initTk && '<span style="color:red;"> but response took ' + initTk + ' seconds' || '';

					for (var l in h) {
						if (h[l][0] === 'yieldbot.defineSlot') {
							slotIndex.push(l);
						}
					}
					for (var m in slotIndex) {
						index = h[slotIndex[m]][2];
						slotsPage.push('<ul class="slot_info" style="padding:0;margin:0; color: #66CC00; font-weight: normal;">' + index + '</ul>');
					}
					slotsPage = slotsPage.join('');
					if (-1 !== updateReq) {
						pvi = '<span style="font-weight:normal; color: #66CC00;">' + h[updateReq][2].pvi;
						updateS = h[updateReq][2].slots;
						// console.log(updateS);

						for (j in updateS) {
							slots = updateS[j];
							//  console.log('slots' + slots);
							matchSlotsPage = slots.slot + ':' + slots.cpm + ':' + slots.size;
							matchSlotsPageR = slots.slot + ':' + slots.size + ':' + slots.cpm;
							//console.log('match slots page: ' + matchSlotsPage + 'MR' +matchSlotsPageR);
							slotsObj = 'Slot - ' + slots.slot + ', CPM - ' + slots.cpm + ', Size - ' + slots.size;
							//console.log(slotsObj);
							//slots = slots.replace(/[(\[\])({})(\")(slot)(size)(cpm)(,)]/g, '');
							adSlots.push('<ul class="slot_info" style="padding:0;margin:0; color: #66CC00; font-weight: normal;">' + slotsObj + '</ul>');
						}
						adSlots = adSlots.join('');
					} else {
						adSlots = '<span style="font-weight: normal; color: red;"> updateState didn\'t return any slot info';
						pvi = '<span style="font-weight: normal; color: red;"> undefined';
					}

					for (var b in h) {
						if (h[b][0] === 'cts_ad') {
							rendIndex.push(b);
							//console.log(rendIndex);
						}
					}
					for (var c in rendIndex) {
						rindex = h[rendIndex[c]][1];
						rendPage.push(rindex);
						//  console.log(rendPage);
					}

					// debugging
					if (((matchSlotsPage || slots) === dfpSlots) || (matchSlotsPageR === dfpSlotsR)) {
						console.log('match slots' + matchSlotsPageR + ' dfp slots: ' + dfpSlots + 'slotR: ' + dfpSlotsR);
					} else {
						console.log('they dont match');
					}
					matching = ((matchSlotsPage === dfpSlots) || (matchSlotsPageR === dfpSlotsR) || (slots === dfpSlots));
					console.log('matched:' + matching);
					console.log(matchSlotsPageR === dfpSlotsR);
					console.log(matchSlotsPageR);
					console.log(dfpSlotsR);
					console.log((matchSlotsPage || slots) === dfpSlots);
					console.log(matchSlotsPage || slots);
					console.log(matchSlotsPage);
					console.log(slots);
					console.log(dfpSlots);
					//targeting
					if (getPageCriteria || getSlotCriteria || params || setSlotTargeting) {
						if (updateReq < (values.indexOf('yieldbot.getPageCriteria') && matching) || (values.indexOf('getSlotCriteria') && matching) || (values.indexOf('yieldbot.params') && matching) || (values.indexOf('yieldbot.setSlotTargeting') && matching)) {
							// console.log();
							targeting = '<span style=" color: #66CC00;font-weight:normal;"> good to go!';
						} else {
							targeting = '<span style="color: red; font-weight:normal; "> needs a closer look';
						}
					} else if (undefined || null !== initTk) {
						targeting = '<span style="color: red; font-weight:normal; "> timed out - fatal error; try refreshing';
					} else {
						targeting = '<span style="color: red; font-weight:normal; "> needs a closer look';
					}
					if (undefined === adOnPage && adAvailable == 'y') {
						renderAd = ' <span style="color: orange; font-weight: normal; "> Make sure the testing tool is on and you\'re on a page that has slots. If this error persists, check in with a TAM. It could just be we\'re not winning ';
					} else {
						renderAd = '';
					}
					// Create element on the page and styling
					var element = jQuery('<div id="yb_box"><div class="yb_header"><span style="font-size: 20px; color: #66CC00;"> <img src="https://raw.githubusercontent.com/akc2142/bookmarklet/master/yb.png"></span><a style="color: #66CC00!important; font-weight: bold;" target="_blank" href="https://my.yieldbot.com/ui/meow/publisher/' + pub + '"> Meow || </a> <a style="color: #66CC00!important; font-weight: bold;" target="_blank" href="http://i.yldbt.com/m/start-testing"> Testing Tool </a></div> <div class="yb_div"> Intent tag is ' + intentTag + ybGo + initTook + '</span></div><div class="yb_div"> Pub ID is  <span style="font-weight: normal; color:#66CC00 ;"> ' + pub + '<span id="display_name" style="color:orange;font-weight:normal;z-index:999999;"> should be </span></div><div class="yb_div"> Trying to bid on: ' + adSlots + '</span></div><div class="yb_div"> Slots defined on the page: <span style="font-weight:normal; color: #66CC00;">' + slotsPage + '</span> </div><div class="yb_div"> Targeting is ' + targeting + '</span> </div> <div class="yb_div">' + '</span> </div><div class="yb_div">' + renderAd + '</span> </div> <div class="yb_div">' + '</span></div> <div id="yb_div"> <span id="ad_serving" style="font-weight:normal;color:orange;"> </span> </div> <div id="yb_div"> <span id="is_mobile" style="font-weight:normal;color:orange;"> </span></div></div>');

					var url = '',
          pubUrl = url + pub;

					jQuery.ajax({
						url: pubUrl,
						dataType: 'jsonp',
						crossDomain: true,
						jsonp: 'callback',
						jsonpCallback: 'receive',
						type: 'GET',
						cache: true,
						success: (function receive(json) {
							configPub = [json.display_name,
								json.ad_serving_enabled,
								json.is_mobile
							];
							//console.log(configPub);
							displayName = configPub[0];
							adServing = '<span style="font-weight:bold;color:white;">Ad serving enabled? </span>' + configPub[1];
							mobile = '<span style="font-weight:bold;color:white;">Mobile? </span>' + configPub[2];
							jQuery('body').append(element);
							element.css({
								position: 'fixed',
								top: '0',
								right: '0',
								width: '500px',
								height: 'auto',
								color: 'white',
								padding: '0 0.5% 2% 3%',
								fontWeight: 'bold',
								zIndex: '999999',
								fontSize: '16px',
								backgroundColor: 'rgba(25,0,51,.85)',
							});
							jQuery("#display_name").append(displayName);
							jQuery("#ad_serving").append(adServing);
							jQuery("#is_mobile").append(mobile);
						})
					});
				}
				//  });
			}();
		} else {
			alert('Page hasn\'t fully loaded. Please wait for it to finish loading before running the script');
		}
	}
})();
