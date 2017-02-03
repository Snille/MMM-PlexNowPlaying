# MMM-PlexNowPlaying
This is an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It displays the currently playing music of your [Plex Media Server](https://plex.tv), relying on the [Plex API](https://github.com/Arcanemagus/plex-api/wiki/Sessions-Status).  Now, it also can display currently playing videos, along with year and tagline (if any).

In the event of multiple media playing at the same time, the first one found (which is arbitrary as far as I know) is what gets displayed by this module.

### Screenshots

Module on the Left side of the Mirror:

![Plex Module Left](https://github.com/Snille/MMM-PlexNowPlaying/blob/master/.github/Plex-Music-Left.png)

Module in the Center of the Mirror:

![Plex Module Center](https://github.com/Snille/MMM-PlexNowPlaying/blob/master/.github/Plex-Music-Center.png)

Module on the Right side of the Mirror:

![Plex Module Center](https://github.com/Snille/MMM-PlexNowPlaying/blob/master/.github/Plex-Music-Right.png)

This is my own mirrors view (Top Center) using some addition in the custom.css [see below](#custom-css)

![Plex Module Custom CSS](https://github.com/Snille/MMM-PlexNowPlaying/blob/master/.github/Plex-Music-Center-Snilles.PNG)


### Installation

Navigate into your MagicMirror's `modules` folder:

```
git clone https://github.com/Snille/MMM-PlexNowPlaying.git
cd MMM-PlexNowPlaying
npm install
```

The last part is to pull in the lovely [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) XML parser.

##Module Usage
The entry in the `module array` in your `config.js` can look as follows. The serverURL field is **mandatory**. All other fields have default values.


### Configuration

```
        {
            module: 'MMM-PlexNowPlaying',
            disabled: false,
            position: 'top_left',
            config: {
                serverURL: 'http://your-plex-server-address:32400',
            }
        }
```

| Option | Description |
|---|---| 
|`serverURL`|The URL to your PLEX server including the port.<br>**Requierd**<br><br>**Default value:** ` `|
|`preArtistText`|Text to be displayed before the artist name.<br><br>**Default value:** ` `|
|`preTrackText`|Text to be displayed before the track name.<br><br>**Default value:** ` `|
|`preAlbumText`|Text to be displayed before the album name.<br><br>**Default value:** ` `|
|`preVideoText`|Text to be displayed before the video name.<br><br>**Default value:** ` `|
|`preYearText`|Text to be displayed before the year number.<br><br>**Default value:** ` `|
|`animationSpeed`|Lenght of the fade animation.<br><br>**Default value:** `1000`|
|`updateInterval`|Update interval.<br><br>**Default value:** `15 * 1000`|
|`delayCount`|How many empty queries before deciding we aren't listening.<br><br>**Default value:** `5`|
|`delayInterval`|How often to poll for new listening activity (default 60s).<br><br>**Default value:** `60 * 1000`|

### Custom-CSS

Here is my CSS settings for the module that I have added to my custom.css to give it the exta special look. :)

```
/* MMM-PlexNowPlaying -------------------------------*/
.album-art img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 2px 2px;
  border: 2px solid #FFF;
}
.track-name {
  width: 200px;
  font-weight: normal;
}
/*****************************************************/
```
