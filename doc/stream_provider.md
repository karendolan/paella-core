# Stream Provider

StreamProvider is the component in charge of managing the playback and synchronization of video streams.  It is also in charge of managing soft trimming.

In general, StreamProvider APIs are intended to be used internally, and therefore should not be used directly except for two specific cases:

- If we want to perform actions on video playback that do not generate events. The one in charge of triggering playback events (play, pause, volume change, seek, etc) is [VideoContainer](video_container.md), so if we use StreamProvider to perform these actions, no events will be triggered.
- If we want to obtain data of current instant and duration, without taking into account the trimming, the APIs in charge of this are only in StreamProvider.

StreamProvider is accessed through the [VideoContainer](video_container.md):

```javascript
myPlayerInstance.videoContainer.streamProvider
```



## Media players

At load time, StreamProvider uses the information from the video manifest regarding video streams, and takes care of creating the video players, taking into account the stream type, the installed and activated plugins, and the order in which they are loaded, in the configuration file. For more information about the configuration of the video plugins, see [this document](video_plugin.md).



## APIs

### Stream management functions

`async executeAction()`: Allows to execute a command on all video players. Returns an array with the results of the execution of that action on all video players.

```javascript
(await myPlayer.videoContainer.executeAction("currentTime"))
	.forEach(t => console.log(t));
```

`get players()`: Returns an array with the video players. 

`get streamData()`: Returns the streams information extracted from the video manifest

`get streams()`: Returns an array with the grouped information of streams, video plugins and players

`get mainAudioPlayer()`: Returns the main audio player. The main audio player is obtained from the Paella Player configuration, and from the information of the video streams.

- In the video manifeset, with the `role` property of each stream, the main audio will be the one corresponding to the first stream whose role is `mainAudio`:

```json
{	// data.json (video manifest)
  ...
  "streams": [
    {
      "sources": [...],
      "content": "presenter",
      "role": "mainAudio"
    }
    ...
  ]
}
```



- If none of the streams contains the role, then it will be the audio whose `content` is the one defined in the `defaultAudioStream` property in the player configuration:

```json
{	// config.json
  ...
  "defaultAudioStream": "presenter"
  ...
}
```



### Playback control functions

`async play()`, `async pause()`,  `async stop()`: Controls video playback.

`async paused()`: Returns true if the videos are paused. The result is a bool array, with as many elements as there are video players.

`async setCurrentTime(t)`: Sets the current time instant of all videos.

`async currentTime()`: Returns an array with the current time of all videos

`async duration()`: Returns an array with the duration of all the videos.

`async volume()`: Returns the volume of the main media player.

`async setVolume(v)`: Sets the volume of the main video player



### Trimming management functions

Of the playback control functions, those that affect the time instant all take video trimming into account. The following two functions return time instants in seconds, ignoring trimming:

`async currentTimeIgnoringTrimming()`: Returns the current time instant, ignoring trimming.

`async durationIgnoringTrimming()`: Returns the duration of the video, ignoring trimming.

`get isTrimEnabled()`: Returns true if trimming is enabled

`get trimStart()`: Returns the initial time instant of trimming.

`get trimEnd()`: Returns the trimming end time instant.

`async setTrimming({ enabled, start, end })`: Configures video trimming. Esta función genera el evento `Events.TIMEUPDATE`, de forma que si el vídeo está pausado, todos los observadores del evento puedan recalcular las propiedades del vídeo.

