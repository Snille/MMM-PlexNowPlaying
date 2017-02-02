Module.register("MMM-PlexNowPlaying",{
    // Default module config.
    defaults: {
		//username: '',
		serverURL: '',
		updateInterval: 15 * 1000,
		delayCount: 5,
		delayInterval: 60 * 1000,
		animationSpeed: 1000,
		preArtistText: '',
		preAlbumText: '',
		preTrackText: '',
		preVideoText: '',
		preYearText: '',
    },
	getStyles: function() {
		return ['MMM-PlexNowPlaying.css']
	},
	start: function() {
		Log.info("Starting module: " + this.name);
		//set module data object
		this.songData = {playing: false};
		//prepare loading
		this.loaded = false;
		this.delay = this.config.updateInterval;
		this.failedCounter = 0;
		this.scheduleUpdate(0);
	},
    // Override dom generator.
    getDom: function() {
		var preArtText = '';
		var preAlbText = '';
		var preTraText = '';
        var wrapper = document.createElement("div");
		if (!this.loaded) {
			wrapper.innerHTML = "Plex data...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
		if (this.config.serverURL == '') {
			wrapper.innerHTML = "Please check your config file: server URL is missing!";
			wrapper.className = "bright";
			return wrapper;
		}
		if(this.songData.playing){
			this.failedCounter = 0;
			//Log.info(this.songData.type);
			this.delay = this.config.updateInterval;
			this.show(this.config.animationSpeed);
			if (this.songData.type == "music") {
				preArtText = this.config.preArtistText;
				preAlbText = this.config.preAlbumText;
				preTraText = this.config.preTrackText;
			}else if (this.songData.type == "video") {
				preArtText = this.config.preYearText;
				preTraText = this.config.preVideoText;
				preAlbText = "";
			}
			var html = "<div class='player bright'><table class='plex-table'><tbody class='plex-table-body'><tr><td class='plex-table-td-img' rowspan='2'><div class='album-art-container'><div class='album-art'><img src='" +this.songData.image+ "'></div></div></td></tr><tr><td class='plex-table-td-txt'><div class='meta'><table class='small'><tr class='track-name bright'><td>"+preTraText+this.songData.title+"</td></tr><tr class='artist-name'><td>"+preArtText+this.songData.artist +"</td></tr><tr class='album-name dimmed'><td>"+preAlbText+this.songData.album+"</td></tr></table></div></td></tr></tbody></table></div>";
			wrapper.innerHTML = html;
		}else{
			this.hide(this.config.animationSpeed);
			this.failedCounter = this.failedCounter + 1;
			if(this.failedCounter > this.config.delayCount){
				this.delay = this.config.delayInterval;
			}
			this.songData = {playing:false};
			wrapper.innerHTML = "Not playing...";
			wrapper.className = "dimmed light small";
		}
		this.scheduleUpdate(this.delay);
		return wrapper;
    },

	//  attrs: artist/album/title/thumb/state/device/deviceTitle/deviceVersion
	socketNotificationReceived: function(notification, payload){
		var self = this;
		if(notification == "PLEX_SUCCESS"){
			nowPlaying = payload;
			self.songData.playing = false;
			for (var i=0; i < nowPlaying.length; i++){
				track = nowPlaying[i];
				//Log.info(track);
				if(track.state != "playing") continue;
					self.songData = {}
					self.songData.title = track.title;
					self.songData.artist = track.artist;
					self.songData.album = track.album;
					self.songData.type = track.type;
					self.songData.image = self.config.serverURL+track.thumb;
					self.songData.playing = true;
				break; ///  one song is enough for now
			}
		}
		else if(notification == "PLEX_FAIL"){
			Log.error(payload);
			self.songData = {playing:false};
			self.hide(1000);
		}
		self.loaded = true;
		self.updateDom(self.config.animationSpeed);
	},
	scheduleUpdate: function(delay) {
		var nextLoad = this.delay;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		//set update timeout
		var self = this;
		setTimeout(function() {
			//  ask for data
			self.sendSocketNotification('GETDATA', self.config.serverURL);
		}, nextLoad);
	}
});
